# Generated by Django 5.1.1 on 2024-09-07 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_chathistory_id_alter_digitalannouncement_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='utilitybill',
            name='bill_status',
            field=models.CharField(choices=[('pending', 'Pending'), ('paid', 'Paid')], default='pending', max_length=20),
        ),
    ]
