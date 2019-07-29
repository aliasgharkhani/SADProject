from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from store.views import BookViewSet, ChapterViewSet, ProblemAPIView, AdvertisementAPIView

router = DefaultRouter()
router.register('books', BookViewSet, base_name='books')
router.register('chapters', ChapterViewSet, base_name='chapters')


urlpatterns = [
    path('books/<int:book_id>/chapters/<int:chapter_id>/problems/<problem_id>/', ProblemAPIView.as_view(), name='problem'),
    path('ads/', AdvertisementAPIView.as_view(), name='ads'),
]
urlpatterns += router.urls

