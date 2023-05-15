from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.apps import apps
App_User = apps.get_model('user_app', 'App_User')
Child = apps.get_model('user_app', 'Child')
Name = apps.get_model('user_app', 'Name')
Voted_Name = apps.get_model('user_app', 'Voted_Name')
Blacklist = apps.get_model('user_app', 'Blacklist')

class NameSerializer(serializers.ModelSerializer):

  class Meta:
    model = Name
    fields = ['id', 'name', 'popularity', 'gender']
    validators = [
      UniqueTogetherValidator(queryset=Name.objects.all(),
                              fields=['name', 'gender'])
    ]


class VoteSerializer(serializers.ModelSerializer):

  class Meta:
    model = Voted_Name
    fields = ['id', 'name', 'liked', 'participant', 'child', 'weight']


class ChildSerializer(serializers.ModelSerializer):

  class Meta:
    model = Child
    fields = [
      'id', 'nickname', 'parent_1', 'parent_2', 'parent_url', 'guest_url',
      'gender'
    ]