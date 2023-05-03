# Generated by Django 4.2 on 2023-05-03 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0004_alter_name_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='child',
            name='guest_url',
            field=models.UUIDField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='child',
            name='parent_url',
            field=models.UUIDField(blank=True, null=True, unique=True),
        ),
    ]
