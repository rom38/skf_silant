from django.contrib import admin
from django import forms
from django.conf import settings

from .models import MachineModel, EngineModel, TransmissionModel
from .models import DrivelineModel, SteeringAxelModel, MaintenanceType
from .models import FailureComponent, RestorationMethod
from .models import MaintenanceOrganization, Machine
from .models import Maintenance, Complaint, User

admin.site.register(MachineModel)
admin.site.register(EngineModel)
admin.site.register(TransmissionModel)
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
# admin.site.register(Machine)
admin.site.register(Maintenance)
admin.site.register(Complaint)
admin.site.register(User)


class CategoryChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return obj.first_name


class MachineModelAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "buyer_client_fk":
            return CategoryChoiceField(
                queryset=User.objects.filter(groups__name__in=["Клиенты"])
                .exclude(first_name__isnull=True)
                .exclude(first_name__exact=""),
                label="Клиент",
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Machine, MachineModelAdmin)
