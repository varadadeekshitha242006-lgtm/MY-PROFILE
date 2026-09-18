from django.db import models


class Project(models.Model):
    title       = models.CharField(max_length=200)
    description = models.TextField()
    tags        = models.CharField(max_length=500, help_text='Comma-separated tags')
    github_url  = models.URLField(blank=True)
    live_url    = models.URLField(blank=True)
    emoji       = models.CharField(max_length=10, default='🚀')
    color       = models.CharField(max_length=20, default='#7c6fff')
    featured    = models.BooleanField(default=False)
    order       = models.PositiveIntegerField(default=0)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def tags_list(self):
        return [t.strip() for t in self.tags.split(',') if t.strip()]


class Skill(models.Model):
    CATEGORIES = [
        ('frontend', 'Frontend'),
        ('backend',  'Backend'),
        ('database', 'Database'),
        ('tools',    'DSA & Tools'),
    ]
    name     = models.CharField(max_length=100)
    tag      = models.CharField(max_length=50, default='Core', help_text='Badge label, e.g. Framework, Language')
    category = models.CharField(max_length=20, choices=CATEGORIES)
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['category', 'order']

    def __str__(self):
        return f'{self.name} ({self.category})'


class Experience(models.Model):
    TYPES = [('work', 'Work'), ('edu', 'Education')]
    role     = models.CharField(max_length=200)
    company  = models.CharField(max_length=200)
    period   = models.CharField(max_length=100)
    exp_type = models.CharField(max_length=10, choices=TYPES, default='work')
    color    = models.CharField(max_length=20, default='#7c6fff')
    points   = models.TextField(help_text='One bullet point per line')
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.role} @ {self.company}'

    def points_list(self):
        return [p.strip() for p in self.points.splitlines() if p.strip()]


class ContactMessage(models.Model):
    name       = models.CharField(max_length=200)
    email      = models.EmailField()
    subject    = models.CharField(max_length=300)
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read    = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.subject}'
