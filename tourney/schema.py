from django.contrib.auth import get_user_model

import graphene
import graphql_jwt
from graphene_django.types import DjangoObjectType
from graphql_jwt.decorators import login_required

from tourney.models import Competitor, Team, Game, Tourney, Match, Set

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


class SetType(DjangoObjectType):
    class Meta:
        model = Set


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class Query(object):
    competitors = graphene.List(CompetitorType)
    tourneys = graphene.List(TourneyType)
    matches = graphene.List(MatchType)
    sets = graphene.List(SetType)
    teams = graphene.List(TeamType)
    games = graphene.List(GameType)

    competitor = graphene.Field(CompetitorType, id=graphene.Int(), name=graphene.String())
    tourney = graphene.Field(TourneyType, id=graphene.Int(), name=graphene.String())
    match = graphene.Field(MatchType, id=graphene.Int())
    team = graphene.Field(TeamType, id=graphene.Int(), name=graphene.String())
    game = graphene.Field(GameType, id=graphene.Int(), name=graphene.String())
    set = graphene.Field(SetType, id=graphene.Int())

    me = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return get_user_model().objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user

    def resolve_competitors(self, info, **kwargs):
        return Competitor.objects.all()

    def resolve_tourneys(self, info, **kwargs):
        return Tourney.objects.all()

    def resolve_matches(self, info, **kwargs):
        return Match.objects.all()

    def resolve_teams(self, info, **kwargs):
        return Team.objects.all()

    def resolve_games(self, info, **kwargs):
        return Game.objects.all()

    def resolve_sets(self, info, **kwargs):
        return Set.objects.all()

    def resolve_competitor(self, info, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Competitor.objects.get(pk=id)
        if name is not None:
            return Competitor.objects.get(name=name)
        return None

    @login_required
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

    def resolve_set(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Set.objects.get(pk=id)
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
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    create_game = CreateGame.Field()
    create_competitor = CreateCompetitor.Field()
    create_team = CreateTeam.Field()
    create_tourney = CreateTourney.Field()
