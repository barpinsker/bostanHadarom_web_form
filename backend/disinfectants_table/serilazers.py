
from rest_framework import serializers 
from disinfectants_table.models import Disinfectants

  

class disinfectantsSerilazers(serializers.ModelSerializer):
    class Meta:
      model=Disinfectants
      fields=(
        "reference",
        "date",
        "product_traceability_details",
        "time",
        "amount_of_material",
        "correctiveName",
        "materialName",
        "a_Batch",
        "Findings",
        "nameAdded",
        )
class disinfectantsUpdateSerilazers(serializers.ModelSerializer):
    class Meta:
      model=Disinfectants
      fields=(
        "date",
        "product_traceability_details",
        "time",
        "amount_of_material",
        "correctiveName",
        "materialName",
        "a_Batch",
        "Findings",
        "nameAdded",
        )



# # reference=models.IntegerField(primary_key=True,blank=False,default=0)
#    name_form=models.CharField(max_length=150,blank=False,default="")
#    date_form=models.CharField(max_length=150,blank=True,default="")
#    is_edit=models.BooleanField(default=False)
#    status_form=models.CharField(max_length=150,blank=False,default="new")
#    json_field=ArrayField(JSONField(null = True,blank = True), blank=True, null = True)