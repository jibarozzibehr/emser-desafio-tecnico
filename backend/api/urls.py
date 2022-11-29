from django.urls import path
from . import views
from .views import ProjectView, UserView, ProjectUserView, AuthView

urlpatterns = [
    path('projects/', ProjectView.as_view(), name='projects_list'),
    path('projects/<int:id>', ProjectView.as_view(), name='project_process'),

    path('users/', UserView.as_view(), name='users_list'),
    path('users/<int:id>', UserView.as_view(), name='user_process'),

    path('projects-users/', ProjectUserView.as_view(), name='projects-users_list'),
    path('projects-users/<int:id>', ProjectUserView.as_view(), name='projects-users_delete'),

    path('auth/', AuthView.as_view(), name='auth'),
]