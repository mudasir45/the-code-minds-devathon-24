# Generated by Django 5.1.1 on 2024-09-07 06:31

import main.utility
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chathistory',
            name='id',
            field=models.CharField(default=main.utility.generate_random_id, max_length=8, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='digitalannouncement',
            name='id',
            field=models.CharField(default=main.utility.generate_random_id, max_length=8, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='event',
            name='id',
            field=models.CharField(default=main.utility.generate_random_id, max_length=8, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='notification',
            name='id',
            field=models.CharField(default=main.utility.generate_random_id, max_length=8, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='paymentrecord',
            name='id',
            field=models.CharField(default=main.utility.generate_random_id, max_length=8, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='utilitybill',
            name='id',
            field=models.CharField(default=main.utility.generate_random_id, max_length=8, primary_key=True, serialize=False),
        ),
    ]
