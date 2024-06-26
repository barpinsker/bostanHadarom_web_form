from django.db.models import fields
from rest_framework import serializers 
from django.contrib.postgres.fields import ArrayField
from table_of_standards.models import Standard,DocumentsForTheStandard



class StandardsSerilazers(serializers.ModelSerializer):
    class Meta:
      model=Standard
      fields=(
         'reference',
         'name_standard',
         'name_standard_english',
         'standard_code',
         'the_certificate_company',
         'name_of_the_visitor',
         'email_of_the_certificate_company',
         'phone_number_of_the_certificate_company',
         'responsible_for_the_standard_of_the_place',
         'standard_responsible_email',
         'standard_version',
         'certificate_number',
         'approved_activities',
         'test_date',
         'last_certificate_validity',
         'last_date_reviewer',
         'last_reviewer_name',
         'certificate_validity',
         'last_type_test',
         'next_type_test',
         'notes',
         'file_report',
         'file_deploma',
         )


class StandardsSerilazersTable(serializers.ModelSerializer):
    class Meta:
      model=Standard
      fields=(
         'reference',
         'name_standard',
         'data_update',
        )



class Documents_for_the_standard_Serilazers(serializers.ModelSerializer):
    class Meta:
      model=DocumentsForTheStandard
      fields=('reference','nameStandard','nameDocument','data_update','file_document')









# reference=models.IntegerField(prima
