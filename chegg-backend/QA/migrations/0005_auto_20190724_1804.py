# Generated by Django 2.2.3 on 2019-07-24 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('QA', '0004_replyscore'),
    ]

    operations = [
        migrations.AlterField(
            model_name='replyscore',
            name='type',
            field=models.CharField(choices=[('up', 'up'), ('down', 'down')], max_length=20),
        ),
    ]