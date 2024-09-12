from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
# Create your models here.
class QualityForm(models.Model):
   reference_test=models.IntegerField(primary_key=True,blank=False,default=0)
   date_test=models.CharField(max_length=150,blank=False,default="")
   status_test=models.CharField(max_length=150,blank=True,default="")
   time_test=models.CharField(max_length=150,blank=True,default="")
   dose=models.CharField(max_length=150,blank=True,default="")
   is_edit=models.BooleanField(default=False)
   is_finish=models.BooleanField(default=False)
   json_field=ArrayField(JSONField(null = True,blank = True), blank=True, null = True)
   strain=models.CharField(max_length=150,blank=False,default="")
   fruit=models.CharField(max_length=150,blank=True,default="")
   # reference_test,date_test,status_test,time_test,dose,strain,fruit