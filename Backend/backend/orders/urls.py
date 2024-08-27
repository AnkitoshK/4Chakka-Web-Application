
from django.urls import path
from . import views
# from .views import SliderImageViewSet
# from rest_framework.routers import DefaultRouter
from .views import vehicle_type_list_create
from django.conf import settings
from django.conf.urls.static import static

# router = DefaultRouter()
# router.register(r'slider_images', SliderImageViewSet, basename='sliderimage')

urlpatterns = [
    # path('', include(router.urls)),
    path('create/', views.create_order, name='create_order'),
    path('contact_us/', views.contact_us, name='contact_us'),
    path('submit_feedback/', views.submit_feedback, name='submit_feedback'),
    path('vehicle_types/', vehicle_type_list_create, name='vehicle_type_list_create'),
    path('description/', views.description_view, name='description'),
    path('services/', views.service_list, name='service_list'),
    # path('descriptionc/', views.get_description, name='description'),
    path('contact_us_page/', views.get_contact_us_page, name='get_contact_us_page'),
    path('about_us/', views.about_us_detail, name='about_us_detail'),
    # path('about_us/', get_about_us, name='get_about_us'),
    path('slider_images/', views.get_slider_images, name='slider_images'),
    path('get_feedback_image/', views.get_feedback_image, name='get_feedback_image'),
    path('services_page/', views.service_list_view, name='service-list'),
    path('contact_info/', views.contact_info_view, name='contact_info'),
    path('company_info/', views.company_info_view, name='company_info'),
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)