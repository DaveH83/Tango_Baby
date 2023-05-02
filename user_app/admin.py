from django.contrib import admin
from .models import App_User, Child, Name, Voted_Name

admin.site.register(App_User)
admin.site.register(Child)
admin.site.register(Name)
admin.site.register(Voted_Name)
