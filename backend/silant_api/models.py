from django.db import models

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
    machine_model_id = models.ForeignKey(MachineModel, on_delete=models.PROTECT)
    machine_serial = models.CharField(
        max_length=20, verbose_name="Зав. № машины", unique=True
    )
    engine_model_id = models.ForeignKey(EngineModel, on_delete=models.PROTECT)
    engine_serial = models.CharField(
        max_length=20, verbose_name="Зав. № двигателя", unique=True
    )
    transmission_model_id = models.ForeignKey(
        TransmissionModel, on_delete=models.PROTECT
    )
    transmission_serial = models.CharField(
        max_length=20, verbose_name="Зав. № трансмиссии", unique=True
    )

    def __str__(self):
        return str(self.machine_model_id)

    class Meta:
        verbose_name = "Машина"
        verbose_name_plural = "Машины"
        ordering = ["engine_serial"]
