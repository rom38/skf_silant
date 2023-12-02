from django.contrib import admin
from .models import MachineModel, EngineModel, TransmissionModel
from .models import DrivelineModel, SteeringAxelModel, MaintenanceType
from .models import FailureComponent, RestorationMethod
from .models import MaintenanceOrganization # Machine

# Register your models here.


admin.site.register(MachineModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
admin.site.register(SteeringAxelModel)
admin.site.register(DrivelineModel)
admin.site.register(MaintenanceType)
admin.site.register(FailureComponent)
admin.site.register(RestorationMethod)
admin.site.register(MaintenanceOrganization)
#admin.site.register(Machine)
