from rest_framework import serializers
from ..user_app.models import *
from rest_framework.validators import UniqueTogetherValidator

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
    fields = ['id', 'name', 'liked', 'participant', 'child']


class ChildSerializer(serializers.ModelSerializer):

  class Meta:
    model = Child
    fields = [
      'id', 'nickname', 'parent_1', 'parent_2', 'parent_url', 'guest_url',
      'gender'
    ]