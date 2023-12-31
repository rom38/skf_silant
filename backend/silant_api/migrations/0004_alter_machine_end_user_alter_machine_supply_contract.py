# Generated by Django 4.2.7 on 2023-12-28 06:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('silant_api', '0003_alter_machine_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='machine',
            name='end_user',
            field=models.CharField(max_length=50, verbose_name='Грузополучатель (конечный потребитель)'),
        ),
        migrations.AlterField(
            model_name='machine',
            name='supply_contract',
            field=models.CharField(max_length=20, verbose_name='Договор поставки №, дата'),
        ),
    ]
