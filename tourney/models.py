import math
from itertools import zip_longest

from django.db import models, transaction
from django.contrib.auth.models import User


class DateTimeModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Competitor(DateTimeModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey("Team", on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user", "team")

    def __str__(self):
        return f"{self.team.name} - {self.user.username}"


class Team(DateTimeModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Game(DateTimeModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tourney(DateTimeModel):
    SETUP = "S"
    RUNNING = "R"
    FINISHED = "F"
    STATUS_CHOICES = [
        (SETUP, "Setup"),
        (RUNNING, "Running"),
        (FINISHED, "Finished"),
    ]
    name = models.CharField(max_length=100)
    current_round = models.IntegerField(default=0)
    status = models.CharField(choices=STATUS_CHOICES, default=SETUP, max_length=5)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    teams = models.ManyToManyField(Team, through="TeamTourney")

    def __str__(self):
        return self.name

    def number_of_matches_in_round(self, round):
        # With an uneven number of teams in a round, there will by a
        # placeholder bye match, so we'll round up to accommodate for this
        number_of_teams = self.teams.count()

        def helper(round):
            if round <= 1:
                return math.ceil(number_of_teams / 2)
            return math.ceil(helper(round - 1) / 2)

        return helper(round)

    def create_empty_rounds(self, round):
        number_of_teams = self.teams.count()
        # Round up to the nearest power of two.
        # Empty matches will be automatically completed, but this simplifies the math
        round_size = int(math.pow(2, math.ceil(math.log2(number_of_teams / 2))))
        while round_size > 0:
            for seed in range(1, round_size + 1):
                Match.objects.create(
                    round=round,
                    seed=seed,
                    tourney=self,
                    team1=None,
                    team2=None,
                    winner=None,
                    completed=False,
                )
            round += 1
            round_size = math.floor(round_size / 2)

    def populate_round(self, round):
        def group(iterable, n, fillvalue=None):
            args = [iter(iterable)] * n
            return zip_longest(*args, fillvalue=fillvalue)

        # TODO: Fix seeding
        teams = self.teamtourney_set.exclude(eliminated=True).order_by("-seed")
        matches = self.match_set.filter(round=round).order_by("-seed")
        for (match, teams) in zip_longest(matches, group(teams, 2), fillvalue=None):
            if teams is not None:
                (team1, team2) = teams
            else:
                team1 = None
                team2 = None
            winner = team1 if team2 is None else None
            completed = True if team1 is None or team2 is None else False
            match.winner = winner
            match.completed = completed
            match.bye = completed
            match.team1 = team1
            match.team2 = team2
            match.save()

    def start_tourney(self):
        if self.status == self.SETUP:
            with transaction.atomic():
                self.create_empty_rounds(1)
                self.populate_round(1)
                self.status = self.RUNNING
                self.save()
        elif self.status == self.FINISHED:
            raise Exception("Tournement is already running")
        elif self.status == self.RUNNING:
            raise Exception("Tournement has completed")
        else:
            raise Exception("Tournement cannot be started")


class TeamTourney(DateTimeModel):
    seed = models.IntegerField()
    eliminated = models.BooleanField(default=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    tourney = models.ForeignKey(Tourney, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("team", "tourney")

    def __str__(self):
        return f"{self.tourney.name} - {self.team.name}"


class Match(DateTimeModel):
    round = models.IntegerField()
    seed = models.IntegerField()
    tourney = models.ForeignKey(Tourney, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    bye = models.BooleanField(default=False)
    winner = models.ForeignKey(
        TeamTourney, on_delete=models.CASCADE, related_name="winner", null=True
    )
    team1 = models.ForeignKey(
        TeamTourney, on_delete=models.CASCADE, related_name="team1", null=True
    )
    team2 = models.ForeignKey(
        TeamTourney, on_delete=models.CASCADE, related_name="team2", null=True
    )

    class Meta:
        unique_together = ("round", "tourney", "team1", "team2")

    def __str__(self):
        return (
            f"{self.tourney.name} - {self.team1.team.name} vs. {self.team2.team.name}"
        )


class Set(DateTimeModel):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    team1_score = models.IntegerField()
    team2_score = models.IntegerField()

    def __str__(self):
        return f"{str(self.match.name)}"
