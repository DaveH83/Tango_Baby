from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.front),
    # re_path(r'^(?P<path>.*)/$', views.front),
    path("register/", views.register_user),
    path("login/", views.user_login),
    path("logout/", views.user_logout),
]
