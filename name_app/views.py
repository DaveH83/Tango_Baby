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
@api_view(["POST", "GET", "PUT"])
def handle_children(request):
    if request.user.is_authenticated:
        user_info = serialize("json", [request.user], fields=["email"])
        user_info_workable = json.loads(user_info)
        curr_user_id=user_info_workable[0]['pk']
        data = request.data.dict()
        nickname = data['nickname']

        if request.method == "GET":
            # return all children objects for this parent
            pass
        elif request.method == "PUT":
            # updates blacklist
            # checks for user entry for proposed blacklist user
            blacklist_user = App_User.objects.filter(email=data['blacklist_email'])
            if len(blacklist_user) == 0:
                return JsonResponse({'message': 'blacklist user not found', 'success': False})
            curr_user = App_User.objects.get(id=curr_user_id)
            curr_child_p1 = Child.objects.filter(nickname=nickname, parent_1=curr_user)
            # check if user is parent1
            if len(curr_child_p1) > 0:
                entry = Blacklist.objects.filter(user=blacklist_user[0], child=curr_child_p1[0])
                # check if black list entry already exists
                if len(entry) == 0:
                    Blacklist.objects.create(
                        user=blacklist_user[0],
                        child=curr_child_p1[0]
                    )
                    return JsonResponse({'message': 'black list entry added', 'success': True})
                return JsonResponse({'message': 'Black list entry already found', 'success': False})
            else:
                curr_child_p2 = Child.objects.filter(nickname=nickname,parent_2=user_info_workable[0]['fields']['email'])
                # check if user is parent2
                if len(curr_child_p2) > 0:
                    entry = Blacklist.objects.filter(user=blacklist_user[0], child=curr_child_p1[0])
                    # check if black list entry already exists
                    if len(entry) > 0:
                        Blacklist.objects.create(
                            user=blacklist_user[0],
                            child=curr_child_p2[0]
                        )
                        return JsonResponse({'message': 'black list entry added', 'success': True})
                    return JsonResponse({'message': 'Black list entry already found', 'success': False})
            return JsonResponse({'message': 'You are not a parent', 'success': False})
        elif request.method == "POST":
            # adds new child object
            parent_2 = None
            p_url = None
            id = int(curr_user_id)
            g_url = uuid.uuid4()
            if data['parent_2']:
                parent_2 = data['parent_2']
            else:
                p_url = uuid.uuid4()
            
            data['parent_1'] = id
            data['parent_2'] = parent_2
            data['parent_url'] = p_url
            data['guest_url'] = g_url

            # see if child already exists for parent_1
            p = App_User.objects.get(id=id)
            children = Child.objects.filter(parent_1=p).filter(nickname=nickname)
            if len(children) == 0:
                Child.objects.create(
                    nickname=nickname,
                    parent_1=p,
                    parent_2=parent_2,
                    parent_url=p_url,
                    guest_url=g_url,
                )
            else:
                return JsonResponse({'message': 'child already exists', 'success': False})
        return JsonResponse(data)
    return JsonResponse({'message': 'You are not logged in', 'success': False})


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
