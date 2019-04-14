from django.db import models
from django.contrib.auth.models import User


class DateTimeModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=False, editable=False)
    updated_at = models.DateTimeField(auto_now=False, editable=False)

    class Meta:
        abstract = True


class Competitor(DateTimeModel):
    name = models.CharField(max_length=100)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Team(DateTimeModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Game(DateTimeModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tourney(DateTimeModel):
    name = models.CharField(max_length=100)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    teams = models.ManyToManyField(Team, through='TeamTourney')

    def __str__(self):
        return self.name


class TeamTourney(DateTimeModel):
    seed = models.IntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    tourney = models.ForeignKey(Tourney, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tourney.name} - {self.team.name}"


class Match(DateTimeModel):
    round = models.IntegerField()
    tourney = models.ForeignKey(Tourney, on_delete=models.CASCADE)
    team1 = models.ForeignKey(TeamTourney, on_delete=models.CASCADE, related_name="team1", null=True)
    team2 = models.ForeignKey(TeamTourney, on_delete=models.CASCADE, related_name="team2", null=True)

    def __str__(self):
        return f"{self.tourney.name} - {self.team1.name} vs. {self.team2.name}"


class Set(DateTimeModel):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    team1_score = models.IntegerField()
    team2_score = models.IntegerField()

    def __str__(self):
        return f"{str(self.match.name)}"
