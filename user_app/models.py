from django.db import models
from django.contrib.auth.models import AbstractUser


class App_user (AbstractUser):
    last_updated = models.DateField(auto_now=True)
    REQUIRED_FIELDS = ["email"]
    

    def __str__(self):
        return f"This is the class object for username: {self.username}"