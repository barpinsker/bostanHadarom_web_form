# from django.urls import include, re_path
from django.urls import re_path
# from table_of_standards import views
from orders import views
urlpatterns = [
   # קבלת כל המידע עבור הזמנות
   re_path(r'^get_all_order',views.get_all_order),
   re_path(r'^create-order/$',views.create),   # יצירת הזמנה חדשה
   re_path(r'^update_order/$',views.update),   # עדכון הזמנה קיימת
   re_path(r'^get_specific_order/(?P<reference>[0-9]*)',views.get_specific_order),
   re_path(r'^get-wholesaler-to-order/(?P<referenceOrder>[0-9]*)',views.get_wholesaler_to_order),
]