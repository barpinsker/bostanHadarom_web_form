from django.urls import re_path
from setting_page import views
urlpatterns = [
   re_path("insert-wholesaler",views.insert_wholesaler)
]