from django.urls import path, include
from . import views
from .viewsets import NameViewSet, VoteViewSet, ChildViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'name', NameViewSet, basename='name')
router.register(r'vote', VoteViewSet, basename='vote')
router.register(r'child', ChildViewSet, basename='child')

# All patterns proceeding by 'app/'
urlpatterns = [
    path("children/", views.handle_children),
    path("child/<str:uuid>", views.handle_child),
    path("name/", views.handle_name),
    path("swipe/", views.vote_name),
    path("ranking/", views.handle_ranking),
    path("namelist/<str:uuid>", views.handle_voted_names),
    path("new/", include(router.urls)),

]
