# Generated by Django 5.0.6 on 2024-07-01 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0015_sliderimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='aboutus',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='about_us/'),
        ),
    ]
