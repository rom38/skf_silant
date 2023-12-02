from django.db import models
from django.contrib.auth.models import User

# Create your models here.


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

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Сервисная компания"
        verbose_name_plural = "Сервисные компании"
        ordering = ["name"]


class Machine(models.Model):
    # 1
    machine_model_fk = models.ForeignKey(MachineModel, on_delete=models.PROTECT)
    # 2
    machine_serial = models.CharField(
        max_length=20, verbose_name="Зав. № машины", unique=True
    )
    # 3
    engine_model_fk = models.ForeignKey(EngineModel, on_delete=models.PROTECT)
    # 4
    engine_serial = models.CharField(
        max_length=20, verbose_name="Зав. № двигателя", unique=True
    )
    # 5
    transmission_model_fk = models.ForeignKey(
        TransmissionModel, on_delete=models.PROTECT
    )
    # 6
    transmission_serial = models.CharField(
        max_length=20, verbose_name="Зав. № трансмиссии", unique=True
    )
    # 7
    driveline_model_fk = models.ForeignKey(DrivelineModel, on_delete=models.PROTECT)
    # 8
    driveline_model_serial = models.CharField(
        max_length=20, verbose_name="Зав. № ведущего моста", unique=True
    )
    # 9
    steering_axel_model_fk = models.ForeignKey(
        SteeringAxelModel, on_delete=models.PROTECT
    )
    # 10
    steering_axel_model_serial = models.CharField(
        max_length=20, verbose_name="Зав. № управляемого моста", unique=True
    )
    # 11
    supply_contract = models.CharField(
        max_length=20, verbose_name="Договор поставки №, дата", unique=True
    )
    # 12
    factory_delivery_date = models.DateField(verbose_name="Дата отгрузки с завода")
    # 13
    end_user = models.CharField(
        max_length=50,
        verbose_name="Грузополучатель (конечный потребитель)",
        unique=True,
    )
    # 14
    delivery_address = models.CharField(
        max_length=50, verbose_name="Адрес поставки (эксплуатации)", unique=True
    )
    # 15
    machine_configuration = models.TextField(verbose_name="Комплектация (доп. опции)")
    # 16
    buyer_client = models.CharField(max_length=50, verbose_name="Клиент", unique=True)
    # 17
    maintenance_organization_fk = models.ForeignKey(
        MaintenanceOrganization, on_delete=models.PROTECT
    )

    def __str__(self):
        return str(self.machine_model_fk)

    class Meta:
        verbose_name = "Машина"
        verbose_name_plural = "Машины"
        ordering = ["factory_delivery_date"]
