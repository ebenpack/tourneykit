import graphene

from graphene_django.types import DjangoObjectType

from tourney.models import Competitor, Team, Game, Tourney, Match


class CompetitorType(DjangoObjectType):
    class Meta:
        model = Competitor


class TourneyType(DjangoObjectType):
    class Meta:
        model = Tourney


class MatchType(DjangoObjectType):
    class Meta:
        model = Match


class TeamType(DjangoObjectType):
    class Meta:
        model = Team


class GameType(DjangoObjectType):
    class Meta:
        model = Game


class Query(object):
    competitors = graphene.List(CompetitorType)
    tourneys = graphene.List(TourneyType)
    matches = graphene.List(MatchType)

    teams = graphene.List(TeamType)
    games = graphene.List(GameType)

    competitor = graphene.Field(CompetitorType, id=graphene.Int(), name=graphene.String())
    tourney = graphene.Field(TourneyType, id=graphene.Int(), name=graphene.String())
    match = graphene.Field(MatchType, id=graphene.Int())

    team = graphene.Field(TeamType, id=graphene.Int(), name=graphene.String())
    game = graphene.Field(GameType, id=graphene.Int(), name=graphene.String())

    def resolve_competitors(self, info, **kwargs):
        return Competitor.objects.all()

    def resolve_tourneys(self, info, **kwargs):
        return Tourney.objects.prefetch_related('competitors').all()

    def resolve_matches(self, info, **kwargs):
        return Match.objects.all()

    def resolve_teams(self, info, **kwargs):
        return Team.objects.all()

    def resolve_games(self, info, **kwargs):
        return Game.objects.all()

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

    def resolve_match(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Match.objects.get(pk=id)
        return None

    def resolve_team(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Team.objects.get(pk=id)
        if name is not None:
            return Team.objects.get(name=name)
        return None
    
    def resolve_game(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Game.objects.get(pk=id)
        if name is not None:
            return Game.objects.get(name=name)
        return None
