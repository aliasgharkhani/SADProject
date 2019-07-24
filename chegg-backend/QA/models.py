from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Question(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(default=0)
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=1000)
    creator = models.ForeignKey('authentication.Member', on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True, null=True)


class Reply(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE, related_name='replies')
    creator = models.ForeignKey('authentication.Member', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    score = models.IntegerField(default=0)
    # score_members = models.ManyToManyField('auth.Member')
    body = models.CharField(max_length=1000)
    best = models.BooleanField(default=False)

