from django.urls import re_path
from disinfectants_table import views
urlpatterns = [
   re_path(r"^get-new-reference",views.get_new_reference),
   re_path(r"^get-all-disinfectants",views.get_all_disinfectants),
   re_path(r'^create-new-row/$',views.OfficialEventFrom.as_view()),
   re_path(r'^update-row/$',views.OfficialEventFrom.as_view())
]