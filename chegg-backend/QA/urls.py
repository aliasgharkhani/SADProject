from QA.views import QuestionViewSet, TagListAPIView, ReplyCreateAPIView, BestAnswerAPIView, ReplyScoreAPIView
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('questions', QuestionViewSet, base_name='questions')

urlpatterns = [
    path('tags/', TagListAPIView.as_view(), name='tags'),
    path('reply/', ReplyCreateAPIView.as_view(), name='reply'),
    path('reply/best/', BestAnswerAPIView.as_view(), name='best'),
    path('reply/<int:reply_id>/score/', ReplyScoreAPIView.as_view(), name='rate-reply'),
]

urlpatterns += router.urls
