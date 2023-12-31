from rest_framework import serializers
from django.contrib.auth.models import Group

from django.contrib.auth import authenticate
from rest_framework.validators import UniqueTogetherValidator


from .models import Machine
from .models import MachineModel
from .models import EngineModel
from .models import TransmissionModel
from .models import DrivelineModel
from .models import SteeringAxelModel
from .models import MaintenanceType
from .models import FailureComponent
from .models import RestorationMethod
from .models import MaintenanceOrganization
from .models import Maintenance
from .models import Complaint
from .models import User

# from .models import Maintenance


class MachineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineModel
        fields = "__all__"


class EngineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineModel
        fields = "__all__"


class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = "__all__"


class DrivelineModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivelineModel
        fields = "__all__"


class SteeringAxelModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SteeringAxelModel
        fields = "__all__"


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = "__all__"


class FailureComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureComponent
        fields = "__all__"


class RestorationMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestorationMethod
        fields = "__all__"


class MaintenanceOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceOrganization
        fields = "__all__"


class MachineSerializer(serializers.ModelSerializer):
    machine_model_name = serializers.CharField(
        source="machine_model_fk.name", read_only=True
    )
    machine_model_description = serializers.CharField(
        source="machine_model_fk.description", read_only=True
    )

    engine_model_name = serializers.CharField(
        source="engine_model_fk.name", read_only=True
    )
    engine_model_description = serializers.CharField(
        source="engine_model_fk.description", read_only=True
    )

    transmission_model_name = serializers.CharField(
        source="transmission_model_fk.name", read_only=True
    )
    transmission_model_description = serializers.CharField(
        source="transmission_model_fk.description", read_only=True
    )

    driveline_model_name = serializers.CharField(
        source="driveline_model_fk.name", read_only=True
    )
    driveline_model_description = serializers.CharField(
        source="driveline_model_fk.description", read_only=True
    )

    steering_axel_model_name = serializers.CharField(
        source="steering_axel_model_fk.name", read_only=True
    )
    steering_axel_model_description = serializers.CharField(
        source="steering_axel_model_fk.description", read_only=True
    )

    buyer_client_name = serializers.CharField(
        source="buyer_client_fk.first_name", read_only=True
    )
    buyer_client_username = serializers.CharField(
        source="buyer_client_fk.username", read_only=True
    )
    maintenance_organization_description = serializers.CharField(
        source="maintenance_organization_fk.description", read_only=True
    )
    maintenance_organization_name = serializers.CharField(
        source="maintenance_organization_fk.name", read_only=True
    )
    maintenance_organization_username = serializers.CharField(
        source="maintenance_organization_fk.user_fk.username", read_only=True
    )

    class Meta:
        model = Machine
        fields = [
            "pk",
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
            "maintenance_organization_name",
            "maintenance_organization_description",
            "maintenance_organization_username",
        ]


class MachineSerializerTenFields(MachineSerializer):
    class Meta:
        model = Machine
        fields = [
            "pk",
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
        ]


class MaintenanceSerializer(serializers.ModelSerializer):
    # machine_model_name = serializers.CharField(source="machine_model_fk.name")

    machine_fk_model_name = serializers.CharField(
        source="machine_fk.machine_model_fk.name", read_only=True
    )
    machine_fk_serial = serializers.CharField(
        source="machine_fk.machine_serial", read_only=True
    )

    maintenance_pk = serializers.IntegerField(source="pk", read_only=True)
    maintenance_type_name = serializers.CharField(
        source="maintenance_type_fk.name", read_only=True
    )
    maintenance_type_description = serializers.CharField(
        source="maintenance_type_fk.description", read_only=True
    )

    maintenance_organization_description = serializers.CharField(
        source="maintenance_organization_fk.description", read_only=True
    )
    maintenance_organization_username = serializers.CharField(
        source="maintenance_organization_fk.user_fk.username", read_only=True
    )
    maintenance_organization_name = serializers.CharField(
        source="maintenance_organization_fk.name", read_only=True
    )

    class Meta:
        model = Maintenance
        fields = [
            "maintenance_pk",
            "machine_fk",
            "machine_fk_model_name",
            "machine_fk_serial",
            "maintenance_type_fk",
            "maintenance_type_name",
            "maintenance_type_description",
            "maintenance_date",
            "operating_hours",
            "work_order_number",
            "work_order_date",
            "maintenance_organization_fk",
            "maintenance_organization_name",
            "maintenance_organization_description",
            "maintenance_organization_username",
        ]


class ComplaintSerializer(serializers.ModelSerializer):
    # machine_model_name = serializers.CharField(source="machine_model_fk.name")
    complaint_pk = serializers.IntegerField(source="pk", read_only=True)

    machine_fk_model_name = serializers.CharField(
        source="machine_fk.machine_model_fk.name", read_only=True
    )
    machine_fk_serial = serializers.CharField(
        source="machine_fk.machine_serial", read_only=True
    )

    failure_component_name = serializers.CharField(
        source="failure_component_fk.name", read_only=True
    )
    failure_component_description = serializers.CharField(
        source="failure_component_fk.description", read_only=True
    )

    restoration_method_name = serializers.CharField(
        source="restoration_method_fk.name", read_only=True
    )
    restoration_method_description = serializers.CharField(
        source="restoration_method_fk.description", read_only=True
    )

    maintenance_organization_description = serializers.CharField(
        source="maintenance_organization_fk.description", read_only=True
    )
    maintenance_organization_username = serializers.CharField(
        source="maintenance_organization_fk.user_fk.username", read_only=True
    )
    maintenance_organization_name = serializers.CharField(
        source="maintenance_organization_fk.name", read_only=True
    )

    class Meta:
        model = Complaint
        fields = [
            "complaint_pk",
            "machine_fk",
            "machine_fk_model_name",
            "machine_fk_serial",
            "failure_date",
            "operating_hours",
            "failure_component_fk",
            "failure_component_name",
            "failure_component_description",
            "failure_description",
            "restoration_method_fk",
            "restoration_method_name",
            "restoration_method_description",
            "used_spare_parts",
            "restoration_date",
            "downtime_duration",
            "maintenance_organization_fk",
            "maintenance_organization_name",
            "maintenance_organization_description",
            "maintenance_organization_username",
        ]
        read_only_fields = ["downtime_duration"]
        validators = [
            UniqueTogetherValidator(
                queryset=Complaint.objects.all(),
                fields=["machine_fk", "failure_date"],
                message="Машина с такой датой отказа уже есть",
            )
        ]


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = [
            "name",
        ]


class UserSerializer(serializers.ModelSerializer):
    # groups = GroupSerializer(many=True)
    groups = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="name"
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "groups",
        ]


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * username
      * password.
    It will try to authenticate the user with when validated.
    """

    username = serializers.CharField(label="Имя", write_only=True)
    password = serializers.CharField(
        label="Пароль",
        # This will be used when the DRF browsable API is enabled
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        # Take username and password from request
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            # Try to authenticate the user using Django auth framework.
            user = authenticate(
                request=self.context.get("request"),
                username=username,
                password=password,
            )
            if not user:
                # If we don't have a regular user, raise a ValidationError
                msg = "Access denied: wrong username or password."
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code="authorization")
        # We have a valid user, put it in the serializer's validated_data.
        # It will be used in the view.
        attrs["user"] = user
        return attrs


class CSRFSerializer(serializers.Serializer):
    csrf = serializers.CharField(label="CSRF", read_only=True)
    detail = serializers.CharField(label="detail", read_only=True)


class LogoutSerializer(serializers.Serializer):
    detail = serializers.CharField(label="detail", read_only=True)


class IsAuthenticatedSerializer(serializers.Serializer):
    isAuthenticated = serializers.BooleanField()


class CatalogSerializer(serializers.Serializer):
    machine_model = MachineModelSerializer(many=True)
    engine_model = EngineModelSerializer(many=True)
    transmission_model = TransmissionModelSerializer(many=True)
    driveline_model = DrivelineModelSerializer(many=True)
    steering_axel_model = SteeringAxelModelSerializer(many=True)
    maintenance_type = MaintenanceTypeSerializer(many=True)
    failure_component = FailureComponentSerializer(many=True)
    restoration_method = RestorationMethodSerializer(many=True)
    maintenance_organization = MaintenanceOrganizationSerializer(many=True)
    buyer_client = UserSerializer(many=True)

    # def get_maintenance_type(self, obj):
    #     data = CardSerializer(obj.card.all(), many=True).data
    #     return data


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

# "machine_fk",
# "failure_date",
# "operating_hours",
# "failure_component_fk",
# "failure_description",
# "restoration_method_fk",
# "used_spare_parts",
# "restoration_date",
# "downtime_duration",
# "maintenance_organization_fk"
