from django.contrib.auth.models import AbstractUser
from django.db import models

# from django.conf import settings
# использования settings.AUTH_USER_MODEL вместо непосредственной ссылки
# на класс User
# from django.contrib.auth.models import User

# Create your models here.


# for future refactoring and changing
# Requirements
# Для более простого расширения функционала в будущем
class User(AbstractUser):
    pass


class MachineModel(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Модель техники"
        verbose_name_plural = "Модели техники"
        ordering = ["name"]


class EngineModel(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Модель двигателя"
        verbose_name_plural = "Модели двигателей"
        ordering = ["name"]


class TransmissionModel(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Модель трансмиссии"
        verbose_name_plural = "Модели трансмиссий"
        ordering = ["name"]


class DrivelineModel(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Модель ведущего моста"
        verbose_name_plural = "Модели ведущих мостов"
        ordering = ["name"]


class SteeringAxelModel(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Модель управляемого моста"
        verbose_name_plural = "Модели управляемых мостов"
        ordering = ["name"]


class MaintenanceType(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Вид технического обслуживания"
        verbose_name_plural = "Виды технического обслуживания"
        ordering = ["name"]


class FailureComponent(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Узел отказа"
        verbose_name_plural = "Узлы отказа"
        ordering = ["name"]


class RestorationMethod(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Способ восстановления"
        verbose_name_plural = "Способы восстановления"
        ordering = ["name"]


class MaintenanceOrganization(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название", unique=True)
    description = models.TextField(verbose_name="Описание")
    user_fk = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True
    )

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Сервисная компания"
        verbose_name_plural = "Сервисные компании"
        ordering = ["name"]


class Machine(models.Model):
    machine_model_fk = models.ForeignKey(
        MachineModel, verbose_name="Модель техники", on_delete=models.PROTECT
    )
    machine_serial = models.CharField(
        max_length=20, verbose_name="Зав. № машины", unique=True
    )
    engine_model_fk = models.ForeignKey(
        EngineModel, verbose_name="Модель двигателя", on_delete=models.PROTECT
    )
    engine_serial = models.CharField(
        max_length=20, verbose_name="Зав. № двигателя", unique=True
    )
    transmission_model_fk = models.ForeignKey(
        TransmissionModel,
        verbose_name="Модель трансмиссии",
        on_delete=models.PROTECT,
    )
    transmission_serial = models.CharField(
        max_length=20, verbose_name="Зав. № трансмиссии", unique=True
    )
    driveline_model_fk = models.ForeignKey(
        DrivelineModel,
        verbose_name="Модель ведущего моста",
        on_delete=models.PROTECT,
    )
    driveline_model_serial = models.CharField(
        max_length=20, verbose_name="Зав. № ведущего моста", unique=True
    )
    steering_axel_model_fk = models.ForeignKey(
        SteeringAxelModel,
        verbose_name="Модель управляемого",
        on_delete=models.PROTECT,
    )
    steering_axel_model_serial = models.CharField(
        max_length=20, verbose_name="Зав. № управляемого моста", unique=True
    )
    supply_contract = models.CharField(
        max_length=20, verbose_name="Договор поставки №, дата", unique=True
    )
    factory_delivery_date = models.DateField(
        verbose_name="Дата отгрузки с завода"
    )
    buyer_client_fk = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Клиент"
    )

    end_user = models.CharField(
        max_length=50,
        verbose_name="Грузополучатель (конечный потребитель)",
        unique=True,
    )
    delivery_address = models.CharField(
        max_length=50, verbose_name="Адрес поставки (эксплуатации)", unique=True
    )
    machine_configuration = models.TextField(
        verbose_name="Комплектация (доп. опции)"
    )
    # buyer_client = models.CharField(
    #     max_length=50, verbose_name="Клиент", unique=True
    # )

    maintenance_organization_fk = models.ForeignKey(
        MaintenanceOrganization,
        verbose_name="Сервисная компания",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        # return str(self.machine_model_fk)
        return f"{self.machine_model_fk} {self.machine_serial}"

    class Meta:
        verbose_name = "Машина"
        verbose_name_plural = "Машины"
        ordering = ["factory_delivery_date"]


class Maintenance(models.Model):
    machine_fk = models.ForeignKey(
        Machine, on_delete=models.CASCADE, verbose_name="Машина"
    )
    maintenance_type_fk = models.ForeignKey(
        MaintenanceType, on_delete=models.PROTECT, verbose_name="Вид ТО"
    )
    maintenance_date = models.DateField(verbose_name="Дата проведения ТО")
    operating_hours = models.IntegerField(verbose_name="Наработка м/час")
    work_order_number = models.CharField(
        max_length=20, unique=True, verbose_name="Номер заказ-наряда"
    )
    work_order_date = models.DateField(verbose_name="Дата заказ-наряда")
    maintenance_organization_fk = models.ForeignKey(
        MaintenanceOrganization,
        on_delete=models.PROTECT,
        verbose_name="Сервисная компания",
    )

    def __str__(self):
        return f"ТО {self.machine_fk}"

    @property
    def machine_name(self):
        return str(self.machine_fk)

    class Meta:
        verbose_name = "Техническое обслуживание"
        verbose_name_plural = "Техническое обслуживание"
        ordering = ["-maintenance_date"]


class Complaint(models.Model):
    machine_fk = models.ForeignKey(
        Machine, on_delete=models.CASCADE, verbose_name="Машина"
    )
    failure_date = models.DateField(verbose_name="Дата отказа")
    operating_hours = models.IntegerField(verbose_name="Наработка м/час")
    failure_component_fk = models.ForeignKey(
        FailureComponent, on_delete=models.PROTECT, verbose_name="Узел отказа"
    )
    failure_description = models.TextField(verbose_name="Описание отказа")
    restoration_method_fk = models.ForeignKey(
        RestorationMethod,
        on_delete=models.PROTECT,
        verbose_name="Способ восстановления",
    )
    used_spare_parts = models.TextField(
        verbose_name="Используемые запасные части", blank=True
    )
    restoration_date = models.DateField(verbose_name="Дата восстановления")
    downtime_duration = models.IntegerField(verbose_name="Время простоя")
    maintenance_organization_fk = models.ForeignKey(
        MaintenanceOrganization,
        on_delete=models.PROTECT,
        verbose_name="Сервисная компания",
    )

    def save(self, *args, **kwargs):
        self.down_time = (self.restoration_date - self.failure_date).days
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Рекламации по {self.machine_fk} модели"

    @property
    def machine_name(self):
        return str(self.machine_fk)

    class Meta:
        verbose_name = "Рекламация"
        verbose_name_plural = "Рекламации"
        ordering = ["-failure_date"]
