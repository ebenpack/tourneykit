import graphene

from graphene_django.types import DjangoObjectType

from tourney.models import Competitor, Tourney, Heat


class CompetitorType(DjangoObjectType):
    class Meta:
        model = Competitor


class TourneyType(DjangoObjectType):
    class Meta:
        model = Tourney


class HeatType(DjangoObjectType):
    class Meta:
        model = Heat


class Query(object):
    competitors = graphene.List(CompetitorType)
    tourneys = graphene.List(TourneyType)
    heats = graphene.List(HeatType)

    competitor = graphene.Field(CompetitorType, id=graphene.Int(), name=graphene.String())
    tourney = graphene.Field(TourneyType, id=graphene.Int(), name=graphene.String())
    heat = graphene.Field(HeatType, id=graphene.Int())

    def resolve_competitors(self, info, **kwargs):
        return Competitor.objects.all()

    def resolve_tourneys(self, info, **kwargs):
        return Tourney.objects.prefetch_related('competitors').all()

    def resolve_heats(self, info, **kwargs):
        return Heat.objects.all()

    def resolve_competitor(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Competitor.objects.get(pk=id)
        if name is not None:
            return Competitor.objects.get(name=name)
        return None

    def resolve_tourney(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Tourney.objects.get(pk=id)
        if name is not None:
            return Tourney.objects.get(name=name)
        return None

    def resolve_heat(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Heat.objects.get(pk=id)
        return None