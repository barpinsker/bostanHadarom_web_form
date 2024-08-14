from django.shortcuts import render
from django.http import HttpResponse,FileResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.parsers import JSONParser
from orders.models import Order,OrderBoxDetails,Surface
from orders.serilazers import orderSerilazers,orderBoxDetailsSerilazers,surfaceSerilazers,surfaceSerilazersUpdate,orderBoxDetailsSerilazersUpdate,orderSerilazersUpdate
# Create your views here.
import datetime
import json

def create_reference(nameModel):
 
   if nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()==None:
      return 1
   else:   
      return nameModel.objects.all().values_list('reference',flat=True).order_by('-reference').first()+1
   
def create_order(data_order):
   order_serilazers=orderSerilazers(data=data_order)
   if(order_serilazers.is_valid()):
      return True,order_serilazers
   else:
      return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

def create_details_order(data_details,reference_order):
   data_details['reference']=create_reference(OrderBoxDetails)
   data_details['reference_order']=reference_order
   details_serilazers=orderBoxDetailsSerilazers(data=data_details)
   if details_serilazers.is_valid():
      return True,details_serilazers,data_details['reference']
   else:
      return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

def create_surface_order(data_surface,reference_details_order):
   for surface in data_surface:
      surface['reference']=create_reference(Surface)
      surface['reference_order_details']=reference_details_order
      surface_serilazers=surfaceSerilazers(data=surface)
      if surface_serilazers.is_valid():
         surface_serilazers.save()
      else:
         return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
   return True

@csrf_exempt
def create(request):
   status_order=[]
   try:
      client_data=JSONParser().parse(request)['data_order']
      if client_data['isNew']==True:
         client_data['reference']=create_reference(Order)
         status_order=create_order(client_data)
      else:
         status_order=order_update(client_data,client_data['total_surface'])
      if status_order[0]==True:
         status_details_order=create_details_order(client_data['array'][0],client_data['reference'])
         if status_details_order[0]==True:
            if create_surface_order(client_data['array'][0]['surfaces'],status_details_order[2])==True:
               status_details_order[1].save()
               status_order[1].save()
               return HttpResponse(status=status.HTTP_201_CREATED)

   except Order.DoesNotExist or OrderBoxDetails.DoesNotExist or Surface.DoesNotExist:
         return HttpResponse(status=status.HTTP_404_NOT_FOUND)
##############################################################################################
# update order
def order_update(data,total_surface):
   befor_data_order=Order.objects.get(reference=data['reference'])
   after_data_order=orderSerilazers(Order.objects.get(reference=data['reference'])).data
   after_data_order['total_surface']=total_surface
   order_serilazers=orderSerilazersUpdate(befor_data_order,data=after_data_order)
   if order_serilazers.is_valid():
      return True,order_serilazers
   else:
      return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

# update details
def order_details_update(data_details):
   order_details_serilazers=orderBoxDetailsSerilazersUpdate(OrderBoxDetails.objects.get(reference=data_details['reference']),data=data_details)
   if order_details_serilazers.is_valid():
      return True,order_details_serilazers
   else:
      return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
   
# update surfaces or create new surface if order is found
def order_surface_update(data):
   for surface in range(len(data['surfaces'])):
      if(data['surfaces'][surface]['ischange']==True):
         if 'reference' not in data['surfaces'][surface]:
            data['surfaces'][surface]['reference']=create_reference(Surface)
            data['surfaces'][surface]['reference_order_details']=data['reference']
            surface_serilazers=surfaceSerilazers(data=data['surfaces'][surface])
            if surface_serilazers.is_valid():
               surface_serilazers.save()
            else:
               return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
         else:
            surface_serilazers=surfaceSerilazersUpdate(Surface.objects.get(reference=data['surfaces'][surface]['reference']),data=data['surfaces'][surface])
            if surface_serilazers.is_valid():
               surface_serilazers.save()
            else:
               return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

# function general update
@csrf_exempt
def update(request):
   data_client=JSONParser().parse(request)
   new_client_data=data_client['data_order']
   order_details_status=order_details_update(new_client_data)
   order_status=order_update(new_client_data,data_client['total_surface'])
   if(order_status[0]==True):
      if order_details_status[0]==True:
         order_surface_update(new_client_data)
         order_details_status[1].save()
      order_status[1].save()
      return HttpResponse(status=status.HTTP_200_OK)
######################################################################################
@csrf_exempt
def get_all_order(request):
   array_return_data=[]
   date_day = datetime.datetime.now()
   date=date_day.strftime('%d')+'-'+date_day.strftime('%m')+'-'+date_day.strftime('%Y')
   try:
      order=orderSerilazers(Order.objects.all(),many=True).data
      for o in order:
         o['array']=orderBoxDetailsSerilazers(OrderBoxDetails.objects.filter(reference_order=o['reference']).order_by('reference').values(),many=True).data
         if date==o['date_order']:
            o['isRowEdit']=True
         else:
            o['isRowEdit']=False
         for det in o['array']:
            array_data_surface=surfaceSerilazers(Surface.objects.filter(reference_order_details=det['reference']),many=True).data
            det['isMarketing']=False;det['isEdit']=False;det['isSave']=True;det['countSurface']=0;det['surfaces']=[];det['status']='old'
            for keys in array_data_surface:
               det['surfaces'].append({'reference':keys['reference'],'size':keys['size'],'type':keys['type'],'count':keys['count'],'arrayNumber':[],'ischange':False})
               det['countSurface']+=keys['count']
            det['indexRow']=keys['reference']-1
         o['isNew']=False
         array_return_data.append(o)
      return JsonResponse({'data':array_return_data},status=status.HTTP_202_ACCEPTED)
   except Order.DoesNotExist:
      return HttpResponse(status.HTTP_404_NOT_FOUND)