from django.db import models

# Create your models here.
class Disinfectants(models.Model):
   reference=models.IntegerField(primary_key=True,blank=False,default=0)
   date=models.CharField(max_length=150,blank=False,default="")
   product_traceability_details=models.CharField(max_length=150,blank=True,default="")
   time=models.CharField(max_length=150,blank=True,default="")
   amount_of_material=models.CharField(max_length=150,blank=True,default="")
   correctiveName=models.CharField(max_length=150,blank=False,default="new")
   materialName=models.CharField(max_length=150,blank=True,default="")
   a_Batch=models.CharField(max_length=150,blank=True,default="")
   Findings=models.CharField(max_length=150,blank=True,default="")
   nameAdded=models.CharField(max_length=150,blank=True,default="")