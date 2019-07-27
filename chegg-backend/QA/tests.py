import json

from QA.models import Question, Reply
from authentication.models import Member
from django.test import TestCase
from django.urls import reverse


class QATestCase(TestCase):
    def setUp(self) -> None:
        self.test_member = Member.objects.create(first_name="ali", last_name="salmani",
                                                 username="garamaleki", email="folan@folan.com")
        self.question = Question.objects.create(title='Qtitle', body='Qbody', creator=self.test_member)
        self.reply = Reply.objects.create(body='Rbody', creator=self.test_member, question=self.question)
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
            'body': 'I do have a question.'
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
            if question.get('title') == 'a question' and question.get('body') == 'I do have a question.':
                exists = True
        self.assertTrue(exists)

    def test_reply(self):
        token = self.obtain_token('garamaleki', '123456')
        data = {
            'body': 'This is a reply',
            'question': self.question.pk
        }
        response = self.client.post(reverse('qa:reply'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(
            Reply.objects.filter(body='This is a reply', creator=self.test_member, question=self.question).exists())

    def test_exists_replies(self):
        self.test_reply()
        response = self.client.get(reverse('qa:questions-replies', kwargs={'pk': self.question.pk}))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        true = False
        for reply_response in data:
            if reply_response['question'] == self.question.pk and reply_response[
                'asker'] == self.test_member.username and reply_response['body'] == 'This is a reply':
                true = True
                break
        self.assertTrue(true)

    def test_reply_best(self):
        token = self.obtain_token('garamaleki', '123456')
        self.reply.best = False
        self.reply.save()
        data = {
            'id': self.reply.pk,
            'command': 'mark'
        }
        response = self.client.post(reverse('qa:best'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.reply.refresh_from_db()
        self.assertTrue(self.reply.best)
        data = {
            'id': self.reply.pk,
            'command': 'mark'
        }
        response = self.client.post(reverse('qa:best'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 400)
        data = {
            'id': self.reply.pk,
            'command': 'unmark'
        }
        response = self.client.post(reverse('qa:best'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.reply.refresh_from_db()
        self.assertFalse(self.reply.best)
        data = {
            'id': self.reply.pk,
            'command': 'unmark'
        }
        response = self.client.post(reverse('qa:best'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 400)

    def test_reply_score(self):
        token = self.obtain_token('garamaleki', '123456')
        data = {
            'command': 'up'
        }
        response = self.client.post(reverse('qa:rate-reply', kwargs={'reply_id': self.reply.pk}), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.reply.refresh_from_db()
        self.assertEqual(self.reply.score, 1)
        data = {
            'command': 'up'
        }
        response = self.client.post(reverse('qa:rate-reply', kwargs={'reply_id': self.reply.pk}), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.reply.refresh_from_db()
        self.assertEqual(self.reply.score, 0)
        data = {
            'command': 'up'
        }
        response = self.client.post(reverse('qa:rate-reply', kwargs={'reply_id': self.reply.pk}), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.reply.refresh_from_db()
        self.assertEqual(self.reply.score, 1)
        data = {
            'command': 'down'
        }
        response = self.client.post(reverse('qa:rate-reply', kwargs={'reply_id': self.reply.pk}), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.reply.refresh_from_db()
        self.assertEqual(self.reply.score, -1)
        data = {
            'command': 'down'
        }
        response = self.client.post(reverse('qa:rate-reply', kwargs={'reply_id': self.reply.pk}), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.reply.refresh_from_db()
        self.assertEqual(self.reply.score, 0)
