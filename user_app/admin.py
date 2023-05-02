from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import App_User

admin.site.register(App_User, UserAdmin)
