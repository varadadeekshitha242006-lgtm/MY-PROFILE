from rest_framework import serializers
from .models import Project, Skill, Experience, ContactMessage


class ProjectSerializer(serializers.ModelSerializer):
    tags_list = serializers.SerializerMethodField()

    class Meta:
        model  = Project
        fields = [
            'id', 'title', 'description', 'tags', 'tags_list',
            'github_url', 'live_url', 'emoji', 'color', 'featured', 'order',
        ]

    def get_tags_list(self, obj):
        return obj.tags_list()


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Skill
        fields = ['id', 'name', 'tag', 'category', 'order']


class ExperienceSerializer(serializers.ModelSerializer):
    points_list = serializers.SerializerMethodField()

    class Meta:
        model  = Experience
        fields = [
            'id', 'role', 'company', 'period',
            'exp_type', 'color', 'points', 'points_list', 'order',
        ]

    def get_points_list(self, obj):
        return obj.points_list()


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError('Enter a valid email address.')
        return value.lower().strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError('Message must be at least 10 characters.')
        return value.strip()

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Name must be at least 2 characters.')
        return value.strip()
