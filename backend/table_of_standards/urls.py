# from django.urls import include, re_path
from django.urls import re_path
from table_of_standards import views
urlpatterns = [
   # קבלת כל המידע עבור התקנים
   # path(r"^get-all-data-table")
   re_path(r'^create-standards/$',views.OfficialEventFrom.as_view()),
   re_path(r'^event_standards/(?P<indexs>[0-9]*)$',views.OfficialEventFrom.as_view()),
   re_path(r'^update-row-genery/(?P<data>.*)$',views.OfficialEventFrom.as_view()),
   re_path(r'^get-specific-row/(?P<data>.*)$',views.get_specific_row),
   re_path(r'^get-specific-standrarts-data/(?P<data>.*)$',views.get_specific_standrarts_data),
   re_path(r'^get-all-names-documents/',views.get_all_name_files_documents),
   re_path(r'^files/(?P<path>.+)$', views.download_file),
   re_path(r'^download-all-file-documents/(?P<date>.*)$',views.download_all_file_documents),
]