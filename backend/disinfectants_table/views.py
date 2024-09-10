from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser
from disinfectants_table.models import Disinfectants
from disinfectants_table.serilazers import disinfectantsSerilazers,disinfectantsUpdateSerilazers
# Create your views here.






@csrf_exempt
def get_new_reference(request):
   if Disinfectants.objects.all().values_list('reference',flat=True).order_by('-reference').first()==None:
      return HttpResponse('1',status=status.HTTP_201_CREATED)
   else:   
      return HttpResponse(Disinfectants.objects.all().values_list('reference',flat=True).order_by('-reference').first()+1,status=status.HTTP_201_CREATED)

@csrf_exempt
def get_all_disinfectants(request):
   try:
      if(request.method=='GET'):
         all_disinfectants=disinfectantsSerilazers(Disinfectants.objects.all().order_by('reference'),many=True).data
         return JsonResponse({'data_row':all_disinfectants},status=status.HTTP_202_ACCEPTED)
      else:
         return HttpResponse(status=status.HTTP_405_METHOD_NOT_ALLOWED)
   
   except Disinfectants.DoesNotExist:
      return HttpResponse(status=status.HTTP_404_NOT_FOUND)
   
class OfficialEventFrom(APIView):
   def post(self,request,*args,**kwargs):
      try:
         data_client=JSONParser().parse(request)
         data_client=data_client['data_row']
         disinfectants_serilazers=disinfectantsSerilazers(data=data_client)
         if disinfectants_serilazers.is_valid():
            disinfectants_serilazers.save()
            return HttpResponse(status=status.HTTP_200_OK)
         else:
            print("error",disinfectants_serilazers.errors)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
      except Disinfectants.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
      
   
   def put(self,request,*args,**kwargs):
      try:
         data_client=request.data['data_row']
         data_befor=Disinfectants.objects.get(reference=data_client['reference'])
         disinfectants_serilazers=disinfectantsSerilazers(data_befor,data=data_client)
         if disinfectants_serilazers.is_valid():
            disinfectants_serilazers.save()
            return HttpResponse(status=status.HTTP_200_OK)
         else:
            print("error",disinfectants_serilazers.errors)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
      except Disinfectants.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)