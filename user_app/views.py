from django.shortcuts import HttpResponse
from rest_framework.decorators import api_view


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