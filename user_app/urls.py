from django.urls import path
from . import views

# All patterns proceeding by 'user/'
urlpatterns = [
    path("register/", views.register_user),
    path("login/", views.user_login),
    path("logout/", views.user_logout),
    path("curr-user/", views.curr_user),
]
