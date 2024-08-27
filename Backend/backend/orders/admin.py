from django.contrib import admin
from .models import Contact, Description, Order,SliderImage,Feedback,VehicleType,Service,AboutUs, ContactUsPage,FeedbackImage,ServicePage,ContactInfo,CompanyInfo

class OrderAdmin(admin.ModelAdmin):
    list_display = ('pickup', 'drop', 'vehicle_type', 'pickup_date', 'phone', 'address','time_added','time_updated')
    list_filter = ('vehicle_type', 'pickup_date')


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name','email','phone','service','message','time_added','time_updated')
    list_filter = ('email','phone')

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('rating','experience','reference_number','full_name','time_added','time_updated')
    # list_filter = ('reference_number')

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'contact_number')

class AboutUsAdmin(admin.ModelAdmin):
    list_display = ('title', 'description','image')

class ServicePageAdmin(admin.ModelAdmin):
    list_display = ('title', 'description','image')

class SliderImageAdmin(admin.ModelAdmin):
    list_display = [ 'order','image']
    ordering = ['order']

class FeedbackImageAdmin(admin.ModelAdmin):
    list_display = [ 'image']



admin.site.register(Order, OrderAdmin)
admin.site.register(Contact,ContactAdmin)
admin.site.register(Feedback,FeedbackAdmin)
admin.site.register(VehicleType)
admin.site.register(Description)
admin.site.register(Service)
# admin.site.register(DescriptionC)
admin.site.register(AboutUs,AboutUsAdmin)
admin.site.register(ContactUsPage)
admin.site.register(SliderImage,SliderImageAdmin)
admin.site.register(FeedbackImage, FeedbackImageAdmin)
admin.site.register(ServicePage, ServicePageAdmin)
admin.site.register(ContactInfo)
admin.site.register(CompanyInfo)