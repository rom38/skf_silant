from rest_framework import serializers

from .models import Machine
from .models import Maintenance

# from .models import Maintenance


class MachineSerializer(serializers.ModelSerializer):
    machine_model_name = serializers.CharField(source="machine_model_fk.name")
    machine_model_description = serializers.CharField(
        source="machine_model_fk.description"
    )

    engine_model_name = serializers.CharField(source="engine_model_fk.name")
    engine_model_description = serializers.CharField(
        source="engine_model_fk.description"
    )

    transmission_model_name = serializers.CharField(
        source="transmission_model_fk.name"
    )
    transmission_model_description = serializers.CharField(
        source="transmission_model_fk.description"
    )

    driveline_model_name = serializers.CharField(
        source="driveline_model_fk.name"
    )
    driveline_model_description = serializers.CharField(
        source="driveline_model_fk.description"
    )

    steering_axel_model_name = serializers.CharField(
        source="steering_axel_model_fk.name"
    )
    steering_axel_model_description = serializers.CharField(
        source="steering_axel_model_fk.description"
    )

    buyer_client_name = serializers.CharField(
        source="buyer_client_fk.first_name"
    )
    buyer_client_username = serializers.CharField(
        source="buyer_client_fk.username"
    )
    maintenance_organization_description = serializers.CharField(
        source="maintenance_organization_fk.description"
    )
    maintenance_organization_username = serializers.CharField(
        source="maintenance_organization_fk.user_fk.username"
    )

    class Meta:
        model = Machine
        fields = [
            "machine_model_fk",
            "machine_model_name",
            "machine_model_description",
            "machine_serial",
            "engine_model_fk",
            "engine_model_name",
            "engine_model_description",
            "engine_serial",
            "transmission_model_fk",
            "transmission_model_name",
            "transmission_model_description",
            "transmission_serial",
            "driveline_model_fk",
            "driveline_model_name",
            "driveline_model_description",
            "driveline_model_serial",
            "steering_axel_model_fk",
            "steering_axel_model_name",
            "steering_axel_model_description",
            "steering_axel_model_serial",
            "supply_contract",
            "factory_delivery_date",
            "buyer_client_fk",
            "buyer_client_name",
            "buyer_client_username",
            "end_user",
            "delivery_address",
            "machine_configuration",
            "maintenance_organization_fk",
            "maintenance_organization_description",
            "maintenance_organization_username",
        ]


class MaintenanceSerializer(serializers.ModelSerializer):
    #machine_model_name = serializers.CharField(source="machine_model_fk.name")

    class Meta:
        model = Maintenance
        fields = [
            "machine_fk",
            "maintenance_type_fk",
            "maintenance_date",
            "operating_hours",
            "work_order_number",
            "work_order_date",
            "maintenance_organization_fk",
        ]


# class RecipieSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Recipie
#         fields = ["id", "name", "source", "instructions", "category"]

# machine_model_fk
# machine_serial
# engine_model_fk
# engine_serial
# transmission_model_fk
# transmission_serial
# driveline_model_fk
# driveline_model_serial
# steering_axel_model_fk
# steering_axel_model_serial
# supply_contract
# factory_delivery_date
# buyer_client_fk
# end_user
# delivery_address
# machine_configuration
# maintenance_organization_fk


# "machine_fk",
# "maintenance_type_fk",
# "maintenance_date",
# "operating_hours",
# "work_order_number",
# "work_order_date",
# "maintenance_organization_fk"
