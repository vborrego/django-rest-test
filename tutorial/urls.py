from django.urls import include, path
from rest_framework import routers
from tutorial.quickstart import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'helloworldviewset', views.HelloWorldViewSet,basename="helloworldviewset")
router.register(r'tasks', views.TaskViewSet,basename="tasks")

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('helloworld/',views.hello_world),
    path('helloworldanon/',views.HelloWorldAnonView.as_view()),
]

