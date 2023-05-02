from django.db import models
from django.contrib.auth.models import AbstractUser


class App_user (AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.CharField(max_length=150, unique=True)
    last_updated = models.DateField(auto_now=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
    

    def __str__(self):
        return f"This is the class object for username: {self.username}"
    

class Child(models.Model):
    title = models.CharField(max_length=255)
    parent_1 = models.ForeignKey(App_user, on_delete=models.CASCADE)
    parent_2 = models.EmailField(null=True)

    def __str__(self) -> str:
        return f"This is the class object for child: {self.title} belonging to: {self.parent_1_email}"
    

class Name(models.Model):
    name = models.CharField(max_length=255, unique=True)
    popularity = models.BigIntegerField(default=0)
    gender = models.CharField(max_length=1)
    custom = models.BooleanField(default=False)
    child_id = models.BigIntegerField(null=True)

    def __str__(self) -> str:
        return f"This is the class object for name: {self.name}"
    

class Voted_Name(models.Model):
    name = models.ForeignKey(Name, on_delete=models.CASCADE)
    liked = models.BooleanField()
    participant = models.ForeignKey(App_user, on_delete=models.CASCADE)
    child = models.ForeignKey(Child, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"This is the class object for voted_name: {self.name_id}"