import json
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from tutorial.quickstart.serializers import UserSerializer, GroupSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.views import APIView
from tutorial.quickstart.models import Task
from tutorial.quickstart.serializers import TaskSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.utils.decorators import method_decorator


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def hello_world(request):
    """
    Function view
    """
    return Response({"message": "Hello world", "user": str(request.user)})


class HelloWorldAnonView(APIView):
    @method_decorator(csrf_exempt)
    def get(self, request, format=None):
        return Response({"message": "Hello world anonymous", "user": str(request.user)})


class HelloWorldViewSet(viewsets.ViewSet):
    # authentication required
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        return Response({"message": "Hello world view set up and running " + str(request.user)})


class TaskViewSet(viewsets.ModelViewSet):
    # ModelViewSet
    #queryset = Task.objects.all().order_by("created")
    queryset = Task.objects.filter(state="NEW")
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def partial_update(self, request, pk=None):
        payload = JSONParser().parse(request)
        print("Got partial update " + json.dumps(payload))
        t = Task.objects.get(id=payload["taskId"])
        t.state = payload["state"]
        t.save()
        return Response("Updated", status=204)
