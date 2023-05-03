from django.urls import path
from . import views

# All patterns proceeding by 'app/'
urlpatterns = [
    path("children/", views.handle_children),
    path("name/", views.handle_name),
    path("ranking/", views.handle_ranking),
]
