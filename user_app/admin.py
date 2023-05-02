from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import App_user, Child, Name, Voted_Name

admin.site.register(App_user)
admin.site.register(Child)
admin.site.register(Name)
admin.site.register(Voted_Name)