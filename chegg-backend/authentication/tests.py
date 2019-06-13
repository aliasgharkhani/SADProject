from authentication.models import Member
from django.test import TestCase
from django.urls import reverse


class AuthenticationTestCase(TestCase):
    def setUp(self):
        self.test_member = Member.objects.create(first_name="ali", last_name="salmani",
                                                 username="garamaleki", email="folan@folan.com")
        self.test_member.set_password("123456")
        self.test_member.save()

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
