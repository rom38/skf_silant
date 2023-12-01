from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class MachineModel(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название', unique=True)
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Модель погрузчика'
        verbose_name_plural = 'Модели погрузчика'
        ordering = ['name']


class EngineModel(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название', unique=True)
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателя'
        ordering = ['name']


class TransmissionModel(models.Model):
    name = models.CharField(max_length=50, verbose_name='Название', unique=True)
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссии'
        ordering = ['name']