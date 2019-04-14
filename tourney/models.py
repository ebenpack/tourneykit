from django.db import models
from django.contrib.auth.models import User


class Competitor(models.Model):
    name = models.CharField(max_length=100)
    team = models.ForeignKey('Team', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Team(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Game(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tourney(models.Model):
    name = models.CharField(max_length=100)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    admin = models.ForeignKey(User, on_delete=models.CASCADE)
    teams = models.ManyToManyField(Team, through='TeamTourney')

    def __str__(self):
        return self.name


class TeamTourney(models.Model):
    seed = models.IntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    tourney = models.ForeignKey(Tourney, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tourney.name} - {self.team.name}"


class Match(models.Model):
    tourney = models.ForeignKey(Tourney, on_delete=models.CASCADE)
    team1 = models.ForeignKey(Competitor, on_delete=models.CASCADE, related_name="team1")
    team2 = models.ForeignKey(Competitor, on_delete=models.CASCADE, related_name="team2")

    def __str__(self):
        return f"{self.tourney.name} - {self.team1.name} vs. {self.team2.name}"
