# Generated by Django 3.2.5 on 2021-07-21 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quickstart', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='state',
            field=models.CharField(blank=True, default='NEW', max_length=16),
        ),
    ]
