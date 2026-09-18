from django.contrib import admin
from django.utils.html import format_html
from .models import Project, Skill, Experience, ContactMessage

admin.site.site_header  = 'Varada Deekshitha — Portfolio Admin'
admin.site.site_title   = 'Portfolio Admin'
admin.site.index_title  = 'Dashboard'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['title', 'color_preview', 'featured', 'order', 'created_at']
    list_editable = ['featured', 'order']
    list_filter   = ['featured']
    search_fields = ['title', 'description', 'tags']
    ordering      = ['order']

    def color_preview(self, obj):
        return format_html(
            '<span style="display:inline-block;width:14px;height:14px;'
            'border-radius:3px;background:{};vertical-align:middle;margin-right:6px"></span>{}',
            obj.color, obj.color,
        )
    color_preview.short_description = 'Color'


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display  = ['name', 'tag', 'category', 'order']
    list_editable = ['tag', 'order']
    list_filter   = ['category']
    search_fields = ['name']
    ordering      = ['category', 'order']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display  = ['role', 'company', 'period', 'exp_type', 'order']
    list_editable = ['order']
    list_filter   = ['exp_type']
    search_fields = ['role', 'company']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display     = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_editable    = ['is_read']
    list_filter      = ['is_read', 'created_at']
    search_fields    = ['name', 'email', 'subject']
    readonly_fields  = ['name', 'email', 'subject', 'message', 'created_at']
    date_hierarchy   = 'created_at'

    def has_add_permission(self, request):
        return False  # messages only come through the contact form
