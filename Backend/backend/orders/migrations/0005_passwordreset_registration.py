# Generated by Django 5.0.6 on 2024-06-27 11:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_userprofile'),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordReset',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reset_token', models.CharField(max_length=100)),
                ('user_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='orders.userprofile')),
            ],
        ),
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registration_token', models.CharField(max_length=100)),
                ('user_profile', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='orders.userprofile')),
            ],
        ),
    ]
