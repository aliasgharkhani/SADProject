from django.conf.urls import url
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from authentication.views import HelloView, MemberSignupAPIView

urlpatterns = [
    url(r'', include('rest_framework.urls')),
    path('', HelloView.as_view(), name='hello'),
    path('token/', obtain_auth_token, name='token'),
    path('signup/', MemberSignupAPIView.as_view(), name='signup')
]
