from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.db.models import JSONField
from datetime import * 
# Create your models here.
class UploadTo:
  def __init__(self, field):
    self.field = field

  def __call__(self, instance, filename):
    return '{}/{}/{}'.format(instance.reference, self.field, filename)

  def deconstruct(self):
    return ('table_of_standards.models.UploadTo', [self.field], {})

class Standard(models.Model):
   reference=models.IntegerField(primary_key=True,blank=False,default=0)
   name_standard=models.CharField(max_length=150,blank=True,unique=True,default="")
   name_standard_english=models.CharField(max_length=150,blank=True,unique=False,default="")
   standard_code=models.CharField(max_length=150,blank=True,unique=False,default="")
   the_certificate_company=models.CharField(max_length=150,blank=True,default="")
   name_of_the_visitor=models.CharField(max_length=150,blank=True,default="")
   email_of_the_certificate_company=models.CharField(max_length=150,blank=True,default="")
   phone_number_of_the_certificate_company=models.CharField(max_length=150,blank=True,default="")
   responsible_for_the_standard_of_the_place=models.CharField(max_length=150,blank=True,default="")
   standard_responsible_email=models.CharField(max_length=150,blank=True,default="")
   standard_version=models.CharField(max_length=150,blank=True,default="")
   certificate_number=models.CharField(max_length=150,blank=True,default="")
   last_certificate_validity=models.CharField(max_length=150,blank=True,default="")
   last_date_reviewer=models.CharField(max_length=150,blank=True,default="")
   last_reviewer_name=models.CharField(max_length=150,blank=True,default="")
   approved_activities=models.CharField(max_length=150,blank=True,default="")
   test_date=models.CharField(max_length=150,blank=True,default="")
   certificate_validity=models.CharField(max_length=150,blank=True,default="")
   last_type_test=models.CharField(max_length=150,blank=True,default="")
   next_type_test=models.CharField(max_length=150,blank=True,default="")
   notes=models.CharField(max_length=150,blank=True,default="")
   data_update=models.CharField(max_length=150,blank=True,default="")
   file_report=models.FileField(upload_to=UploadTo('file_report'), max_length=100, blank=True,null=True)
   file_deploma=models.FileField(upload_to=UploadTo('file_diploma'), max_length=100, blank=True,null=True)

   
class DocumentsForTheStandard(models.Model):
  reference=models.IntegerField(primary_key=True,blank=False,default=0)
  nameStandard=models.CharField(max_length=150,blank=True,default="")
  nameDocument=models.CharField(max_length=150,blank=True,default="")
  data_update=models.CharField(max_length=150,blank=True,default="")
  file_document=models.FileField(upload_to=UploadTo('file_document'), max_length=100, blank=True,null=True)
  