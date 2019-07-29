from django.contrib import admin
from .models import Book, Problem, Chapter, PurchaseHistory, Advertisement

admin.site.register(Book)
admin.site.register(Chapter)
admin.site.register(Problem)
admin.site.register(PurchaseHistory)
admin.site.register(Advertisement)
