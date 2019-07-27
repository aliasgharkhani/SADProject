import json
from datetime import datetime

from authentication.models import Member
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from store.models import Book, Chapter, Problem


class StoreTestCase(TestCase):
    def setUp(self) -> None:
        self.test_member = Member.objects.create(first_name="ali", last_name="salmani",
                                                 username="garamaleki", email="folan@folan.com")
        self.test_member.set_password("123456")
        self.test_member.save()

        self.book = Book.objects.create(publication_date=datetime.now(), edition=1, title='1',
                                        author='2', description='sdf')
        self.chapter = Chapter.objects.create(chapter_id=1, book=self.book, title="sdfs")
        self.problem = Problem.objects.create(problem_id=1, body="problem", chapter=self.chapter,
                                              answer=SimpleUploadedFile(name='test_image.jpg', content='',
                                                                        content_type='image/jpeg'),
                                              answer_blurred=SimpleUploadedFile(name='test_image_2.jpg', content='',
                                                                                content_type='image/jpeg'))

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

    def test_buy_chapter(self):
        token = self.obtain_token('garamaleki', '123456')
        response = self.client.post(reverse('store:chapters-buy', kwargs={'pk': self.chapter.pk}),
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.test_member.has_purchased_chapter(self.chapter))
        new_chapter = Chapter.objects.create(chapter_id=2, book=self.book, title="sdfs2")
        self.assertFalse(self.test_member.has_purchased_chapter(new_chapter))
        self.assertFalse(self.test_member.has_purchased_book(self.book))
        response = self.client.post(reverse('store:chapters-buy', kwargs={'pk': new_chapter.pk}),
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.test_member.has_purchased_chapter(new_chapter))
        self.assertTrue(self.test_member.has_purchased_book(self.book))

    def test_problem(self):
        response = self.client.get(reverse('store:problem', kwargs={
            'book_id': self.book.pk,
            'chapter_id': self.chapter.chapter_id,
            'problem_id': self.problem.problem_id
        }))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['body'], 'problem')
