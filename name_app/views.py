from django.http import JsonResponse
from django.core.serializers import serialize
from rest_framework.decorators import api_view
from django.apps import apps
import json, uuid
App_User = apps.get_model('user_app', 'App_User')
Child = apps.get_model('user_app', 'Child')
Name = apps.get_model('user_app', 'Name')
Voted_Name = apps.get_model('user_app', 'Voted_Name')
Blacklist = apps.get_model('user_app', 'Blacklist')


# Handle viewing and adding children
@api_view(["POST", "GET"])
def handle_children(request):
    if request.user.is_authenticated:
        user_info = serialize("json", [request.user], fields=["email"])
        user_info_workable = json.loads(user_info)
        curr_user_id=user_info_workable[0]['pk']
        if request.method == "GET":
            # return all children objects for this parent
            pass
        elif request.method == "POST":
            # add new child object
            d = request.data.dict()
            parent_2 = None
            p_url = None
            id = int(curr_user_id)
            g_url = uuid.uuid4()
            nickname = d['nickname']
            if d['parent_2']:
                parent_2 = d['parent_2']
            else:
                p_url = uuid.uuid4()
            
            d['parent_1'] = id
            d['parent_2'] = parent_2
            d['parent_url'] = p_url
            d['guest_url'] = g_url

            # see if child already exists for parent_1
            children = Child.objects.filter(id=id, nickname=nickname)
            if len(children) == 0:
                Child.objects.create(
                    nickname=nickname,
                    parent_1=id,
                    parent_2=parent_2,
                    parent_url=p_url,
                    guest_url=g_url,
                )
            else:
                return JsonResponse
        return JsonResponse(d)
    return JsonResponse({'founduser': False})


# Handle viewing, voting, and adding singular names
@api_view(["POST"])
def handle_name(request):
    if request.method == "POST":
        # add new name object   
        pass


# Handle viewing and ranking of pairs of names
@api_view(["GET", "PUT"])
def handle_ranking(request):
    if request.method == "GET":
        # return a pair of names to rank
        pass
    elif request.method == "PUT":
        # update names objects with ranking
        # this will require future model update most likely
        pass
