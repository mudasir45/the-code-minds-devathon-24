# Generated by Django 5.1.1 on 2024-09-07 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('support_team', 'support_team'), ('resident', 'resident'), ('admin', 'admin')], default='resident', max_length=20),
        ),
    ]
