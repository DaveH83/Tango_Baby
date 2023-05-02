from django.urls import path
from . import views

urlpatterns = [
    path("", views.home),
    path("register/", views.register_user),
    path("login/", views.user_login),
    path("logout/", views.user_logout),
]
