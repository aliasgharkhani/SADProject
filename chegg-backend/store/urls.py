from django.urls import include, path
from rest_framework.routers import DefaultRouter
from store.views import BookViewSet, ChapterViewSet

router = DefaultRouter()
router.register('books', BookViewSet, base_name='books')
router.register('chapters', ChapterViewSet, base_name='chapters')

urlpatterns = router.urls
