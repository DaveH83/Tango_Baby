from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import App_user

admin.site.register(App_user, UserAdmin)