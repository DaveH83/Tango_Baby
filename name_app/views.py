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
# Name serializer
# class NameSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Name
#         fields = '__all__'
@api_view(["GET","POST"])
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
