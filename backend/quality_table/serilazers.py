
from rest_framework import serializers 
from quality_table.models import QualityForm

  

class qualityFormSerilazers(serializers.ModelSerializer):
    class Meta:
      model=QualityForm
      fields=(
        'reference_test',
        'date_test',
        'time_test',
        'fruit',
        'dose',
        'strain',
        'json_field',
        'is_edit',
        'is_finish',
        )
      

class qualityFormUpdateSerilazers(serializers.ModelSerializer):
    class Meta:
      model=QualityForm
      fields=(
        'date_test',
        'time_test',
        'fruit',
        'dose',
        'strain',
        'json_field',
        'is_edit',
        'is_finish',
        )
class qualityTableSerilazers(serializers.ModelSerializer):
    class Meta:
      model=QualityForm
      fields=(
        'reference_test',
        'date_test',
        'time_test',
        'fruit',
        'dose',
        'strain',
        'is_edit',
        'is_finish',
      )





# # reference=models.IntegerField(primary_key=True,blank=False,default=0)
#    name_form=models.CharField(max_length=150,blank=False,default="")
#    date_form=models.CharField(max_length=150,blank=True,default="")
#    is_edit=models.BooleanField(default=False)
#    status_form=models.CharField(max_length=150,blank=False,default="new")
#    json_field=ArrayField(JSONField(null = True,blank = True), blank=True, null = True)