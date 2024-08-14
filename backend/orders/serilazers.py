from django.db.models import fields
from rest_framework import serializers 
from django.contrib.postgres.fields import ArrayField
from orders.models import Order,OrderBoxDetails,Surface



class orderSerilazers(serializers.ModelSerializer):
    class Meta:
      model=Order
      fields=(
        'reference',
        'date_order',
        'total_surface'
        )
class orderBoxDetailsSerilazers(serializers.ModelSerializer):
      class Meta:
        model=OrderBoxDetails
        fields=(
        'reference',
        'reference_order',
        'name_wholesalers',
        'code_wholesalers',
        'isChose',
        )


class surfaceSerilazers(serializers.ModelSerializer):
    class Meta:
      model=Surface
      fields=(
        'reference',
        'reference_order_details',
        'number_surface',
        'size',
        'type',
        'date_create',
        'count'
        )



class orderSerilazersUpdate(serializers.ModelSerializer):
    class Meta:
      model=Order
      fields=(
       
        'date_order',
        'total_surface'
        )

class orderBoxDetailsSerilazersUpdate(serializers.ModelSerializer):
      class Meta:
        model=OrderBoxDetails
        fields=(
       
        'reference_order',
        'name_wholesalers',
        'code_wholesalers',
        'isChose',
        )
class surfaceSerilazersUpdate(serializers.ModelSerializer):
    class Meta:
      model=Surface
      fields=(
        'reference_order_details',
        'number_surface',
        'size',
        'type',
        'date_create',
        'count'
        )





# reference=models.IntegerField(prima
