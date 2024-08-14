from django.shortcuts import render
import pandas as pd
import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from setting_page.serilazers import *
from setting_page.models import *
from rest_framework import status
# Create your views here.

# C:\Users\barpi\Desktop\WebFormBostan\bostanHadarom_web_form\backend\setting_page\wholesalers.csv
def read_file():
   df=pd.read_csv(r'C:\Users\barpi\Desktop\WebFormBostan\bostanHadarom_web_form\backend\setting_page\wholesalers.csv',header=3,usecols=[0,1,2])
   headers=list(df)
   list_wholealers = df.to_dict(orient='records')
   return list_wholealers

def create_reference(nameModel):
 
   if nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()==None:
      return 1
   else:   
      return nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()+1
@csrf_exempt
def insert_wholesaler(request):
   # try:
      return JsonResponse({'data':get_all_wholesaler()},status=status.HTTP_200_OK)
   #    wholesalers_data=read_file()
   #    for wh in wholesalers_data:
   #       wh['reference']=create_reference(wholesaler)
   #       wholesaler_serilazers=wholesalerSerilazers(data=wh)
   #       if(wholesaler_serilazers.is_valid()):
   #          wholesaler_serilazers.save()
   #          print("status=",status.HTTP_201_CREATED)
   #       else:
   #          return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
   #    return JsonResponse({'data':wholesalers_data},status=status.HTTP_201_CREATED)
   # except wholesaler.DoesNotExist:
   #    return HttpResponse(status=status.HTTP_404_NOT_FOUND)
   
   

def get_all_wholesaler():
   return wholesalerSerilazers(wholesaler.objects.all(),many=True).data