from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=30)


class Question(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(default=0)
    title = models.CharField(max_length=60)
    body = models.CharField(max_length=1000)
    creator = models.ForeignKey('authentication.Member', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True, null=True)
