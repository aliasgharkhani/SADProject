from django.contrib import admin
from .models import Book, Problem, Chapter

admin.site.register(Book)
admin.site.register(Chapter)
admin.site.register(Problem)
