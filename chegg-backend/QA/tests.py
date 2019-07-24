import json

from QA.models import Question
from authentication.models import Member
from django.test import TestCase
from django.urls import reverse


class QATestCase(TestCase):
    def setUp(self) -> None:
        self.test_member = Member.objects.create(first_name="ali", last_name="salmani",
                                                 username="garamaleki", email="folan@folan.com")
        self.test_member.set_password("123456")
        self.test_member.save()

    def obtain_token(self, username, password):
        response = self.client.post(reverse('authentication:token'), {
            'username': username,
            'password': password
        })
        body = json.loads(response.content)
        return body['token']

    def test_add_question(self):
        token = self.obtain_token('garamaleki', '123456')
        data = {
            'title': 'a question',
            'description': 'I do have a question.'
        }
        response = self.client.post(reverse('qa:questions-list'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 201)
        question = Question.objects.get(title='a question')
        self.assertEqual(question.creator, self.test_member)

    def test_add_question_unauthorized(self):
        data = {
            'title': 'a question',
            'description': 'I do have a question.'
        }
        response = self.client.post(reverse('qa:questions-list'), data=data)
        self.assertEqual(response.status_code, 401)

    def test_question_list(self):
        self.test_add_question()
        response = self.client.get(reverse('qa:questions-list'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        exists = False
        for question in data:
            if question.get('title') == 'a question' and question.get('description') == 'I do have a question.':
                exists = True
        self.assertTrue(exists)
