from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser
from quality_table.models import QualityForm
from quality_table.serilazers import qualityFormSerilazers,qualityFormUpdateSerilazers,qualityTableSerilazers




@csrf_exempt
def get_new_reference_test(request):
   if QualityForm.objects.all().values_list('reference_test',flat=True).order_by('-reference_test').first()==None:
      print('ok')
      return HttpResponse('1',status=status.HTTP_201_CREATED)

   else:
      print('ok')   
      return HttpResponse(QualityForm.objects.all().values_list('reference_test',flat=True).order_by('-reference_test').first()+1,status=status.HTTP_201_CREATED)

@csrf_exempt
def get_all_quality_form(request):
   all_rows=qualityTableSerilazers(QualityForm.objects.all(),many=True).data
   return JsonResponse({'all_quality_forms':all_rows},status=status.HTTP_202_ACCEPTED)

class OfficialEventFrom(APIView):
   def post(self,request,*args,**kwargs):
      try:
         data_client=JSONParser().parse(request)
         data_client=data_client['data_row']
         disinfectants_serilazers=qualityFormSerilazers(data=data_client)
         if disinfectants_serilazers.is_valid():
            disinfectants_serilazers.save()
            return HttpResponse(status=status.HTTP_200_OK)
         else:
            print("error",disinfectants_serilazers.errors)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
      except QualityForm.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
      
   def get(self,request,reference_test,*args,**kwargs):
      try:
         qualityForm_Serilazers=qualityFormSerilazers(QualityForm.objects.get(reference_test=reference_test)).data
         return JsonResponse({'data_row':qualityForm_Serilazers},status=status.HTTP_201_CREATED)
      except QualityForm.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
   def put(self,request,*args,**kwargs):
      try:
         data_client=request.data['data_row']
         data_befor=QualityForm.objects.get(reference_test=data_client['reference_test'])
         disinfectants_serilazers=qualityFormUpdateSerilazers(data_befor,data=data_client)
         if disinfectants_serilazers.is_valid():
            disinfectants_serilazers.save()
            return HttpResponse(status=status.HTTP_200_OK)
         else:
            print("error",disinfectants_serilazers.errors)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
      except QualityForm.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)