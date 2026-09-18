from django.urls import path
from .views import (
    ProjectListView,
    SkillListView,
    ExperienceListView,
    ContactView,
    PortfolioSummaryView,
)

urlpatterns = [
    path('projects/',   ProjectListView.as_view(),      name='api-projects'),
    path('skills/',     SkillListView.as_view(),         name='api-skills'),
    path('experience/', ExperienceListView.as_view(),    name='api-experience'),
    path('contact/',    ContactView.as_view(),           name='api-contact'),
    path('summary/',    PortfolioSummaryView.as_view(),  name='api-summary'),
]
