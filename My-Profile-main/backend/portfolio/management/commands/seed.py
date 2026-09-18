from django.core.management.base import BaseCommand
from portfolio.models import Project, Skill, Experience


class Command(BaseCommand):
    help = 'Seed the database with Varada Deekshitha portfolio data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Project.objects.all().delete()
        Skill.objects.all().delete()
        Experience.objects.all().delete()

        # ── Projects ──────────────────────────────────────────────────────────
        projects = [
            dict(title='Skillora', emoji='🎯', color='#7c6fff', featured=True, order=1,
                 tags='React,Django,SQL,Bootstrap',
                 github_url='https://github.com/Varada-Deekshitha',
                 live_url='',
                 description='Full-stack AI-powered placement preparation platform with course management, '
                             'user progress tracking, and responsive UI — built with React JS, Django and SQL.'),
            dict(title='Agentic AI', emoji='🤖', color='#2dd4bf', featured=True, order=2,
                 tags='Python,Agentic AI,LLM,Automation',
                 github_url='https://github.com/Varada-Deekshitha',
                 live_url='',
                 description='Intelligent agent-based AI system built during Indian Servers internship. '
                             'Automates tasks using AI workflows, prompt engineering and Python pipelines.'),
            dict(title='Gaming Zone', emoji='🎮', color='#f472b6', featured=True, order=3,
                 tags='React,Django,SQL,JavaScript',
                 github_url='https://github.com/Varada-Deekshitha',
                 live_url='',
                 description='Interactive gaming zone with Sudoku, Number Guessing and Rock-Paper-Scissors '
                             'mini-games — real-time score tracking with Django backend.'),
            dict(title='Portfolio Website', emoji='💼', color='#a594ff', featured=False, order=4,
                 tags='React,Django,SQLite,CSS',
                 github_url='https://github.com/Varada-Deekshitha',
                 live_url='',
                 description='This portfolio — built with React JS frontend, Django REST backend and SQLite. '
                             'Fully responsive dark-themed with smooth animations.'),
            dict(title='Web Dev Projects', emoji='🌐', color='#5eead4', featured=False, order=5,
                 tags='HTML,CSS,JavaScript,Bootstrap',
                 github_url='https://github.com/Varada-Deekshitha',
                 live_url='',
                 description='Responsive web pages and mini-projects built during CodeAlpha internship '
                             'using HTML, CSS and JavaScript.'),
        ]
        for p in projects:
            Project.objects.create(**p)

        # ── Skills ────────────────────────────────────────────────────────────
        skills = [
            # frontend
            ('React JS',    'Framework', 'frontend', 1),
            ('JavaScript',  'Language',  'frontend', 2),
            ('HTML5',       'Markup',    'frontend', 3),
            ('CSS3',        'Styling',   'frontend', 4),
            ('Bootstrap',   'Library',   'frontend', 5),
            # backend
            ('Python',      'Language',  'backend',  1),
            ('Django',      'Framework', 'backend',  2),
            ('REST APIs',   'Design',    'backend',  3),
            ('Django ORM',  'ORM',       'backend',  4),
            # database
            ('SQL',         'Language',  'database', 1),
            ('MySQL',       'RDBMS',     'database', 2),
            ('SQLite',      'Embedded',  'database', 3),
            ('PostgreSQL',  'RDBMS',     'database', 4),
            # tools
            ('Data Structures', 'Core',    'tools', 1),
            ('Algorithms',      'Core',    'tools', 2),
            ('Problem Solving', 'Practice','tools', 3),
            ('Git / GitHub',    'DevTool', 'tools', 4),
        ]
        for name, tag, cat, order in skills:
            Skill.objects.create(name=name, tag=tag, category=cat, order=order)

        # ── Experience ────────────────────────────────────────────────────────
        experiences = [
            dict(role='Web Development Intern', company='CodeAlpha',
                 period='2025', exp_type='work', color='#7c6fff', order=1,
                 points='Built responsive web pages using HTML, CSS, Bootstrap and JavaScript\n'
                        'Developed Django-based backend features and REST API endpoints\n'
                        'Collaborated on React frontend components and state management'),
            dict(role='AI & Cyber Security Intern', company='Indian Servers Pvt. Ltd.',
                 period='2026', exp_type='work', color='#2dd4bf', order=2,
                 points='Built an Agentic AI system — intelligent agent-based automation platform\n'
                        'Explored AI workflows, prompt engineering and LLM integration pipelines\n'
                        'Worked on Machine Learning, Cyber Security and automation assignments'),
            dict(role='Virtual Internship 7.0', company='Infosys Springboard',
                 period='2026', exp_type='work', color='#f472b6', order=3,
                 points='Completed professional training in Python, web development and software engineering\n'
                        'Practiced real-world problem solving with industry-standard tools\n'
                        'Strengthened fundamentals in Data Structures and Algorithms'),
        ]
        for e in experiences:
            Experience.objects.create(**e)

        self.stdout.write(self.style.SUCCESS(
            f'\n✓ Seeded successfully:\n'
            f'  • {Project.objects.count()} projects\n'
            f'  • {Skill.objects.count()} skills\n'
            f'  • {Experience.objects.count()} experience entries'
        ))
