from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
# Create your models here.


class Order(models.Model):
   reference=models.IntegerField(primary_key=True,blank=False,default=0)
   date_order=models.CharField(max_length=150,blank=True,default="")
   total_surface=models.CharField(max_length=150,blank=True,default="")

class OrderBoxDetails(models.Model):
   reference=models.IntegerField(primary_key=True,blank=False,default=0)
   reference_order=models.IntegerField(blank=True,default="")
   name=models.CharField(max_length=150,blank=True,default="")
   code=models.CharField(max_length=150,blank=True,default="")
   isChose=models.BooleanField(blank=True,default=False)
   

class Surface(models.Model):
   reference=models.IntegerField(primary_key=True,blank=False,default=0)
   reference_order_details=models.IntegerField(blank=True,default="")
   number_surface=ArrayField(JSONField(null = True,blank = True), blank=True, null = True)
   size=models.CharField(max_length=150,blank=True,default="")
   type=models.CharField(max_length=150,blank=True,default="")
   date_create=models.CharField(max_length=150,blank=True,default='')
   count=models.IntegerField(blank=False,default=0)