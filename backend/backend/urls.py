"""
URL configuration for back_2 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import include
from rest_framework import routers
from rest_framework.schemas import get_schema_view

# from dish.views import CategoryViewSet
# from dish.views import RecipieViewSet
from silant_api.views import MachineViewSet
from silant_api.views import MaintenanceViewSet
from silant_api.views import ComplaintViewSet
from silant_api.views import ProfileViewSet
from silant_api.views import LoginViewSet
from silant_api.views import CSRFViewSet
from silant_api.views import LogoutViewSet
from silant_api.views import IsAuthenticatedViewSet

from silant_api.views import get_csrf
from silant_api.views import login_view
from silant_api.views import logout_view
from silant_api.views import SessionView
from silant_api.views import WhoAmIView


# urlpatterns = [
#     path('csrf/', get_csrf, name='api-csrf'),
#     path('login/', login_view, name='api-login'),
#     path('logout/', logout_view, name='api-logout'),
#     path('session/', SessionView.as_view(), name='api-session'),
#     path('whoami/', WhoAmIView.as_view(), name='api-whoami'),
# ]


# urlpatterns = [
#     path("admin/", admin.site.urls),
# ]


router = routers.DefaultRouter()
# router.register(r"categories", CategoryViewSet)
# router.register(r"recipies", RecipieViewSet)
router.register(r"machines", MachineViewSet, basename="machines")
router.register(r"maintenance", MaintenanceViewSet, basename="maintenance")
router.register(r"complaint", ComplaintViewSet)
router.register(r"whoami", ProfileViewSet)
router.register(r"login", LoginViewSet, basename="login")
router.register(r"csrf", CSRFViewSet, basename="csrf")
router.register(r"logout", LogoutViewSet, basename="logout")
router.register(r"isauth", IsAuthenticatedViewSet, basename="isauth")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path(
        "api-auth/", include("rest_framework.urls", namespace="rest_framework")
    ),
    # path('api/csrf/', get_csrf, name='api-csrf'),
    # path('api/login/', login_view, name='api-login'),
    # path('api/logout/', logout_view, name='api-logout'),
    # path('api/session/', SessionView.as_view(), name='api-session'),
    # path('api/whoami/', WhoAmIView.as_view(), name='api-whoami'),
    path(
        "api/openapi/",
        get_schema_view(
            title="My SiLANT diplom project",
            description="API for machine",
        ),
        name="openapi-schema",
    ),
]
