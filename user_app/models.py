from django.db import models
from django.contrib.auth.models import AbstractUser


class App_User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=150, unique=True)
    last_updated = models.DateField(auto_now=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"User object: {self.username}"


class Child(models.Model):
    nickname = models.CharField(max_length=255)
    parent_1 = models.ForeignKey(App_User, on_delete=models.CASCADE)
    parent_2 = models.EmailField(max_length=150,blank=True, null=True)
    parent_url = models.UUIDField(unique=True, null=True, blank=True)
    guest_url = models.UUIDField(unique=True, null=True, blank=True)
    gender = models.CharField(max_length=1, null=True)
    last_name = models.CharField(max_length=150, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return f"Child object: {self.nickname}, belonging to: {self.parent_1}"


class Name(models.Model):
    name = models.CharField(max_length=255)
    popularity = models.BigIntegerField(null=True,default=None)
    gender = models.CharField(max_length=1)

    def __str__(self) -> str:
        return f"Name object: {self.name}"


class Voted_Name(models.Model):
    name = models.ForeignKey(Name, on_delete=models.CASCADE)
    liked = models.BooleanField()
    participant = models.ForeignKey(App_User, on_delete=models.CASCADE)
    child = models.ForeignKey(Child, on_delete=models.CASCADE)
    weight = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"Voted_name object: {self.name}, belonging to: {self.child}"


class Blacklist(models.Model):
    user = models.ForeignKey(App_User, on_delete=models.CASCADE)
    child = models.ForeignKey(Child, on_delete=models.CASCADE)
