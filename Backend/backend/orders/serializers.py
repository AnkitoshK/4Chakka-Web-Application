from rest_framework import serializers
from .models import Contact,Feedback,VehicleType,SliderImage,Description,Service,AboutUs,ContactUsPage,FeedbackImage,ServicePage,ContactInfo,CompanyInfo

class OrderSerializer(serializers.Serializer):
    pickup = serializers.CharField(max_length=100)
    drop = serializers.CharField(max_length=100)
    vehicleType = serializers.CharField(max_length=100)
    pickupDate = serializers.DateField()
    phone = serializers.CharField(max_length=15)
    address = serializers.CharField(max_length=200)

class SliderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SliderImage
        fields = ['id', 'image',  'caption',  'order']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        # fields = ['name', 'email', 'message']
        fields = '__all__'

class VehicleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleType
        fields = '__all__'

# class ImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Image
#         fields = '__all__'

class DescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ['text']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class ContactUsPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUsPage
        fields = ['title', 'description']

# class DescriptionCSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DescriptionC
#         fields = ['description_text']

class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ['title', 'description','image']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackImage
        fields = '__all__'

class ServicePageSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()

    class Meta:
        model = ServicePage
        fields = ('id', 'title', 'description', 'image_url')

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ('email', 'phone')

class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = ('email', 'phone')