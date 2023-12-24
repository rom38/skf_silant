from django.contrib import admin
from django import forms
from django.conf import settings
from django.contrib.auth.admin import UserAdmin

from .models import MachineModel, EngineModel, TransmissionModel
from .models import DrivelineModel, SteeringAxelModel, MaintenanceType
from .models import FailureComponent, RestorationMethod
from .models import Machine

from .models import MaintenanceOrganization
from .models import Maintenance, Complaint, User
from .forms import UserCreationForm, UserChangeForm

# admin.site.register(MachineModel)
# admin.site.register(EngineModel)
# admin.site.register(TransmissionModel)
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
# admin.site.register(Maintenance)
admin.site.register(Complaint)
# admin.site.register(User)


class MaintenanceModelAdmin(admin.ModelAdmin):
    list_display = ("machine_serial", "maintenance_date")
    list_filter = (
        # "username",
        # "first_name",
        "machine_fk__machine_serial",
        "maintenance_date",
    )

    @admin.display(
        ordering="machine_fk__machine_serial", description="Заводской № машины"
    )
    def machine_serial(self, obj):
        return obj.machine_fk.machine_serial


admin.site.register(Maintenance, MaintenanceModelAdmin)


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


class UserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ("username", "first_name")
    list_filter = (
        # "username",
        # "first_name",
        "groups",
    )
    # fieldsets = (
    #     (None, {'fields': ('email', 'password', 'first_name', 'last_name')}),
    #     ('Permissions', {'fields': ('is_staff', 'is_active')}),
    # )
    # add_fieldsets = (
    #     (None, {
    #         'classes': ('wide',),
    #         'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'is_staff', 'is_active')}
    #     ),
    # )
    search_fields = (
        "username",
        "first_name",
    )
    ordering = ("first_name",)


admin.site.register(User, UserAdmin)
