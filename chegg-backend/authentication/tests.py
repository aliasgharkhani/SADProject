import json

from authentication.models import Member
from django.contrib.auth import authenticate
from django.test import TestCase
from django.urls import reverse


class AuthenticationTestCase(TestCase):
    def setUp(self):
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

    def test_signin(self, username='garamaleki', password='123456'):
        response = self.client.post(reverse('authentication:token'), {
            'username': username,
            'password': password
        })
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'token')

    def test_signup(self):
        data = {
            'username': 'member22',
            'password': '12345678',
            'first_name': 'ali',
            'last_name': 'salmani',
            'email': 'folan2@folan2.com'
        }
        response = self.client.post(reverse('authentication:signup'), data)
        self.assertEqual(response.status_code, 200)
        self.test_signin('member22', '12345678')

    def test_password_edit(self):
        token = self.obtain_token('garamaleki', '123456')
        data = {
            'lastPassword': '123456',
            'password': '12345678'
        }
        response = self.client.post(reverse('authentication:profile-edit'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(authenticate(username='garamaleki', password='12345678'))

    def test_name_edit(self):
        token = self.obtain_token('garamaleki', '123456')
        data = {
            'first_name': 'ab',
            'last_name': 'bas'
        }
        response = self.client.post(reverse('authentication:profile-edit'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.test_member.refresh_from_db()
        self.assertEqual(self.test_member.first_name, 'ab')
        self.assertEqual(self.test_member.last_name, 'bas')

    def test_bio_edit(self):
        token = self.obtain_token('garamaleki', '123456')
        data = {
            'bio': 'I do have biography'
        }
        response = self.client.post(reverse('authentication:profile-edit'), data=data,
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.test_member.refresh_from_db()
        self.assertEqual(self.test_member.bio, 'I do have biography')

    def test_member_info(self):
        token = self.obtain_token('garamaleki', '123456')
        self.test_member.first_name = 'salam'
        self.test_member.save()
        response = self.client.get(reverse('authentication:profile'),
                                   HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.assertEqual('salam', json.loads(response.content)['user_info']['first_name'])

    def test_upgrade(self):
        token = self.obtain_token('garamaleki', '123456')
        response = self.client.post(reverse('authentication:upgrade'),
                                    HTTP_AUTHORIZATION='TOKEN ' + token)
        self.assertEqual(response.status_code, 200)
        self.test_member.refresh_from_db()
        self.assertTrue(self.test_member.premium)

    def test_logout(self):
        token1 = self.obtain_token('garamaleki', '123456')
        response = self.client.get(reverse('authentication:logout'),
                                   HTTP_AUTHORIZATION='TOKEN ' + token1)
        self.assertEqual(response.status_code, 200)
        self.test_member.refresh_from_db()
        token2 = self.obtain_token('garamaleki', '123456')
        self.assertNotEqual(token1, token2)
