from authentication.views import MemberSignupAPIView, MemberProfileAPIView, Logout, MemberProfileEditAPIView, \
    MemberPageAPIView, MemberUpgradeAPIView, ReadMessageAPIView
from django.conf.urls import url
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('logout/', Logout.as_view(), name='logout'),
    url(r'', include('rest_framework.urls')),
    path('token/', obtain_auth_token, name='token'),
    path('signup/', MemberSignupAPIView.as_view(), name='signup'),
    path('self/', MemberProfileAPIView.as_view(), name='profile'),
    path('self/upgrade/', MemberUpgradeAPIView.as_view(), name='upgrade'),
    path('profile/<str:username>/', MemberPageAPIView.as_view(), name='member-page'),
    path('self/edit/', MemberProfileEditAPIView.as_view(), name='profile-edit'),
    path('self/read/', ReadMessageAPIView.as_view(), name='message-read'),
]
