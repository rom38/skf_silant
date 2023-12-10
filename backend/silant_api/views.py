from django.shortcuts import render

# Create your views here.


import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import status
from rest_framework.decorators import action


from rest_framework import viewsets
from rest_framework import permissions

from .models import Machine
from .models import Maintenance
from .models import Complaint
from .models import User

# from .models import Recipie
from .serializers import MachineSerializer
from .serializers import MaintenanceSerializer
from .serializers import ComplaintSerializer
from .serializers import UserSerializer
from .serializers import LoginSerializer

# from .serializers import RecipieSerializer




def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


class SessionView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'isAuthenticated': True})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({'username': request.user.username})



class MachineViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = Machine.objects.prefetch_related(
        "machine_model_fk",
        "engine_model_fk",
        "transmission_model_fk",
        "driveline_model_fk",
        "steering_axel_model_fk",
        "buyer_client_fk",
        "maintenance_organization_fk",
    ).all()
    serializer_class = MachineSerializer
    # permission_classes = [permissions.IsAuthenticated]


class MaintenanceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = Maintenance.objects.prefetch_related(
        "machine_fk", "maintenance_type_fk", "maintenance_organization_fk"
    ).all()
    serializer_class = MaintenanceSerializer
    # permission_classes = [permissions.IsAuthenticated]


class ComplaintViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = Complaint.objects.prefetch_related(
        "machine_fk",
        "failure_component_fk",
        "restoration_method_fk",
        "maintenance_organization_fk",
    ).all()
    serializer_class = ComplaintSerializer
    # permission_classes = [permissions.IsAuthenticated]


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # def get_object(self):
    #     return self.request.user
    def list(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        pass


# class LoginViewSet(mixins.CreateModelMixin,
#                                 viewsets.GenericViewSet):
class LoginViewSet(viewsets.ViewSet):
    # This view should be accessible also for unauthenticated users.
    # permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def login(self, request):
        serializer = LoginSerializer(data=self.request.data,
            context={ 'request': self.request })
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)

# class RecipieViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """

#     queryset = Recipie.objects.all()
#     serializer_class = RecipieSerializer
#     # permission_classes = [permissions.IsAuthenticated]
