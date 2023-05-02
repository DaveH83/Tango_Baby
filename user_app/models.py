from django.db import models
from django.contrib.auth.models import AbstractUser


class App_User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.CharField(max_length=150, unique=True)
    last_updated = models.DateField(auto_now=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return f"User object: {self.username}"
    

class Child(models.Model):
    title = models.CharField(max_length=255)
    parent_1 = models.ForeignKey(App_User, on_delete=models.CASCADE)
    parent_2 = models.EmailField(blank=True, null=True)

    def __str__(self) -> str:
        return f"Child object: {self.title}, belonging to: {self.parent_1}"
    

class Name(models.Model):
    name = models.CharField(max_length=255)
    popularity = models.BigIntegerField(default=0)
    gender = models.CharField(max_length=1)
    custom = models.BooleanField(default=False)
    child_id = models.BigIntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return f"Name object: {self.name}"
    

class Voted_Name(models.Model):
    name = models.ForeignKey(Name, on_delete=models.CASCADE)
    liked = models.BooleanField()
    participant = models.ForeignKey(App_User, on_delete=models.CASCADE)
    child = models.ForeignKey(Child, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"Voted_name object: {self.name}, belonging to: {self.child}"
