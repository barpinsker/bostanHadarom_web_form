from django.shortcuts import render
from django.http import HttpResponse,FileResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.views import APIView
from table_of_standards.models import DocumentsForTheStandard,Standard
from table_of_standards.serilazers import StandardsSerilazers,Documents_for_the_standard_Serilazers,StandardsSerilazersTable
import os,stat
import json
import urllib
import datetime

import shutil
import io 
import zipfile
from django.conf import settings
# Create your views here.


MODELS_LIST=[Standard,DocumentsForTheStandard]
SERILAZERS_LIST=[StandardsSerilazers,Documents_for_the_standard_Serilazers]
All_SERILAZERS_LIST=[StandardsSerilazersTable,Documents_for_the_standard_Serilazers]
# SERILAZERS_LIST=[]
#create standrat to table
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def create_reference(nameModel):
 
   if nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()==None:
      return 1
   else:   
      return nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()+1

@csrf_exempt
def download_file(request, path):
    '''
        Download file from given path in the request url.
    '''
    print(path)
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    print(file_path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/pdf")
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response

csrf_exempt
def download_all_file_documents(request,date):
   '''
      Download all file.
   '''
   folder_to_zip=settings.MEDIA_ROOT
   serilazers_files=Documents_for_the_standard_Serilazers(DocumentsForTheStandard.objects.all(),many=True).data
   zip_buffer=io.BytesIO()
   os.makedirs
   with zipfile.ZipFile(zip_buffer,'w',zipfile.ZIP_DEFLATED)as zipf:
      for file in serilazers_files:
         os.makedirs(file['nameStandard'],exist_ok=True)
         file_path=settings.MEDIA_ROOT+file['file_document'][6:].replace('/','\\')
        
         file_path=os.path.join(settings.MEDIA_ROOT,urllib.parse.unquote(file_path))
        
       
         arcname=os.path.basename(file_path)
         folder_path=file_path[0:60]+'backend'+'\\'+file['nameStandard']+'\\'
         shutil.copy2(file_path,file['nameStandard'])
         print(folder_path)
         folder_path=os.path.join(settings.MEDIA_ROOT,folder_path)
        
         if(os.path.exists(folder_path)):
            
            zipf.write(file_path,arcname=os.path.relpath(os.path.join(folder_path, arcname)))
         shutil.rmtree(folder_path)
   zip_buffer.seek(0)
   response=HttpResponse(zip_buffer,content_type='application/zip')
   response['Content-Disposition']='attachment; filename=my_archive.zip'
  
   return response

@csrf_exempt
def get_specific_row(request,data):
   data_client=json.loads(data)
   name_file_report=''
   name_file_deploma=''
   name_file_document=''
   try:
      data_row=SERILAZERS_LIST[int(data_client['indexModel'])](MODELS_LIST[int(data_client['indexModel'])].objects.get(reference=data_client['reference'])).data
      if 'file_report' in data_row.keys():
         name_file_report=urllib.parse.unquote(data_row['file_report'].split("/")[4])
      if('file_deploma' in data_row.keys()):
         name_file_deploma=urllib.parse.unquote(data_row['file_deploma'].split("/")[4])
      else:
         name_file_document=urllib.parse.unquote(data_row['file_document'].split("/")[4])
      return JsonResponse({'row':data_row,'name_file':[name_file_report,name_file_deploma,name_file_document]})
   except MODELS_LIST[int(data_client['indexModel'])].DoesNotExist:
      return HttpResponse(status=status.HTTP_404_NOT_FOUND) 

@csrf_exempt
def get_specific_standrarts_data(request,data):
   data_client=json.loads(data)
   print(data_client)
   try:
      data_table=SERILAZERS_LIST[int(data_client['indexModel'])](MODELS_LIST[int(data_client['indexModel'])].objects.filter(nameStandard=data_client['nameStandard']),many=True).data
      return JsonResponse({'dataTable':data_table})
   except MODELS_LIST[int(data_client['indexModel'])].DoesNotExist:
      return HttpResponse(status=status.HTTP_404_NOT_FOUND) 

@csrf_exempt
def get_all_name_files_documents(request):
   all_names=[]
   try:
      print(Documents_for_the_standard_Serilazers(DocumentsForTheStandard.objects.all(),many=True).data)
      for name in Documents_for_the_standard_Serilazers(DocumentsForTheStandard.objects.all(),many=True).data:
         all_names.append({"nameFile":name['nameDocument']})
      return JsonResponse({"allNames":all_names},status=status.HTTP_202_ACCEPTED)
   except DocumentsForTheStandard.DoesNotExist:
      return HttpResponse(status=status.HTTP_404_NOT_FOUND)
   




class OfficialEventFrom(APIView):
   def post(self ,request):
      indexs=request.data['indexs']
      indexs=json.loads(json.dumps(indexs))
      indexs=json.loads(indexs)
      data_client={}
      print(request.data)

      try:
         data_client=json.loads(request.data['data'])
         print(type(indexs['index_model']))
         if(str(indexs['index_model'])=='0'):
            data_client['file_report']=request.data['file_report']
            data_client['file_deploma']=request.data['file_deploma']
         else:
           
            data_client['file_document']=request.data['file_document']
         data_client['reference']=create_reference(MODELS_LIST[indexs['index_model']])
         data_serilazers=SERILAZERS_LIST[indexs['index_serilazers']](data=data_client)
         if(data_serilazers.is_valid()):
            data_serilazers.save()
            return HttpResponse(status=status.HTTP_201_CREATED)
         else:
            print(data_serilazers.errors)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
      except MODELS_LIST[indexs['index_model']].DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
      
   def get(self,request,indexs):
      try:
         data_table=All_SERILAZERS_LIST[int(indexs)](MODELS_LIST[int(indexs)].objects.all(),many=True).data
         return JsonResponse({'data_table':data_table},status=status.HTTP_202_ACCEPTED)
      except MODELS_LIST[int(indexs)].DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
      
   
   def put(self, request,data,*args, **kwargs):
      data_client=json.loads(data)
     
      try:
         new_data=json.loads(request.data['data'])
        
         if(data_client['indexModel']=='0'):
            print('file_report' in request.data.keys())
            if 'file_report' in request.data.keys():
               new_data['file_report']=request.data['file_report']
            else:
               new_data.pop("file_report")
            if 'file_deploma' in request.data.keys():
               new_data['file_deploma']=request.data['file_deploma']
            else:
               new_data.pop("file_deploma")
         else:
            if 'file_document' in request.data.keys():
               new_data['file_document']=request.data['file_document']
            else:
               new_data.pop("file_document")
         data_client=SERILAZERS_LIST[int(data_client['indexModel'])](MODELS_LIST[int(data_client['indexModel'])].objects.get(reference=data_client['reference']),data=new_data)
         if data_client.is_valid():
            data_client.save()
            return HttpResponse(status=status.HTTP_200_OK)
         else:
            
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
      except MODELS_LIST[int(data_client['indexModel'])].DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)