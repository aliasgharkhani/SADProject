from django.db import models


class Book(models.Model):
    ISBN = models.CharField(max_length=16, null=True, blank=True)
    score = models.FloatField(default=0)
    publication_date = models.DateField()
    edition = models.IntegerField()
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    price = models.IntegerField(default=0)
    cover = models.ImageField()
    description = models.TextField()

    def __str__(self):
        return self.title


class Chapter(models.Model):
    price = models.IntegerField(default=0)
    chapter_id = models.IntegerField()
    title = models.CharField(max_length=50)
    book = models.ForeignKey('store.Book', related_name='chapters', on_delete=models.CASCADE)

    def __str__(self):
        return "{}/{}: {}".format(self.title, self.chapter_id, str(self.book))


class Problem(models.Model):
    problem_id = models.IntegerField()
    body = models.TextField()
    answer = models.ImageField()
    answer_blurred = models.ImageField()
    chapter = models.ForeignKey('store.Chapter', related_name='problems', on_delete=models.CASCADE)


class PurchaseHistory(models.Model):
    member = models.ForeignKey('authentication.Member', related_name='purchased_chapters',
                               on_delete=models.CASCADE)
    chapter = models.ForeignKey('store.Chapter', related_name='purchase_info',
                                on_delete=models.CASCADE)
    bought_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('chapter', 'member',)

    def __str__(self):
        return "{}-> {}".format(str(self.member), str(self.chapter))
