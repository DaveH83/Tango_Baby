# Generated by Django 4.2 on 2023-05-03 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0007_rename_title_child_nickname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='name',
            name='child_id',
        ),
        migrations.AlterField(
            model_name='child',
            name='parent_2',
            field=models.EmailField(blank=True, max_length=150, null=True),
        ),
    ]