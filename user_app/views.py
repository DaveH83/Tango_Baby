from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import App_user


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
    # Return JSON obj with only key as 'username' to be either the username or None
    try:
        new_user = App_user.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_superuser=super_user,
            is_staff=staff,
        )
        new_user.save()
        return JsonResponse({"username": username})
    except Exception as e:
        print(e)
        return JsonResponse({"username": None})
    

@api_view(["POST"])
def user_login(request):
    # Handle login
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(username=username, password=password)
    if user is not None and user.is_active:
        # Return JSON obj with only key as 'username' to be either the username or None
        try:
            login(request._request, user)
            return JsonResponse({"username": user.username})
        except Exception as e:
            print(e)
            return JsonResponse({"username": None})
    return JsonResponse({"username": None})


@api_view(["POST"])
def user_logout(request):
    # Handle logout
    try:
        logout(request)
        return JsonResponse({"success": True})
    except Exception as e:
        print(e)
        return JsonResponse({"success": False})


# Serve the react app
@api_view(["GET"])
def home(request):
    # Get the index for the react app
    # file = open("static/index.html")
    # Read it to a variable
    # resp = file.read()
    # So we can then responsibly close the file and serve the app
    # file.close()
    return HttpResponse("Django Home")