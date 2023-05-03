from rest_framework.decorators import api_view
from ..user_app.models import App_User, Child, Name, Voted_Name, Blacklist


# Handle viewing and adding children
@api_view(["POST", "GET"])
def handle_children(request):
    if request.method == "GET":
        # return all children objects for this parent
        pass
    elif request.method == "POST":
        # add new child object
        pass


# Handle viewing, voting, and adding singular names
@api_view(["POST", "GET", "PUT"])
def handle_name(request):
    if request.method == "GET":
        # return a new single name to vote on
        pass
    elif request.method == "POST":
        # add new name object
        pass
    elif request.method == "PUT":
        # update name object with a vote
        pass


# Handle viewing and ranking of pairs of names
@api_view(["GET", "PUT"])
def handle_names(request):
    if request.method == "GET":
        # return a pair of names to rank
        pass
    elif request.method == "PUT":
        # update names objects with ranking
        # this will require future model update most likely
        pass
