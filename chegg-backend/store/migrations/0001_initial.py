# Generated by Django 2.2.3 on 2019-07-04 14:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ISBN', models.CharField(blank=True, max_length=16, null=True)),
                ('score', models.FloatField(default=0)),
                ('publication_date', models.DateField()),
                ('edition', models.IntegerField()),
                ('title', models.CharField(max_length=50)),
                ('author', models.CharField(max_length=50)),
                ('price', models.IntegerField(default=0)),
                ('cover', models.ImageField(blank=True, null=True, upload_to='')),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Chapter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField(default=0)),
                ('chapter_id', models.IntegerField()),
                ('title', models.CharField(max_length=50)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='chapters', to='store.Book')),
            ],
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_id', models.IntegerField()),
                ('body', models.TextField()),
                ('answer', models.ImageField(upload_to='')),
                ('answer_blurred', models.ImageField(upload_to='')),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='problems', to='store.Chapter')),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bought_at', models.DateTimeField(auto_now_add=True)),
                ('chapter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchase_info', to='store.Chapter')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchased_chapters', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('chapter', 'member')},
            },
        ),
    ]
