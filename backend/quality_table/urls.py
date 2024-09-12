from django.urls import re_path
# from table_of_standards import views
from quality_table import views
urlpatterns = [
   # קבלת כל המידע עבור הזמנות
   re_path(r'^create-quality-form/$',views.OfficialEventFrom.as_view()),   # יצירת הזמנה חדשה
   re_path(r'^update-quality-form/$',views.OfficialEventFrom.as_view()),   # עדכון הזמנה קיימת
   re_path(r'^get-all-quality-form',views.get_all_quality_form),
   re_path(r'^get-new',views.get_new_reference_test),
   re_path(r'^get-specific-quality-form/(?P<reference_test>[0-9]*)',views.OfficialEventFrom.as_view()),
]
# create-quality-form
# update-quality-form 
# get-specific-quality-form 
# get-all-quality-form