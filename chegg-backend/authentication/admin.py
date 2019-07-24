from django.contrib import admin


from .models import Member, Message

admin.site.register(Member)
admin.site.register(Message)

# Register your models here.
