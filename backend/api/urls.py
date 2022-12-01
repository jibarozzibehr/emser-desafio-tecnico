from django.urls import path
from .views import ProjectView, UserView, ProjectUserView, AuthView

urlpatterns = [
    path('projects/', ProjectView.as_view(), name='projects_list'),

    path('users/', UserView.as_view(), name='users_list'),

    path('projects-users/', ProjectUserView.as_view(), name='projects-users_list'),

    path('auth/', AuthView.as_view(), name='auth'),
]