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

    def initialize_matches(self):
        def group(iterable, n, fillvalue=None):
            args = [iter(iterable)] * n
            return zip_longest(*args, fillvalue=fillvalue)

        teams = self.teamtourney_set.all()
        number_of_teams = teams.count()
        # Round up to the nearest power of two.
        # Empty matches will be automatically completed, but this simplifies the math
        round_size = int(math.pow(2, math.ceil(math.log2(number_of_teams / 2))))
        matches = []
        # Rounds and seeds will be zero-based to make list indexing more straightforward.
        # They will be incremented prior ro saving, however
        round = 0
        # Stub out an entire bracket
        while round_size > 0:
            matches.append([])
            for seed in range(0, round_size):
                matches[round].append(
                    Match(
                        round=round,
                        seed=seed,
                        tourney=self,
                        team1=None,
                        team2=None,
                        winner=None,
                        completed=False,
                    )
                )
            round += 1
            round_size = math.floor(round_size / 2)

        # Populate the first round
        round_one_matches = matches[0]
        for (match, teams) in zip_longest(
            round_one_matches, group(teams, 2), fillvalue=None
        ):
            if teams is not None:
                (team1, team2) = teams
                match.exclude = False
            else:
                # Mark matches with no competitors for later removal
                match.exclude = True
                continue
            winner = team1 if team2 is None else None
            completed = True if team1 is None or team2 is None else False
            match.winner = winner
            match.completed = completed
            match.bye = completed
            match.team1 = team1
            match.team2 = team2

        # Allow empty matches from the first round to percolate through the rest of the bracket
        for round in matches:
            for match in round:
                if match.round != 0:
                    previous_match_one = matches[match.round - 1][match.seed * 2]
                    previous_match_two = matches[match.round - 1][(match.seed * 2) + 1]

                    match.exclude = False
                    if previous_match_two.exclude is True:
                        if previous_match_one.exclude is True:
                            match.exclude = True
                        else:
                            match.bye = True
                    if match.seed % 2 == 1 and match.exclude:
                        matches[match.round][match.seed - 1].bye = True

                match.round += 1
                match.seed += 1
                if not match.exclude:
                    match.save()

    def start_tourney(self):
        if self.status == self.SETUP:
            with transaction.atomic():
                self.initialize_matches()
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
