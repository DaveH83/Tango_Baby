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
@api_view(["POST", "GET"])
def handle_name(request):
    if request.method == "POST":
        # add new name object   
        pass


# handle retrieving and displaying lists of voted on names sorted by vote type
@api_view(["GET"])
def handle_voted_names(request):
    
    #define parameters
    user = request.user
    child_id = request.child['pk']
    parent1 = request.child['parent1']
    if request.child['parent2']:
        parent2 = request.child['parent2']


    # Set current user liked / disliked names
    liked_names = Voted_Name.objects.filter(participant = user, child_id = child_id, liked = True)
    disliked_names = Voted_Name.objects.filter(participant = user, child_id = child_id, liked = False)

    # Define liked names for other parent
    if user == parent1:
        other_parent_liked_names = Voted_Name.objects.filter(participant = parent2, child = child_id, liked = True)
    elif user == parent2:
        other_parent_liked_names = Voted_Name.objects.filter(participant = parent2, child = child_id, liked = True)

    # compare liked names lists and compile agreed names if parent2 exists and format response   
    if parent2:
        agreed_names = []

        for name in liked_names:
            if name in other_parent_liked_names:
                agreed_names.append(name)
                
        response = {
            'liked': liked_names,
            'disliked': disliked_names,
            'agreed': agreed_names,
        }
    # format response with liked / disliked and null value for agreed since parent2 doesn't exist yet
    else:
        response = {
            'liked': liked_names,
            'disliked': disliked_names,
            'agreed': None,
        }


    return JsonResponse({'names': response})



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
