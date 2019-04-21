from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie

from tourney.views import spa


urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', jwt_cookie(GraphQLView.as_view(graphiql=True))),
    path('<path:path>', spa),
    path('', spa),
]
