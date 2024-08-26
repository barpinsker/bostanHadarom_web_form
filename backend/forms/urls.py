from django.urls import re_path
from forms import views
urlpatterns = [
    re_path(r'^create-form/$',views.OfficialEventFrom.as_view()),
    re_path(r'^update-form/$',views.OfficialEventFrom.as_view()),
    re_path(r'^get-all-form-control',views.get_all_forms_conttrol),
    re_path(r'^get-specific-form/(?P<reference>[0-9]*)',views.OfficialEventFrom.as_view()),
   # קבלת כל המידע עבור הזמנות
   # re_path(r'^get_all_order',views.get_all_order),
   # re_path(r'^create-order/$',views.create),   # יצירת הזמנה חדשה
   # re_path(r'^update_order/$',views.update),   # עדכון הזמנה קיימת

   # re_path(r'^get-wholesaler-to-order/(?P<referenceOrder>[0-9]*)',views.get_wholesaler_to_order),
]