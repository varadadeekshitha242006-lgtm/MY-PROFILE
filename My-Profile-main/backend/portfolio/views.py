from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
import logging
import threading

from .models import Project, Skill, Experience, ContactMessage
from .serializers import (
    ProjectSerializer, SkillSerializer,
    ExperienceSerializer, ContactMessageSerializer,
)

logger = logging.getLogger(__name__)


class ProjectListView(APIView):
    def get(self, request):
        qs = Project.objects.all()
        if request.query_params.get('featured', '').lower() == 'true':
            qs = qs.filter(featured=True)
        return Response(ProjectSerializer(qs, many=True).data)


class SkillListView(APIView):
    def get(self, request):
        skills = Skill.objects.all()
        data = SkillSerializer(skills, many=True).data
        grouped = {}
        for s in data:
            grouped.setdefault(s['category'], []).append(s)
        return Response({'skills': data, 'grouped': grouped})


class ExperienceListView(APIView):
    def get(self, request):
        return Response(ExperienceSerializer(Experience.objects.all(), many=True).data)


class ContactView(APIView):
    """POST /api/contact/ — saves message and sends emails in background"""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            msg = serializer.save()
            # Send emails in background thread — don't block the response
            t = threading.Thread(target=self._send_emails, args=(msg,), daemon=True)
            t.start()
            return Response(
                {'message': 'Message received! I will get back to you soon.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _send_emails(self, msg):
        """Send both emails in background."""
        self._send_notification(msg)
        self._send_auto_reply(msg)

    def _send_notification(self, msg):
        try:
            send_mail(
                subject=f'[Portfolio] New message: {msg.subject}',
                message=f"""Hi Varada,

New message from your portfolio:

FROM    : {msg.name}
EMAIL   : {msg.email}
SUBJECT : {msg.subject}

{msg.message}

Reply to: {msg.email}
""",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.PORTFOLIO_OWNER_EMAIL],
                fail_silently=True,
            )
            logger.info(f'Notification sent for message from {msg.email}')
        except Exception as e:
            logger.error(f'Notification email failed: {e}')

    def _send_auto_reply(self, msg):
        try:
            send_mail(
                subject=f'Thank you for reaching out, {msg.name.split()[0]}!',
                message=f"""Hi {msg.name},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

Subject : {msg.subject}
Message : {msg.message}

I typically respond within 24 hours.

Best regards,
Varada Deekshitha
B.Tech CSE | Full Stack Developer
varadadeekshitha@gmail.com
GitHub  : https://github.com/Varada-Deekshitha
LinkedIn: https://www.linkedin.com/in/varada-deekshitha-7b071b309
""",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[msg.email],
                fail_silently=True,
            )
            logger.info(f'Auto-reply sent to {msg.email}')
        except Exception as e:
            logger.error(f'Auto-reply failed: {e}')


class PortfolioSummaryView(APIView):
    def get(self, request):
        skills = Skill.objects.all()
        skill_data = SkillSerializer(skills, many=True).data
        grouped = {}
        for s in skill_data:
            grouped.setdefault(s['category'], []).append(s)
        return Response({
            'projects':   ProjectSerializer(Project.objects.all(), many=True).data,
            'skills':     {'flat': skill_data, 'grouped': grouped},
            'experience': ExperienceSerializer(Experience.objects.all(), many=True).data,
            'meta': {
                'projects_total':  Project.objects.count(),
                'featured_total':  Project.objects.filter(featured=True).count(),
                'messages_total':  ContactMessage.objects.count(),
                'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
            },
        })


class ProjectListView(APIView):
    """GET /api/projects/  —  optional ?featured=true"""

    def get(self, request):
        qs = Project.objects.all()
        if request.query_params.get('featured', '').lower() == 'true':
            qs = qs.filter(featured=True)
        return Response(ProjectSerializer(qs, many=True).data)


class SkillListView(APIView):
    """GET /api/skills/  —  returns flat list + grouped dict"""

    def get(self, request):
        skills = Skill.objects.all()
        data   = SkillSerializer(skills, many=True).data
        grouped = {}
        for s in data:
            grouped.setdefault(s['category'], []).append(s)
        return Response({'skills': data, 'grouped': grouped})


class ExperienceListView(APIView):
    """GET /api/experience/"""

    def get(self, request):
        entries = Experience.objects.all()
        return Response(ExperienceSerializer(entries, many=True).data)


class ContactView(APIView):
    """POST /api/contact/ — saves message and sends email notification"""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            msg = serializer.save()
            # Send real-time email notification to owner
            self._send_notification(msg)
            # Send auto-reply confirmation to the sender
            self._send_auto_reply(msg)
            return Response(
                {'message': 'Message received! I will get back to you soon.'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _send_notification(self, msg):
        """Send email to portfolio owner when someone submits the contact form."""
        try:
            subject = f'[Portfolio] New message: {msg.subject}'

            body = f"""
Hi Varada,

You received a new message from your portfolio contact form.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FROM     : {msg.name}
  EMAIL    : {msg.email}
  SUBJECT  : {msg.subject}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{msg.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Reply directly to: {msg.email}
Received at: {msg.created_at.strftime('%d %b %Y, %I:%M %p')} IST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

— Your Portfolio
"""
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.PORTFOLIO_OWNER_EMAIL],
                fail_silently=False,
            )
            logger.info(f'Email notification sent for message from {msg.email}')

        except Exception as e:
            # Don't break the API response if email fails
            logger.error(f'Failed to send email notification: {e}')

    def _send_auto_reply(self, msg):
        """Send auto-reply confirmation email to the person who contacted."""
        try:
            subject = f'Thank you for reaching out, {msg.name.split()[0]}!'

            body = f"""
Hi {msg.name},

Thank you for reaching out! I have received your message and will get back to you as soon as possible.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  YOUR MESSAGE DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Subject : {msg.subject}
  Message : {msg.message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I typically respond within 24 hours.

Looking forward to connecting with you!

Best regards,
Varada Deekshitha
B.Tech CSE | Full Stack Developer
varadadeekshitha@gmail.com
GitHub  : https://github.com/Varada-Deekshitha
LinkedIn: https://www.linkedin.com/in/varada-deekshitha-7b071b309
"""
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[msg.email],
                fail_silently=False,
            )
            logger.info(f'Auto-reply sent to {msg.email}')

        except Exception as e:
            logger.error(f'Failed to send auto-reply: {e}')


class PortfolioSummaryView(APIView):
    """GET /api/summary/  —  single call returns everything"""

    def get(self, request):
        skills = Skill.objects.all()
        skill_data = SkillSerializer(skills, many=True).data
        grouped = {}
        for s in skill_data:
            grouped.setdefault(s['category'], []).append(s)

        return Response({
            'projects':   ProjectSerializer(Project.objects.all(), many=True).data,
            'skills':     {'flat': skill_data, 'grouped': grouped},
            'experience': ExperienceSerializer(Experience.objects.all(), many=True).data,
            'meta': {
                'projects_total':  Project.objects.count(),
                'featured_total':  Project.objects.filter(featured=True).count(),
                'messages_total':  ContactMessage.objects.count(),
                'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
            },
        })
