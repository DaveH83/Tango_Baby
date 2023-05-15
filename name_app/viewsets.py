from rest_framework import viewsets
from django.apps import apps
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view

App_User = apps.get_model('user_app', 'App_User')
Child = apps.get_model('user_app', 'Child')
Name = apps.get_model('user_app', 'Name')
Voted_Name = apps.get_model('user_app', 'Voted_Name')
Blacklist = apps.get_model('user_app', 'Blacklist')

class NameViewSet(viewsets.ModelViewSet):
  serializer_class = NameSerializer
  queryset = Name.objects.all()

  # get list of 100 names by calling /app/name/ with GET
  def list(self, request, *args, **kwargs):
        # can do most popular, alphabetical (still most popular) or search by term
        # request.data(body) - alphabetical (boolean), match (string)
        #queryset = self.filter_queryset(self.get_queryset())
        if 'match' in request.data:
          queryset = Name.objects.filter(headline__icontains=request.data['match']).order_by("popularity")[:100]
        else:
          queryset = Name.objects.order_by("popularity")[:100]
        if 'alphabetical' in request.data:
           queryset = queryset.order_by("name")

        # django mix-in standard code below
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class VoteViewSet(viewsets.ModelViewSet):
  serializer_class = VoteSerializer
  queryset = Voted_Name.objects.all()

  # Modify main url POST method
  def create(self, request, *args, **kwargs):
    # data - name, liked(boolean), child(id)
    request.data['participant'] = request.user.id
    if 'liked' not in request.data:
      request.data['liked'] = True
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    self.perform_create(serializer)
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data,
                    status=status.HTTP_201_CREATED,
                    headers=headers)

@api_view(["POST"])
def add_rank(request):
  print('add')
  try:
    vote = Voted_Name.objects.get(participant=request.user, name=request.data['name'])
    print(vote.weight)
    vote.weight += 1
    print('new', vote.weight)
    vote.save()
    return JsonResponse({'success': True})
  except: 
    return JsonResponse({'success': False})

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
        data['liked'] = [model_to_dict(Name.objects.get(id=vote['name_id'])) for vote in liked_names.values() if vote['name_id']!=1]
        data['disliked'] = [model_to_dict(Name.objects.get(id=vote['name_id'])) for vote in disliked_names.values() if vote['name_id']!=1]
        if instance.parent_2 and instance.parent_1:
          print('agreed')
          # determine mutually liked name
          agreed_names = []
          if request.user == instance.parent_1:
            parent_2 = App_User.objects.get(email=instance.parent_2)
            other_parent_likes_query = Voted_Name.objects.filter(participant=parent_2, child=instance, liked=True)
          elif request.user.email == instance.parent_2:
            parent_1 = App_User.objects.get(id=instance.parent_1)
            other_parent_likes_query = Voted_Name.objects.filter(participant=parent_1, child=instance, liked=True)
          other_parent_likes = [ model_to_dict(Name.objects.get(id=vote['name_id'])) for vote in other_parent_likes_query.values() if vote['name_id']!=1]
          print(other_parent_likes)
          for name in data['liked']:
            if name in other_parent_likes:
              vote = Voted_Name.objects.get(name=name['id'],participant=request.user,child=instance,liked=True)
              print(vote)
              agreed_names.append({**name, 'vote':vote.id, 'weight': vote.weight})
          data['agreed'] = agreed_names
        else:
          data['agreed'] = []
        print(data)
        return JsonResponse(data)