from rest_framework import serializers

from .models import Machine

# from .models import Maintenance


class MachineSerializer(serializers.ModelSerializer):
    machine_model_name = serializers.CharField(source="machine_model_fk.name")

    class Meta:
        model = Machine
        fields = [
            "machine_model_fk",
            "machine_model_name",
            "machine_serial",
            "engine_model_fk",
            "engine_serial",
            "transmission_model_fk",
            "transmission_serial",
            "driveline_model_fk",
            "driveline_model_serial",
            "steering_axel_model_fk",
            "steering_axel_model_serial",
            "supply_contract",
            "factory_delivery_date",
            "buyer_client_fk",
            "end_user",
            "delivery_address",
            "machine_configuration",
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
