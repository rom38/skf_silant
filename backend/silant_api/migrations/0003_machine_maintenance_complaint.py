# Generated by Django 4.2.7 on 2023-12-03 12:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('silant_api', '0002_remove_machine_driveline_model_fk_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('machine_serial', models.CharField(max_length=20, unique=True, verbose_name='Зав. № машины')),
                ('engine_serial', models.CharField(max_length=20, unique=True, verbose_name='Зав. № двигателя')),
                ('transmission_serial', models.CharField(max_length=20, unique=True, verbose_name='Зав. № трансмиссии')),
                ('driveline_model_serial', models.CharField(max_length=20, unique=True, verbose_name='Зав. № ведущего моста')),
                ('steering_axel_model_serial', models.CharField(max_length=20, unique=True, verbose_name='Зав. № управляемого моста')),
                ('supply_contract', models.CharField(max_length=20, unique=True, verbose_name='Договор поставки №, дата')),
                ('factory_delivery_date', models.DateField(verbose_name='Дата отгрузки с завода')),
                ('end_user', models.CharField(max_length=50, unique=True, verbose_name='Грузополучатель (конечный потребитель)')),
                ('delivery_address', models.CharField(max_length=50, unique=True, verbose_name='Адрес поставки (эксплуатации)')),
                ('machine_configuration', models.TextField(verbose_name='Комплектация (доп. опции)')),
                ('buyer_client_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Клиент')),
                ('driveline_model_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.drivelinemodel')),
                ('engine_model_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.enginemodel')),
                ('machine_model_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.machinemodel')),
                ('maintenance_organization_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.maintenanceorganization')),
                ('steering_axel_model_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.steeringaxelmodel')),
                ('transmission_model_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.transmissionmodel')),
            ],
            options={
                'verbose_name': 'Машина',
                'verbose_name_plural': 'Машины',
                'ordering': ['factory_delivery_date'],
            },
        ),
        migrations.CreateModel(
            name='Maintenance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('maintenance_date', models.DateField(verbose_name='Дата проведения ТО')),
                ('operating_hours', models.IntegerField(verbose_name='Наработка м/час')),
                ('work_order_number', models.CharField(max_length=20, unique=True, verbose_name='Номер заказ-наряда')),
                ('work_order_date', models.DateField(verbose_name='Дата заказ-наряда')),
                ('machine_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='silant_api.machine', verbose_name='Машина')),
                ('maintenance_organization_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.maintenanceorganization', verbose_name='Сервисная компания')),
                ('maintenance_type_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.maintenancetype', verbose_name='Вид ТО')),
            ],
            options={
                'verbose_name': 'Техническое обслуживание',
                'verbose_name_plural': 'Техническое обслуживание',
                'ordering': ['-maintenance_date'],
            },
        ),
        migrations.CreateModel(
            name='Complaint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('failure_date', models.DateField(verbose_name='Дата отказа')),
                ('operating_hours', models.IntegerField(verbose_name='Наработка м/час')),
                ('failure_description', models.TextField(verbose_name='Описание отказа')),
                ('used_spare_parts', models.TextField(blank=True, verbose_name='Используемые запасные части')),
                ('restoration_date', models.DateField(verbose_name='Дата восстановления')),
                ('downtime_duration', models.IntegerField(verbose_name='Время простоя')),
                ('failure_component_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.failurecomponent', verbose_name='Узел отказа')),
                ('machine_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='silant_api.machine', verbose_name='Машина')),
                ('maintenance_organization_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.maintenanceorganization', verbose_name='Сервисная компания')),
                ('restoration_method_fk', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='silant_api.restorationmethod', verbose_name='Способ восстановления')),
            ],
            options={
                'verbose_name': 'Рекламация',
                'verbose_name_plural': 'Рекламации',
                'ordering': ['-failure_date'],
            },
        ),
    ]
