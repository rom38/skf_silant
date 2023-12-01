from django.contrib import admin
from .models import MachineModel, EngineModel, TransmissionModel

admin.site.register(MachineModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
# Register your models here.
