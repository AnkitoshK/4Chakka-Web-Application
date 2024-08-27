# from django.db import models


# class Order(models.Model):
#     pickup = models.CharField(max_length=255)
#     drop = models.CharField(max_length=255)
#     vehicle_type = models.CharField(max_length=50)
#     pickup_date = models.DateField()
#     phone = models.CharField(max_length=15)
#     address = models.TextField()

#     def __str__(self):
#         return f"Order from {self.pickup} to {self.drop}"


# from django.db import models

# class Contact(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     phone = models.CharField(max_length=15)
#     service = models.CharField(max_length=100)
#     message = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.name} - {self.email}"

# class Feedback(models.Model):
#     rating = models.IntegerField()
#     experience = models.TextField()
#     reference_number = models.CharField(max_length=10)
#     full_name = models.CharField(max_length=100)

#     def __str__(self):
#         return f"{self.full_name} - {self.reference_number}"



from django.db import models

class Order(models.Model):
    pickup = models.CharField(max_length=255)
    drop = models.CharField(max_length=255)
    vehicle_type = models.CharField(max_length=50)
    pickup_date = models.DateField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    time_added = models.DateTimeField(auto_now_add=True)
    time_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order from {self.pickup} to {self.drop}"

class SliderImage(models.Model):
    image = models.ImageField(upload_to='slider_images/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.caption if self.caption else f"Image {self.pk}"

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    service = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    time_added = models.DateTimeField(auto_now_add=True)
    time_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

class Feedback(models.Model):
    rating = models.IntegerField()
    experience = models.TextField()
    reference_number = models.CharField(max_length=10)
    full_name = models.CharField(max_length=100)
    time_added = models.DateTimeField(auto_now_add=True)
    time_updated = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.full_name} - {self.reference_number}"

class VehicleType(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Description(models.Model):
    text = models.TextField()

class Service(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class ContactUsPage(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

# class DescriptionC(models.Model):
#    description_text = models.TextField()

#    def __str__(self):
#         return self.description_text

class AboutUs(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='about_us/', blank=True, null=True)

    def __str__(self):
        return self.title


class FeedbackImage(models.Model):
    image = models.ImageField(upload_to='feedback_images/')

class ServicePage(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='service_images/')

    def __str__(self):
        return self.title

    @property
    def image_url(self):
        if self.image:
            return self.image.url
        return ''

class ContactInfo(models.Model):
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"Contact Info: {self.email}, {self.phone}"

class CompanyInfo(models.Model):
    email = models.EmailField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return f"Company Info: {self.email}, {self.phone}"