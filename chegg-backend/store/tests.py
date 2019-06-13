import json
from datetime import datetime

from authentication.models import Member
from django.test import TestCase
from django.urls import reverse
from store.models import Book, Chapter


class StoreTestCase(TestCase):
    def setUp(self) -> None:
        self.test_member = Member.objects.create(first_name="ali", last_name="salmani",
                                                 username="garamaleki", email="folan@folan.com")
        self.test_member.set_password("123456")
        self.test_member.save()

        self.book = Book.objects.create(publication_date=datetime.now(), edition=1, title='1',
                                        author='2', description='sdf')
        self.chapter = Chapter.objects.create(chapter_id=1, book=self.book, title="sdfs")

    def obtain_token(self, username, password):
        response = self.client.post(reverse('authentication:token'), {
            'username': username,
            'password': password
        })
        body = json.loads(response.content)
        return body['token']

    def test_buy_book(self):
        token = self.obtain_token('garamaleki', '123456')
        response = self.client.post(reverse('store:books-buy', kwargs={'pk': self.book.pk}),
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.test_member.has_purchased_book(self.book), True)
