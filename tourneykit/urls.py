from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView

from tourney.views import spa


urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
    path('', spa),
]
