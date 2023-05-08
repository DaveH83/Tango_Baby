from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import App_User, Voted_Name, Child
import json
from django.core.serializers import serialize
from django.forms.models import model_to_dict


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


@api_view(["GET"])
def curr_user(request):
    if request.user.is_authenticated:

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
    
    return JsonResponse({"error": "Not currently logged in."})
