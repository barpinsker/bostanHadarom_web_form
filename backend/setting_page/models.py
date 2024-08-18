from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
# Create your models here.
class wholesaler(models.Model):
   reference=models.IntegerField(primary_key=True,blank=False,default=0)
   code=models.IntegerField(primary_key=False,blank=False,default=0,unique=False)
   name=models.CharField(max_length=150,blank=True,unique=False,default="")
   city=models.CharField(max_length=150,blank=True,default="")