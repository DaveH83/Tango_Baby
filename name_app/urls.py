from django.urls import path
from . import views

# All patterns proceeding by 'app/'
urlpatterns = [
    path("children/", views.handle_children),
    path("child/<str:uuid>", views.handle_child),
    path("name/", views.handle_name),
    path("swipe/", views.vote_name),
    path("ranking/", views.handle_ranking),
    path("namelist/<str:uuid>", views.handle_voted_names),
]
