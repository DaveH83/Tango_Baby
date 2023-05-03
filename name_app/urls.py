from django.urls import path
from . import views

# All patterns proceeding by 'app/'
urlpatterns = [
    # path('', views.front),
    path("children/", views.handle_children),
    path("name/", views.handle_name),
    path("names/", views.handle_names),
]
