from django.http import JsonResponse
from django.core.serializers import serialize
from rest_framework.decorators import api_view
from django.apps import apps
from django.forms.models import model_to_dict
from datetime import datetime
import json, uuid
App_User = apps.get_model('user_app', 'App_User')
Child = apps.get_model('user_app', 'Child')
Name = apps.get_model('user_app', 'Name')
Voted_Name = apps.get_model('user_app', 'Voted_Name')
Blacklist = apps.get_model('user_app', 'Blacklist')


# Handle viewing and adding children
@api_view(["GET", "PUT"])
def handle_child(request, uuid):
    
    if request.user.is_authenticated:
        # Find child from UUID

        if request.method == 'GET':

            # get specific child object based on UUID
            try:
                child = Child.objects.get(parent_url=uuid)
            except:
                child = Child.objects.get(guest_url=uuid)

            # Pull and clean up user data for parents
            parent1 = model_to_dict(child.parent_1, fields=['username', 'email', 'first_name', 'last_name'])
            if child.parent_2:
                parent2_obj = App_User.objects.get(email=child.parent_2)
                parent2 = model_to_dict(parent2_obj, fields=['username', 'email', 'first_name', 'last_name'])
            
            # serialize data and insert cleaned up parent data to final object
            child = model_to_dict(child)
            child['parent_1'] = parent1
            if child['parent_2']:
                child['parent_2'] = parent2
                    
            # return child object, now with parent information
            return JsonResponse({'message': 'Found UUID', 'success': True, 'child': child})
        
        if request.method == 'PUT':
            # get specific child object based on UUID
            try:
                child = Child.objects.get(parent_url=uuid)
            except:
                child = Child.objects.get(guest_url=uuid)

            if request.data['parent2']:
                try:
                    updated_parent2 = App_User.objects.get(email=request.data['parent2'])
                except:
                    return JsonResponse({'error':'Update failed.  No user account associated with that e-mail exists'})

                if updated_parent2:
                    default_child = Name.objects.get(name='DEFAULT', gender=child.gender)
                    child.parent_2 = request.data['parent2']
                    Voted_Name.objects.create(name=default_child, liked=True, participant = updated_parent2, child=child)

            if request.data['nickname']:
                child.nickname = request.data['nickname']
                
            if request.data['lastname']:
                child.last_name = request.data['lastname']

            if request.data['due_date']:
                date_str = request.data['due_date']
                date_obj = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                child.due_date = date_obj.strftime('%Y-%m-%d')

            print(child)
            child.save()


    return JsonResponse({'message': 'User is not logged in', 'success': False})


# Handle viewing and adding children
@api_view(["POST", "GET", "PUT"])
def handle_children(request):
    if request.user.is_authenticated:
        user_info = json.loads(serialize("json", [request.user], fields=["email"]))[0]
        curr_user_id=user_info['pk']
        data = request.data
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
            due_date = None
            p_url = uuid.uuid4()
            g_url = uuid.uuid4()
            gender = request.data['gender']
            lastname = request.data['lastname']
            if request.data['due_date']:
                date_str = request.data['due_date']
                date_obj = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                due_date = date_obj.strftime('%Y-%m-%d')
            if data['parent_2']:
                parent_2 = data['parent_2']

            # see if child already exists for parent_1
            p = App_User.objects.get(id=curr_user_id)
            children = Child.objects.filter(parent_1=p).filter(nickname=nickname)
            if len(children) == 0:
                # need to add try/except block here
                Child.objects.create(
                    nickname=nickname,
                    parent_1=p,
                    parent_2=parent_2,
                    last_name=lastname,
                    parent_url=p_url,
                    guest_url=g_url,
                    gender=gender,
                    due_date=due_date,
                )
                # get this new childs object to pass back to the front to be able to handle adding first voted_name
                new_kid_query = Child.objects.filter(parent_url=p_url)
                new_kid = json.loads(serialize("json", new_kid_query))[0]['fields']
                new_kid_id = json.loads(serialize("json", new_kid_query))[0]['pk']
                return JsonResponse({'message': 'child added to the DB', 'success': True, 'id': new_kid_id, 'child': new_kid})
            else:
                return JsonResponse({'message': 'child already exists', 'success': False})
        return JsonResponse({'message': 'You are logged in but something went wrong', 'success': False})
    return JsonResponse({'message': 'You are not logged in', 'success': False})

#Handle swiping name and create Voted_name objects
@api_view(["POST"])
def vote_name(request):
    if request.method=="POST":
        try:
            name=request.data['name']
            child_uuid=request.data['uuid']
            liked=request.data['liked']
            childIns=Child.objects.get(parent_url=child_uuid)
            nameIns=Name.objects.get(id=name['id'])
            participant=request.user
            if not Voted_Name.objects.filter(name=nameIns,participant=participant,child=childIns).exists():
                Voted_Name.objects.create(name=nameIns,liked=liked,participant=participant,child=childIns)
                return JsonResponse({'voted':True})
            else:
                return JsonResponse({'voted': False, 'message': 'Vote already exists.'})
        except Exception as e:
            print(e)
            return JsonResponse({'voted':False})

# Handle viewing, voting, and adding singular names
@api_view(["POST", "GET","PUT"])
def handle_name(request):
# get name list 
    if request.method == "PUT":
        try:
            uuid=request.data['uuid']
            child=Child.objects.get(parent_url=uuid)
            gender=child.gender
            names=Name.objects.filter(gender=gender)
            user=request.user
            name_list=[model_to_dict (name) for name in names]
            voted_list=[model_to_dict (voted_name)for voted_name in (Voted_Name.objects.filter(participant_id=user.id))]
            voted_list_id=[i['name'] for i in voted_list]
            unshown_list=[name for name in name_list if name['id'] not in voted_list_id][:20]
            return JsonResponse({'unshown_list':unshown_list})
        except Exception as e:
            print(e)
            return JsonResponse({'unshown_list':[]})
# add new name object
    if request.method=="POST":
        #take name,gender,pk as request data 
        name=request.data['name']
        gender=request.data['gender']
        id=request.data['id']
        child=Child.objects.get(id=id)
        participant=request.user
        if request.data['parent_2']:
            try:
                participant=App_User.objects.get(email=request.data['parent_2'])
            except Exception as e:
                participant=None
                print(e)

        if participant and Name.objects.filter(name=name,gender=gender).exists():
            try:
# get Name instance and create Voted_Name 
                nameIns=Name.objects.filter(name=name,gender=gender).first()
                Voted_Name.objects.create(name=nameIns,liked=True,participant=participant,child=child)
                return JsonResponse({'voted':True})
            except Exception as e:
                print(e)
                return JsonResponse({'voted':False})
        elif participant:
            try:
                new_name=Name.objects.create(name=name,popularity=None,gender=gender)
                Voted_Name.objects.create(name=new_name,liked=True,participant=participant,child=child)
                return JsonResponse({'added and voted':True})
            except Exception as e:
                print(e)
                return JsonResponse({'added and voted':False})
        
        
    

# handle retrieving and displaying lists of voted on names sorted by vote type
@api_view(["GET"])
def handle_voted_names(request, uuid):
    
    #define parameters
    user = request.user
    child = Child.objects.get(guest_url=uuid)
    parent1 = child.parent_1
    parent2 = None
    if child.parent_2:
        parent2 = App_User.objects.get(email=child.parent_2)
        
    
    # Declare variables liked / disliked / other parent liked names
    all_names = []
    all_names_set = set(all_names)
    duplicate_names = []
    liked_names = []
    disliked_names = []
    other_parent_liked_names = []
    alt_parent_liked_names = []
    agreed_names = []

    #pull all voted names for user
    names_query = Voted_Name.objects.filter(participant = user, child_id = child.id)

    # create list of all names and duplicate names
    for name in names_query:
        if name.name.name == 'DEFAULT':
            pass
        elif name.name.name not in all_names_set:
            all_names.append(name)
            all_names_set.add(name.name.name)
        else:            
            duplicate_names.append(name)

    # delete duplicate names from DB
    for name in duplicate_names:
        name.delete()

    # create like / disliked name lists
    for name in all_names:
        if name.liked == True:
            liked_name = model_to_dict(name.name)
            liked_names.append(liked_name)
        else:
            disliked_name = model_to_dict(name.name)
            disliked_names.append(disliked_name)
           
    # Define liked names for other parent as long as parent 2 exists
    # If current user is parent 1, pull liked names for parent 2
    if parent2 and user == parent1:
        alt_parent_liked_names = Voted_Name.objects.filter(participant = parent2, child = child.id, liked = True)

    # If current user is parent 2, pull liked names for parent 1
    elif parent2 and user.email == child.parent_2:
        alt_parent_liked_names = Voted_Name.objects.filter(participant = parent1, child = child.id, liked = True)

    # serialize other parent liked names query set, and add name string for rendering on front end if parent 2 exists
    if alt_parent_liked_names:
        for name in alt_parent_liked_names:
            alt_like = model_to_dict(name.name)
            other_parent_liked_names.append(alt_like)
        
    # compare liked names lists and compile agreed names if parent2 exists and format response   
    if parent2:
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

    # print('\nliked names\n****************\n', liked_names)
    # print('\ndisliked names\n****************\n', disliked_names)
    # print('\nagreed names\n****************\n', agreed_names)
    # print(response)

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
