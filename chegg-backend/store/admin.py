from django.contrib import admin
from django.db.models import Sum

from .models import Book, Problem, Chapter, PurchaseHistory, Advertisement

admin.site.register(Book)
admin.site.register(Chapter)
admin.site.register(Problem)


@admin.register(PurchaseHistory)
class PurchaseHistoryAdmin(admin.ModelAdmin):
    change_list_template = "store/purchase_history_admin.html"

    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['total_price'] = PurchaseHistory.objects.aggregate(total_price=Sum('chapter__price'))[
            'total_price']
        extra_context['total_purchases'] = PurchaseHistory.objects.all().count()
        return super(PurchaseHistoryAdmin, self).changelist_view(request, extra_context)


admin.site.register(Advertisement)
