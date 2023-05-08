from rest_framework import viewsets
from django.apps import apps
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.forms.models import model_to_dict

App_User = apps.get_model('user_app', 'App_User')
Child = apps.get_model('user_app', 'Child')
Name = apps.get_model('user_app', 'Name')
Voted_Name = apps.get_model('user_app', 'Voted_Name')
Blacklist = apps.get_model('user_app', 'Blacklist')

class NameViewSet(viewsets.ModelViewSet):
  serializer_class = NameSerializer
  queryset = Name.objects.all()
  # create - won't create if duplicate due to serializer validator


class VoteViewSet(viewsets.ModelViewSet):
  serializer_class = VoteSerializer
  queryset = Voted_Name.objects.all()

  # Modify main url POST method
  def create(self, request, *args, **kwargs):
    # data - name, liked(boolean), child(id)
    request.data['participant'] = request.user.id
    if not request.data['liked']:
      request.data['liked'] = True
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data,
                    status=status.HTTP_201_CREATED,
                    headers=headers)

class ChildViewSet(viewsets.ModelViewSet):
  serializer_class = ChildSerializer
  queryset = Child.objects.all()

  # Modify detail url GET method
  def retrieve(self, request, *args, **kwargs):
        # child id in the url - instance is the child object
        # for the child return liked, disliked, and agreed-upon lists
        instance = self.get_object()
        data = model_to_dict(instance)
        # add additional fields to dictionary to return
        liked_names = Voted_Name.objects.filter(participant=request.user,
                                          child=instance,
                                          liked=True)
        disliked_names = Voted_Name.objects.filter(participant=request.user,
                                          child=instance,
                                          liked=False)
        data['liked'] = liked_names
        data['disliked'] = disliked_names
        if instance.parent_2 and instance.parent_1 and (request.user==instance.parent_1 or request.user==instance.parent_2):
          # determine mutually liked name
          agreed_names = []
          if request.user == instance.parent_1:
            other_parent_likes = Voted_Name.objects.filter(participant=instance.parent_2, child=instance, liked=True)
          elif request.user == instance.parent_2:
            other_parent_likes = Voted_Name.objects.filter(participant=instance.parent_1, child=instance, liked=True)
          for name in liked_names:
            if name in other_parent_likes:
              agreed_names.append(name)
          data['agreed'] = agreed_names
          
        return JsonResponse(data)