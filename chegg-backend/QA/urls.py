from QA.views import QuestionViewSet, TagListAPIView, ReplyCreateAPIView
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('questions', QuestionViewSet, base_name='questions')

urlpatterns = [
    path('tags/', TagListAPIView.as_view(), name='tags'),
    path('reply/', ReplyCreateAPIView.as_view(), name='reply'),
]

urlpatterns += router.urls
