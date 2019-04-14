from django.db import models


class Competitor(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tourney(models.Model):
    name = models.CharField(max_length=100)
    competitors = models.ManyToManyField(Competitor)

    def __str__(self):
        return self.name


class Heat(models.Model):
    tourney = models.ForeignKey(Tourney, on_delete=models.CASCADE)
    competitors = models.ManyToManyField(Competitor)
