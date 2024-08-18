#  reference=models.IntegerField(primary_key=True,blank=False,default=0)
   # code=models.IntegerField(primary_key=False,blank=False,default=0,unique=False)
   # name_wholesaler=models.CharField(max_length=150,blank=True,unique=False,default="")
   # city=models.CharField(max_length=150,blank=True,default="")

from rest_framework import serializers 
from setting_page.models import wholesaler

class wholesalerSerilazers(serializers.ModelSerializer):
    class Meta:
      model=wholesaler
      fields=(
         'reference',
         'code',
         'name',
         'city',
        )
