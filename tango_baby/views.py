from django.http import HttpResponse
from rest_framework.decorators import api_view

@api_view(['GET'])  # I don't think we need the api decorator for serving up this view
def front(request):
    index = open('static/index.html')
    return HttpResponse(index)