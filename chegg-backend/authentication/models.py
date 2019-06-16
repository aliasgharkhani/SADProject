from django.contrib.auth.models import AbstractUser


class Member(AbstractUser):

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
