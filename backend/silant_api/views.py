from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from rest_framework import permissions
from .models import Machine

# from .models import Recipie
from .serializers import MachineSerializer

# from .serializers import RecipieSerializer


class MachineViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    # permission_classes = [permissions.IsAuthenticated]


# class RecipieViewSet(viewsets.ReadOnlyModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """

#     queryset = Recipie.objects.all()
#     serializer_class = RecipieSerializer
#     # permission_classes = [permissions.IsAuthenticated]
