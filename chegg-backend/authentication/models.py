from django.contrib.auth.models import AbstractUser
from django.db import models


class Member(AbstractUser):
    premium = models.BooleanField(default=False)
    bio = models.CharField(max_length=1000, null=True, blank=True)

    def has_purchased_book(self, book):
        for chapter in book.chapters.all():
            if not self.has_purchased_chapter(chapter):
                return False
        if len(book.chapters.all()) == 0:
            return False
        return True

    def has_purchased_chapter(self, chapter):
        from store.models import PurchaseHistory
        return PurchaseHistory.objects.filter(member=self, chapter=chapter).exists()

    def get_bought_books(self):
        from store.models import Book
        books = []
        for book in Book.objects.all():
            if self.has_purchased_book(book):
                books.append(book)
        return books

    def get_bought_chapters(self):
        from store.models import PurchaseHistory, Chapter
        return Chapter.objects.filter(
            id__in=PurchaseHistory.objects.filter(member=self).values('chapter'))

    def is_able_to_ask(self):
        from QA.models import Question
        if self.premium:
            return True
        return Question.objects.filter(creator=self).count() < 3

    def get_asked_questions(self):
        from QA.models import Question
        return Question.objects.filter(creator=self)

