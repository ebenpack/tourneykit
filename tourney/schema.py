from django.contrib.auth import authenticate, login, logout, get_user_model

import graphene
from graphql_relay import from_global_id
from graphene import relay
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import graphene_django_optimizer as gql_optimizer
from django_filters import FilterSet, OrderingFilter

from tourney.models import Competitor, Team, TeamTourney, Game, Tourney, Match, Set


class MatchFilter(FilterSet):
    class Meta:
        model = Match
        fields = ("round",)  # TODO

    order_by = OrderingFilter(fields=("round", "seed",))


class CompetitorType(DjangoObjectType):
    class Meta:
        model = Competitor
        interfaces = (relay.Node,)


class MatchType(DjangoObjectType):
    class Meta:
        model = Match
        interfaces = (relay.Node,)


class TourneyType(DjangoObjectType):
    matchSet = DjangoFilterConnectionField(MatchType, filterset_class=MatchFilter)

    def resolve_matches(self, info, **kwargs):
        return gql_optimizer(MatchFilter(kwargs).qs)

    class Meta:
        model = Tourney
        interfaces = (relay.Node,)

    def resolve_matchSet(self, info, **kwargs):
        return MatchFilter(kwargs).qs


class TeamType(DjangoObjectType):
    class Meta:
        model = Team
        interfaces = (relay.Node,)


class TeamTourneyType(DjangoObjectType):
    class Meta:
        model = TeamTourney
        interfaces = (relay.Node,)


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        interfaces = (relay.Node,)


class SetType(DjangoObjectType):
    class Meta:
        model = Set
        interfaces = (relay.Node,)


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        interfaces = (relay.Node,)
        fields = ("id", "username")


class CompetitorsTypeConnection(relay.Connection):
    class Meta:
        node = CompetitorType


class TourneysTypeConnection(relay.Connection):
    class Meta:
        node = TourneyType


class MatchesTypeConnection(relay.Connection):
    class Meta:
        node = MatchType


class SetsTypeConnection(relay.Connection):
    class Meta:
        node = SetType


class TeamsTypeConnection(relay.Connection):
    class Meta:
        node = TeamType


class GamesTypeConnection(relay.Connection):
    class Meta:
        node = GameType


class UsersTypeConnection(relay.Connection):
    class Meta:
        node = UserType


class Query(object):
    competitors = relay.ConnectionField(CompetitorsTypeConnection)
    tourneys = relay.ConnectionField(TourneysTypeConnection)
    matches = relay.ConnectionField(MatchesTypeConnection)
    sets = relay.ConnectionField(SetsTypeConnection)
    teams = relay.ConnectionField(TeamsTypeConnection)
    games = relay.ConnectionField(GamesTypeConnection)

    competitor = relay.Node.Field(CompetitorType, name=graphene.String())
    tourney = relay.Node.Field(TourneyType, name=graphene.String())
    match = relay.Node.Field(MatchType)
    team = relay.Node.Field(TeamType, name=graphene.String())
    team_tourney = relay.Node.Field(TeamTourneyType, name=graphene.String())
    game = relay.Node.Field(GameType, name=graphene.String())
    set = relay.Node.Field(SetType)

    me = graphene.Field(UserType)
    users = relay.ConnectionField(UsersTypeConnection)

    def resolve_users(self, info):
        return gql_optimizer.quer(get_user_model().objects.all(), info)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            return None
        return user

    def resolve_competitors(self, info, **kwargs):
        return gql_optimizer.query(Competitor.objects.all(), info)

    def resolve_tourneys(self, info, **kwargs):
        return gql_optimizer.query(Tourney.objects.all().order_by("-created_at"), info)

    def resolve_matches(self, info, **kwargs):
        return gql_optimizer.query(Match.objects.all(), info)

    def resolve_teams(self, info, **kwargs):
        return gql_optimizer.query(Team.objects.all(), info)

    def resolve_games(self, info, **kwargs):
        return gql_optimizer.query(Game.objects.all(), info)

    def resolve_sets(self, info, **kwargs):
        return gql_optimizer.query(Set.objects.all(), info)

    def resolve_competitor(self, info, **kwargs):
        id = kwargs.get("id")
        name = kwargs.get("name")

        if id is not None:
            return Competitor.objects.get(pk=id)
        if name is not None:
            return Competitor.objects.get(name=name)
        return None

    def resolve_tourney(self, info, **kwargs):
        id = kwargs.get("id")
        name = kwargs.get("name")

        if id is not None:
            return gql_optimizer.query(Tourney.objects.get(pk=id))
        if name is not None:
            return gql_optimizer.query(Tourney.objects.get(name=name))
        return None

    def resolve_match(self, info, **kwargs):
        id = kwargs.get("id")

        if id is not None:
            return Match.objects.get(pk=id)
        return None

    def resolve_team(self, info, **kwargs):
        id = kwargs.get("id")
        name = kwargs.get("name")

        if id is not None:
            return Team.objects.get(pk=id)
        if name is not None:
            return Team.objects.get(name=name)
        return None

    def resolve_team_tourney(self, info, **kwargs):
        id = kwargs.get("id")
        name = kwargs.get("name")

        if id is not None:
            return TeamTourney.objects.get(pk=id)
        if name is not None:
            return TeamTourney.objects.get(name=name)
        return None

    def resolve_game(self, info, **kwargs):
        id = kwargs.get("id")
        name = kwargs.get("name")

        if id is not None:
            return Game.objects.get(pk=id)
        if name is not None:
            return Game.objects.get(name=name)
        return None

    def resolve_set(self, info, **kwargs):
        id = kwargs.get("id")

        if id is not None:
            return Set.objects.get(pk=id)
        return None


class CreateGame(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    game = graphene.Field(GameType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        game = Game.objects.create(name=name)
        ok = True
        return CreateGame(game=game, ok=ok)


class CreateCompetitor(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    competitor = graphene.Field(CompetitorType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        game = Competitor.objects.create(name=name)
        ok = True
        return CreateCompetitor(game=game, ok=ok)


class CreateTeam(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    team = graphene.Field(TeamType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        team = Team.objects.create(name=name)
        ok = True
        return CreateTeam(team=team, ok=ok)


class CreateTourney(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    tourney = graphene.Field(TourneyType)
    ok = graphene.Boolean()

    def mutate(self, info, name):
        tourney = Tourney.objects.create(name=name)
        ok = True
        return CreateTourney(tourney=tourney, ok=ok)


class StartTourney(graphene.Mutation):
    class Arguments:
        tourneyId = graphene.ID()

    ok = graphene.Boolean()

    def mutate(self, info, tourneyId):
        tourney = Tourney.objects.get(id=from_global_id(tourneyId)[1])
        tourney.start_tourney()
        ok = True
        return CreateTourney(tourney=tourney, ok=ok)


class Login(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        password = graphene.String()

    user = graphene.Field(UserType)
    ok = graphene.Boolean()

    def mutate(self, info, username, password):
        user = authenticate(info.context, username=username, password=password)
        if user is not None:
            login(info.context, user)
            return Login(ok=True, user=user)
        else:
            return Login(ok=False, user=None)


class Logout(graphene.Mutation):
    ok = graphene.Boolean()

    def mutate(self, info):
        logout(info.context)
        return Logout(ok=True)


class SignUp(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        passwordVerify = graphene.String()

    ok = graphene.Boolean()
    user = graphene.Field(UserType)

    def mutate(self, info, username, email, password, passwordVerify):
        # TODO: VERIFY WITH EMAIL
        if password != passwordVerify:
            raise Exception("Password mismatch")

        UserModel = get_user_model()
        if UserModel.objects.filter(username=username).exists():
            raise Exception("User already exists")

        UserModel.objects.create_user(username=username, email=email, password=password)
        user = authenticate(info.context, username=username, password=password)
        login(info.context, user)
        return SignUp(ok=True, user=user)


class Mutations(graphene.ObjectType):
    login = Login.Field()
    logout = Logout.Field()
    signUp = SignUp.Field()
    startTourney = StartTourney.Field()
    createGame = CreateGame.Field()
    createCompetitor = CreateCompetitor.Field()
    createTeam = CreateTeam.Field()
    createTourney = CreateTourney.Field()
