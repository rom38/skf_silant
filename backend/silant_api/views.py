from django.shortcuts import render
from django.db.models import Q

# Create your views here.


import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
)
from django.views.decorators.csrf import csrf_exempt

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
from .models import MachineModel
from .models import EngineModel
from .models import TransmissionModel
from .models import DrivelineModel
from .models import SteeringAxelModel
from .models import MaintenanceType
from .models import FailureComponent
from .models import RestorationMethod
from .models import MaintenanceOrganization

# from .models import Recipie
from .serializers import MachineSerializer
from .serializers import MachineSerializerTenFields
from .serializers import MaintenanceSerializer
from .serializers import ComplaintSerializer
from .serializers import UserSerializer
from .serializers import LoginSerializer
from .serializers import CSRFSerializer
from .serializers import LogoutSerializer
from .serializers import IsAuthenticatedSerializer
from .serializers import CatalogSerializer

from .permissions import UserMachinesPermission

# from .serializers import RecipieSerializer


def get_csrf(request):
    response = JsonResponse({"detail": "CSRF cookie set"})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return JsonResponse(
            {"detail": "Please provide username and password."}, status=400
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"detail": "Invalid credentials."}, status=400)

    login(request, user)
    return JsonResponse({"detail": "Successfully logged in."})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"detail": "You're not logged in."}, status=400)

    logout(request)
    return JsonResponse({"detail": "Successfully logged out."})


class SessionView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({"isAuthenticated": True})


class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return JsonResponse({"username": request.user.username})


class MachineViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    # queryset = Machine.objects.prefetch_related(
    #     "machine_model_fk",
    #     "engine_model_fk",
    #     "transmission_model_fk",
    #     "driveline_model_fk",
    #     "steering_axel_model_fk",
    #     "buyer_client_fk",
    #     "maintenance_organization_fk",
    # ).all()
    # serializer_class = MachineSerializer
    lookup_field = "machine_serial"
    permission_classes = (UserMachinesPermission,)

    def get_serializer_class(self):
        if self.request.user.is_anonymous:
            return MachineSerializerTenFields
        return MachineSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        queryset = Machine.objects.prefetch_related(
            "machine_model_fk",
            "engine_model_fk",
            "transmission_model_fk",
            "driveline_model_fk",
            "steering_axel_model_fk",
            "buyer_client_fk",
            "maintenance_organization_fk",
        )
        if self.request.user.is_anonymous:
            return queryset
        elif self.request.user.groups.filter(name="Менеджер").exists():
            return queryset

        else:
            return queryset.filter(
                Q(buyer_client_fk=self.request.user)
                | Q(maintenance_organization_fk__user_fk=self.request.user)
            )

    # permission_classes = [permissions.IsAuthenticated]


class MaintenanceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Maintenance.objects.prefetch_related(
            "machine_fk", "maintenance_type_fk", "maintenance_organization_fk"
        ).all()

        if self.request.user.groups.filter(name="Менеджер").exists():
            return queryset

        else:
            return queryset.filter(
                Q(machine_fk__buyer_client_fk=self.request.user)
                | Q(maintenance_organization_fk__user_fk=self.request.user)
            )


class ComplaintViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    serializer_class = ComplaintSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Complaint.objects.prefetch_related(
            "machine_fk",
            "failure_component_fk",
            "restoration_method_fk",
            "maintenance_organization_fk",
        ).all()

        if self.request.user.groups.filter(name="Менеджер").exists():
            return queryset

        else:
            return queryset.filter(
                Q(machine_fk__buyer_client_fk=self.request.user)
                | Q(maintenance_organization_fk__user_fk=self.request.user)
            )


class ProfileViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # def get_object(self):
    #     return self.request.user
    def list(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


# class LoginViewSet(mixins.CreateModelMixin,
#                                 viewsets.GenericViewSet):
class LoginViewSet(viewsets.ViewSet):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)
    # queryset = User.objects.all()
    serializer_class = LoginSerializer

    # @action(detail=True, methods=['post'])
    def create(self, request):
        if request.user.is_authenticated:
            logout(request)

        serializer = LoginSerializer(
            data=self.request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)


class CSRFViewSet(viewsets.ViewSet):
    # This view should be accessible also for unauthenticated users.
    # permission_classes = (permissions.AllowAny,)
    # queryset = User.objects.all()
    serializer_class = CSRFSerializer

    # @action(detail=True, methods=['post'])
    def list(self, request):
        csrf_token = get_token(request)
        serializer = CSRFSerializer(
            {"detail": "CSRF cookie set", "csrf": csrf_token}
        )
        # response = JsonResponse(
        # {"detail": "CSRF cookie set", "csrf": csrf_token}
        # )
        # response["X-CSRFToken"] = csrf_token
        return Response(serializer.data, headers={"X-CSRFToken": csrf_token})


class LogoutViewSet(viewsets.ViewSet):
    # This view should be accessible also for unauthenticated users.
    # permission_classes = (permissions.AllowAny,)
    # queryset = User.objects.all()
    serializer_class = LogoutSerializer

    # @action(detail=True, methods=['post'])
    def list(self, request):
        if not request.user.is_authenticated:
            serializer = LogoutSerializer({"detail": "You're not logged in."})
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

        logout(request)
        serializer = LogoutSerializer({"detail": "Successfully logged out."})
        return Response(serializer.data)


class IsAuthenticatedViewSet(viewsets.ViewSet):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]
    # This view should be accessible also for unauthenticated users.
    # permission_classes = (permissions.AllowAny,)
    # queryset = User.objects.all()
    serializer_class = IsAuthenticatedSerializer

    # @action(detail=True, methods=['post'])
    def list(self, request):
        serializer = IsAuthenticatedSerializer({"isAuthenticated": True})
        return Response(serializer.data)


class CatalogsViewSet(viewsets.GenericViewSet):
    serializer_class = CatalogSerializer

    def list(self, request):
        machine_model = MachineModel.objects.all()
        engine_model = EngineModel.objects.all()
        transmission_model = TransmissionModel.objects.all()
        driveline_model = DrivelineModel.objects.all()
        steering_axel_model = SteeringAxelModel.objects.all()
        maintenance_type = MaintenanceType.objects.all()
        failure_component = FailureComponent.objects.all()
        restoration_method = RestorationMethod.objects.all()
        maintenance_organization = MaintenanceOrganization.objects.all()

        serializer = CatalogSerializer(
            {
                "machine_model": machine_model,
                "engine_model": engine_model,
                "transmission_model": transmission_model,
                "driveline_model": driveline_model,
                "steering_axel_model": steering_axel_model,
                "maintenance_type": maintenance_type,
                "failure_component": failure_component,
                "restoration_method": restoration_method,
                "maintenance_organization": maintenance_organization,
            }
        )
        return Response(serializer.data)
