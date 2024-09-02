from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
# Create your models here.


class Form(models.Model):
   reference=models.IntegerField(primary_key=True,blank=False,default=0)
   name_form=models.CharField(max_length=150,blank=False,default="")
   date_form=models.CharField(max_length=150,blank=True,default="")
   is_edit=models.BooleanField(default=False)
   is_finish=models.BooleanField(default=False)
   status_form=models.CharField(max_length=150,blank=False,default="new")
   json_field=ArrayField(JSONField(null = True,blank = True), blank=True, null = True)
   router=models.CharField(max_length=150,blank=True,default="")
   
