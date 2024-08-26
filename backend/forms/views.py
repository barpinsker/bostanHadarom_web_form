from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser, FileUploadParser, MultiPartParser, FormParser
from forms.models import Form
from forms.serilazers import formSerilazers,formUpdateSerilazers
# Create your views here.






def create_reference(nameModel):
   if nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()==None:
      return 1
   else:   
      return nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()+1




@csrf_exempt
def get_all_forms_conttrol(request):
   try:
      forms=formSerilazers(Form.objects.all(),many=True).data
      if len(forms)!=0:
         return JsonResponse({'forms':forms},status=status.HTTP_202_ACCEPTED)
   except Form.DoesNotExist:
      return HttpResponse(status=status.HTTP_404_NOT_FOUND)

class OfficialEventFrom(APIView):
   def post(self,request,*args,**kwargs):
      try:
         data_client=JSONParser().parse(request)
         data_client=data_client['form_data']
         data_client['reference']=create_reference(Form)
         form_serilazers=formSerilazers(data=data_client)
         if form_serilazers.is_valid():
            form_serilazers.save()
            return HttpResponse(status=status.HTTP_200_OK)
         else:
            print("error",form_serilazers.errors)
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
      except Form.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
   

   def get(self,request,reference,*args,**kwarags):
      try:
         if request.method=='GET':
            data_client=formSerilazers(Form.objects.get(reference=reference)).data
            if data_client != None:
               return JsonResponse({'data_form':data_client},status=status.HTTP_200_OK)
            else:
               return HttpResponse(status=status.HTTP_404_NOT_FOUND)
      except Form.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
      

   def put(self,request,*args,**kwarags):
 
      if request.method=='PUT':
         try:
            new_data=JSONParser().parse(request)['form_data']
            befor_data=Form.objects.get(reference=new_data['reference'])
            form_serialzers=formUpdateSerilazers(befor_data,data=new_data)
            if form_serialzers.is_valid():
               form_serialzers.save()
               return HttpResponse(status=status.HTTP_200_OK)
            else:
               return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
         except Form.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)