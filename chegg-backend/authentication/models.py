from django.contrib.auth.models import AbstractUser


class Member(AbstractUser):

    def has_purchased_book(self, book):
        for chapter in book.chapters.all():
            if not self.has_purchased_chapter(chapter):
                return False
        return True

    def has_purchased_chapter(self, chapter):
        from store.models import PurchaseHistory
        return PurchaseHistory.objects.filter(member=self, chapter=chapter).exists()
