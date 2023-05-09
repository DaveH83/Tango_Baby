from django.http import HttpResponse
from rest_framework.decorators import api_view


def front(request):
    index = open('static/index.html')
    return HttpResponse(index)


def catch_all(request):
    index = open('static/index.html')
    return HttpResponse(index)
