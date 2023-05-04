from django.http import JsonResponse
from django.core.serializers import serialize
from rest_framework.decorators import api_view
from django.apps import apps
from django.forms.models import model_to_dict
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
        user_info = json.loads(serialize("json", [request.user], fields=["email"]))[0]
        curr_user_id=user_info['pk']
        data = request.data.dict()
        nickname = data['nickname']
        
        if request.method == "GET":
            # return all children objects for this parent
            kids = []
            curr_user = App_User.objects.get(id=curr_user_id)
            children_p1 = Child.objects.filter(parent_1=curr_user)
            kids.extend(json.loads(serialize("json", children_p1)))
            children_p2 = Child.objects.filter(parent_2=curr_user.email)
            kids.extend(json.loads(serialize("json", children_p2)))
            if len(kids) > 0:
                return JsonResponse({'kids': kids, 'success': True})
            return JsonResponse({'message': 'No children found', 'success': False})
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
                curr_child_p2 = Child.objects.filter(nickname=nickname,parent_2=user_info['fields']['email'])
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
            g_url = uuid.uuid4()
            if data['parent_2']:
                parent_2 = data['parent_2']
            else:
                p_url = uuid.uuid4()
            
            data['parent_1'] = curr_user_id
            data['parent_2'] = parent_2
            data['parent_url'] = p_url
            data['guest_url'] = g_url

            # see if child already exists for parent_1
            p = App_User.objects.get(id=curr_user_id)
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
        return JsonResponse({'message': 'You are logged in but something went wrong', 'success': False})
    return JsonResponse({'message': 'You are not logged in', 'success': False})


# Handle viewing, voting, and adding singular names

@api_view(["POST", "GET"])
def handle_name(request):
    # get name list 
    if request.method == "GET":
        try:
            names=Name.objects.all()
            name_list=[model_to_dict (name) for name in names]
            return JsonResponse({'name_list':name_list})
        except Exception as e:
            print(e)
            return JsonResponse({'name_list':[]})
    # add new name object
    if request.method=="POST":
        #take name,gender,pk as request data 
        name=request.data['name']
        gender=request.data['gender']
        id=request.data['id']
        print(name,gender,id)
        body = request.body.decode('utf-8')
        print('body',body)
        child=Child.objects.filter(id=id)
        participant=request.user
        if Name.objects.filter(name=name,gender=gender).exists():
            try:
                new_vote=Voted_Name.objects.create(name=name,liked=True,participant=participant,child=child)
                new_vote.save()
                return JsonResponse({'add child':True})
            except Exception as e:
                print(e)
                return JsonResponse({'add child':False})
        else:
            try:
                new_name=Name.objects.create(name=name,popularity=None,gender=gender)
                new_name.save()
                new_vote=Voted_Name.objects.create(name=name,liked=True,participant=participant,child=child)
                new_vote.save()
                return JsonResponse({'add child':True})
            except Exception as e:
                print(e)
                return JsonResponse({'add child':False})
        
        
    

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
