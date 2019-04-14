from django.contrib import admin

from tourney.models import Competitor, Team, Game, Tourney, TeamTourney, Match


class CompetitorAdmin(admin.ModelAdmin):
    pass


class TourneyAdmin(admin.ModelAdmin):
    pass


class MatchAdmin(admin.ModelAdmin):
    pass


class TeamAdmin(admin.ModelAdmin):
    pass


class GameAdmin(admin.ModelAdmin):
    pass


class TeamTourneyAdmin(admin.ModelAdmin):
    pass


admin.site.register(Competitor, CompetitorAdmin)
admin.site.register(Tourney, TourneyAdmin)
admin.site.register(Match, MatchAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Game, GameAdmin)
admin.site.register(TeamTourney, TeamTourneyAdmin)
