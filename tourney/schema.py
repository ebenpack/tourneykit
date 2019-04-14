import graphene

from graphene_django.types import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation

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


class CreateGame(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    game = graphene.Field(lambda: GameType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        game = Game.objects.create(name=name)
        ok = True
        return CreateGame(game=game, ok=ok)


class CreateCompetitor(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    competitor = graphene.Field(lambda: CompetitorType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        game = Competitor.objects.create(name=name)
        ok = True
        return CreateCompetitor(game=game, ok=ok)


class CreateTeam(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    team = graphene.Field(lambda: TeamType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        team = Team.objects.create(name=name)
        ok = True
        return CreateTeam(team=team, ok=ok)


class CreateTourney(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    tourney = graphene.Field(lambda: TourneyType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        tourney = Tourney.objects.create(name=name)
        ok = True
        return CreateTourney(tourney=tourney, ok=ok)


class Mutations(graphene.ObjectType):
    create_game = CreateGame.Field()
    create_competitor = CreateCompetitor.Field()
    create_team = CreateTeam.Field()
    create_tourney = CreateTourney.Field()
