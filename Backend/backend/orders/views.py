from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import secrets
from .models import Contact, Order,Feedback,VehicleType, SliderImage,Description, Service,AboutUs,ContactUsPage, FeedbackImage,ServicePage,ContactInfo,CompanyInfo
from .serializers import DescriptionSerializer,SliderImageSerializer,AboutUsSerializer,ContactUsPageSerializer,ServicePageSerializer,ContactInfoSerializer,CompanyInfoSerializer
from .serializers import ServiceSerializer
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.http import require_http_methods
from rest_framework.parsers import JSONParser
from .serializers import VehicleTypeSerializer

@csrf_exempt
def create_order(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        order = Order.objects.create(
            pickup=data['pickup'],
            drop=data['drop'],
            vehicle_type=data['vehicleType'],
            pickup_date=data['pickupDate'],
            phone=data['phone'],
            address=data['address']
        )
        return JsonResponse({'message': 'Order created successfully', 'order_id': order.id}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def contact_us(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        contact = Contact.objects.create(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                service=data['service'],
                message=data['message']
        )
        contact.save()
        return JsonResponse({'message': 'Contact created successfully'})
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def submit_feedback(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            feedback = Feedback.objects.create(
                rating=data['rating'],
                experience=data['experience'],
                reference_number=data['referenceNumber'],
                full_name=data['fullName']
            )
            feedback.save()
            return JsonResponse({'message': 'Feedback submitted successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
    return JsonResponse({'error': 'Invalid method'}, status=405)



@csrf_exempt
@api_view(['GET', 'POST'])
def vehicle_type_list_create(request):
    if request.method == 'GET':
        vehicle_types = VehicleType.objects.all()
        serializer = VehicleTypeSerializer(vehicle_types, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = VehicleTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
def description_view(request):
    if request.method == 'GET':
        description = Description.objects.first()
        serializer = DescriptionSerializer(description)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(['GET', 'POST'])
def service_list(request):
    if request.method == 'GET':
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
def get_contact_us_page(request):
    contact_us_page = ContactUsPage.objects.first()
    serializer = ContactUsPageSerializer(contact_us_page)
    return Response(serializer.data)

# @csrf_exempt
# @api_view(['GET'])
# def get_description(request):
#     if request.method == 'GET':
#         description = DescriptionC.objects.first()
#         serializer = DescriptionCSerializer(description)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     else:
#         return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(['GET'])
def about_us_detail(request):
    try:
        about_us_instance = AboutUs.objects.first()
    except AboutUs.DoesNotExist:
        return JsonResponse({'error': 'AboutUs object does not exist'}, status=404)

    serializer = AboutUsSerializer(about_us_instance)
    return JsonResponse(serializer.data, safe=False)

# @csrf_exempt
# class SliderImageViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = SliderImage.objects.all().order_by('order')
#     serializer_class = SliderImageSerializer
@csrf_exempt
@api_view(['GET'])
def get_slider_images(request):
    queryset = SliderImage.objects.all().order_by('order')
    serializer = SliderImageSerializer(queryset, many=True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
def get_feedback_image(request):
    feedback_image = FeedbackImage.objects.first()  # Adjust query as per your model logic
    if feedback_image:
        image_url = request.build_absolute_uri(feedback_image.image.url)
        return JsonResponse({'image_url': image_url})
    else:
        return JsonResponse({'image_url': ''})

@csrf_exempt
@api_view(['GET'])
def service_list_view(request):
    services = ServicePage.objects.all()
    serializer = ServicePageSerializer(services, many=True)
    return Response(serializer.data)

@csrf_exempt
@api_view(['GET'])
def contact_info_view(request):
    contact_info = ContactInfo.objects.first()
    if contact_info:
        serializer = ContactInfoSerializer(contact_info)
        return Response(serializer.data)
    return Response({'detail': 'Contact info not found'}, status=404)

@csrf_exempt
@api_view(['GET'])
def company_info_view(request):
    company_info = CompanyInfo.objects.first()
    if company_info:
        serializer = CompanyInfoSerializer(company_info)
        return Response(serializer.data)
    return Response({'detail': 'Company info not found'}, status=404)