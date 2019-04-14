from django.contrib import admin

from tourney.models import Competitor, Tourney, Heat

class CompetitorAdmin(admin.ModelAdmin):
    pass

class TourneyAdmin(admin.ModelAdmin):
    pass

class HeatAdmin(admin.ModelAdmin):
    pass

admin.site.register(Competitor, CompetitorAdmin)
admin.site.register(Tourney, TourneyAdmin)
admin.site.register(Heat, HeatAdmin)