from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from rest_framework import permissions

from .models import Machine
from .models import Maintenance
from .models import Complaint

# from .models import Recipie
from .serializers import MachineSerializer
from .serializers import MaintenanceSerializer
from .serializers import ComplaintSerializer

# from .serializers import RecipieSerializer


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


# class RecipieViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """

#     queryset = Recipie.objects.all()
#     serializer_class = RecipieSerializer
#     # permission_classes = [permissions.IsAuthenticated]
