from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import App_User, Voted_Name, Child
import json
from django.core.serializers import serialize
from django.forms.models import model_to_dict
import requests
import os
from dotenv import load_dotenv

load_dotenv()

@api_view(["POST"])
def register_user(request):
    # Handle creating new user, this will change in time as the user model grows for more profile information
    username = request.data["username"]
    email = request.data["email"]
    password = request.data["password"]
    super_user = False
    staff = False
    if "super" in request.data:
        super_user = request.data["super"]
    if "staff" in request.data:
        staff = request.data["staff"]
    # Return JSON obj with only key as 'username' to be either the user email or None
    try:
        new_user = App_User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_superuser=super_user,
            is_staff=staff,
        )
        new_user.save()
        return JsonResponse({"user": email})
    except Exception as e:
        print(e)
        return JsonResponse({"user": None})


@api_view(["POST"])
def user_login(request):
    # Handle login
    email = request.data["email"]
    password = request.data["password"]
    user = authenticate(email=email, password=password)
    if user is not None and user.is_active:
        # Return JSON obj with only key as 'user' to be either the user email or None
        try:
            login(request._request, user)
            return JsonResponse({"user": user.email})
        except Exception as e:
            print(e)
            return JsonResponse({"user": None})
    return JsonResponse({"user": None})


@api_view(["POST"])
def user_logout(request):
    # Handle logout
    try:
        logout(request)
        return JsonResponse({"success": True})
    except Exception as e:
        print(e)
        return JsonResponse({"success": False})


@api_view(["GET", "PUT", "DELETE"])
def curr_user(request):
    if request.user.is_authenticated:
        if request.method == "GET":
            user_info = serialize("json", [request.user], fields=[
                                "username", "email", "pk", "last_updated", "date_joined"])
            user_info_workable = json.loads(user_info)
            user_info_workable[0]['fields']['pk'] = request.user.pk
        
            kids=[model_to_dict(voted_name)for voted_name in (Voted_Name.objects.filter(participant = request.user).distinct('child_id'))]
        
        
            output = []

            for kid in kids:
                new_kid = Child.objects.filter(id=kid['child'])
                output.extend(json.loads(serialize("json", new_kid)))

            children = []

            for kid in output:
                children.append(kid['fields'])

            response = {
                'curr_user': user_info_workable[0]["fields"],
                'children': children,
            }

            return JsonResponse(response)
        elif request.method == "PUT":
            try:
                user_info = json.loads(serialize("json", [request.user]))[0]
                user = App_User.objects.get(id=user_info['pk'])
                user.set_password(request.data['password'])
                user.save()
                return JsonResponse({"success": True, "message": "Updated users password"})
            except Exception as e:
                return JsonResponse({"success": False, "message": e})
        elif request.method == "DELETE":
            try:
                user_info = json.loads(serialize("json", [request.user]))[0]
                user = App_User.objects.get(id=user_info['pk'])
                user.is_active = False
                user.save()
                return JsonResponse({"success": True, "message": "Deleted User"})
            except Exception as e:
                return JsonResponse({"success": False, "message": e})
    
    return JsonResponse({"error": "Not currently logged in."})



@api_view(["GET"])
def dad_joke(request):
    
    api_url = 'https://api.api-ninjas.com/v1/dadjokes?limit=1'
    response = requests.get(api_url, headers={'X-Api-Key': os.environ['dad_joke_api_key']})
    
    if response.status_code == requests.codes.ok:
        joke = json.loads(response.text)
        print(joke[0]['joke'])
        return JsonResponse({'joke': joke[0]['joke']})
    else:
        print("Error:", response.status_code, response.text)
        return JsonResponse({"dad_joke":["Error", response.status_code]})