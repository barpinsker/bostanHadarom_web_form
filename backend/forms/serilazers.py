
from rest_framework import serializers 
from forms.models import Form



class formSerilazers(serializers.ModelSerializer):
    class Meta:
      model=Form
      fields=(
        'reference',
        'name_form',
        'date_form',
        'is_edit',
        'status_form',
        'json_field'
        )
class formUpdateSerilazers(serializers.ModelSerializer):
    class Meta:
      model=Form
      fields=(
        'name_form',
        'date_form',
        'is_edit',
        'status_form',
        'json_field'
        )



# # reference=models.IntegerField(primary_key=True,blank=False,default=0)
#    name_form=models.CharField(max_length=150,blank=False,default="")
#    date_form=models.CharField(max_length=150,blank=True,default="")
#    is_edit=models.BooleanField(default=False)
#    status_form=models.CharField(max_length=150,blank=False,default="new")
#    json_field=ArrayField(JSONField(null = True,blank = True), blank=True, null = True)