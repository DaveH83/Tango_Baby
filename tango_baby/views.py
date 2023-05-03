from django.http import HttpResponse
from rest_framework.decorators import api_view

@api_view(['GET'])
def front(request):
    index = open('static/index.html')
    return HttpResponse(index)