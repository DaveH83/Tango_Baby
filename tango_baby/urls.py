from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.front),
    path('user/', include('user_app.urls')),
    path('app/', include('name_app.urls'))
]
