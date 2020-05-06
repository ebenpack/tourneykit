import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tourneykit.settings")
django.setup()

from django.db import connection

from tourney import models
from django.contrib.auth import get_user_model

from django.core import management
import subprocess
import psycopg2

# Wipe out all tourneykit tables
conn = psycopg2.connect("dbname=tourneykit user=tourneykit")
cur = conn.cursor()
cur.execute(
    """
select 'drop table if exists "' || tablename || '" cascade;' 
from pg_tables
where tableowner = 'tourneykit'; 
"""
)
for drop in cur.fetchall():
    cur.execute(drop[0], ())
conn.commit()

# Wipe out any migrations
migration_dir = "./tourney/migrations/"
for f in os.listdir(migration_dir):
    if f != "__init__.py" and os.path.isfile(os.path.join(migration_dir, f)):
        os.remove(os.path.join(migration_dir, f))

# Migrate
management.call_command("makemigrations", verbosity=0, interactive=False)
management.call_command("migrate", verbosity=0, interactive=False)

UserModel = get_user_model()

# Set up users
users = [
    {"username": "ian"},
    {"username": "caroline"},
    {"username": "thurgood"},
    {"username": "pistrang"},
    {"username": "chuck"},
    {"username": "john"},
    {"username": "paul"},
    {"username": "george"},
    {"username": "ringo"},
    {"username": "bert"},
    {"username": "ernie"},
    {"username": "dirty dan"},
    {"username": "pinhead larry"},
    {"username": "calvin"},
    {"username": "hobbes"},
    {"username": "abbott"},
    {"username": "costello"},
    {"username": "waldorf"},
    {"username": "statler"},
    {"username": "hubert"},
    {"username": "hermes"},
]

try:
    UserModel.objects.create_superuser(
        username="ebenpack", email="ebenpackwood@gmail.com", password="tourneykit"
    )
except Exception as e:
    print("superuser", e)

for user in users:
    try:
        UserModel.objects.create_user(password="password1", **user)
    except Exception as e:
        print("users", e)

# Set up teams
teams = [
    {"name": "Goofball Squad"},
    {"name": "The Hawkblockers"},
    {"name": "Troll Toll"},
    {"name": "Cool Cats"},
    {"name": "The Actual Denver Broncos"},
    {"name": "Big BlackHawks"},
    {"name": "Dirty Dan & Pinhead Larry"},
    {"name": "Blinker Fluid"},
    {"name": "Chucking Parts"},
    {"name": "Bat Pictures Guild"},
    {"name": "Fighting Mongooses"},
]

for team in teams:
    try:
        models.Team.objects.get_or_create(**team)
    except Exception as e:
        print("teams", e)

# Set up games
games = [
    {"name": "Rocket League"},
    {"name": "CS:GO"},
    {"name": "DOTA2"},
]

for game in games:
    try:
        models.Game.objects.get_or_create(**game)
    except Exception as e:
        print("games", e)

# Set up tourneys
tourneys = [
    {"name": "CashStar Rocket League 2018", "game": "Rocket League"},
    {"name": "CashStar CS:GO 2018", "game": "CS:GO"},
    {"name": "CashStar DOTA2 2018", "game": "DOTA2"},
    {"name": "CashStar Rocket League 2018", "game": "Rocket League"},
    {"name": "CashStar CS:GO 2018", "game": "CS:GO"},
    {"name": "CashStar DOTA2 2018", "game": "DOTA2"},
    {"name": "CashStar Rocket League 2019", "game": "Rocket League"},
    {"name": "CashStar CS:GO 2019", "game": "CS:GO"},
    {"name": "CashStar DOTA2 2019", "game": "DOTA2"},
    {"name": "CashStar Rocket League 2020", "game": "Rocket League"},
    {"name": "CashStar CS:GO 2020", "game": "CS:GO"},
    {"name": "CashStar DOTA2 2020", "game": "DOTA2"},
]

for tourney in tourneys:
    try:
        me = UserModel.objects.get(username="ebenpack")
        game = models.Game.objects.get(name=tourney.pop("game"))
        models.Tourney.objects.get_or_create(game=game, admin=me, **tourney)
    except Exception as e:
        print("tourneys", e)

# Set up tourney teams
team_tourneys = [
    {"seed": 1, "team": "Goofball Squad", "tourney": "CashStar Rocket League 2020"},
    {"seed": 2, "team": "The Hawkblockers", "tourney": "CashStar Rocket League 2020"},
    {"seed": 3, "team": "Troll Toll", "tourney": "CashStar Rocket League 2020"},
    {"seed": 4, "team": "Cool Cats", "tourney": "CashStar Rocket League 2020"},
    {
        "seed": 5,
        "team": "The Actual Denver Broncos",
        "tourney": "CashStar Rocket League 2020",
    },
    {"seed": 6, "team": "Big BlackHawks", "tourney": "CashStar Rocket League 2020"},
    {
        "seed": 7,
        "team": "Dirty Dan & Pinhead Larry",
        "tourney": "CashStar Rocket League 2020",
    },
    {"seed": 8, "team": "Blinker Fluid", "tourney": "CashStar Rocket League 2020"},
    {"seed": 9, "team": "Chucking Parts", "tourney": "CashStar Rocket League 2020"},
    {
        "seed": 10,
        "team": "Bat Pictures Guild",
        "tourney": "CashStar Rocket League 2020",
    },
    {"seed": 9, "team": "Fighting Mongooses", "tourney": "CashStar Rocket League 2020"},
    {"seed": 1, "team": "Goofball Squad", "tourney": "CashStar CS:GO 2020"},
    {"seed": 2, "team": "The Hawkblockers", "tourney": "CashStar CS:GO 2020"},
    {"seed": 3, "team": "Troll Toll", "tourney": "CashStar CS:GO 2020"},
    {"seed": 1, "team": "Goofball Squad", "tourney": "CashStar DOTA2 2020"},
    {"seed": 2, "team": "The Hawkblockers", "tourney": "CashStar DOTA2 2020"},
    {"seed": 3, "team": "Troll Toll", "tourney": "CashStar DOTA2 2020"},
]

for team_tourney in team_tourneys:
    try:
        team = models.Team.objects.get(name=team_tourney.pop("team"))
        tourney = models.Tourney.objects.get(name=team_tourney.pop("tourney"))
        models.TeamTourney.objects.get_or_create(
            team=team, tourney=tourney, **team_tourney
        )
    except Exception as e:
        print("team_tourneys", e)

# Set up competitors
competitors = [
    {"username": "ian", "team": "Goofball Squad"},
    {"username": "ebenpack", "team": "Goofball Squad"},
    {"username": "caroline", "team": "Troll Toll"},
    {"username": "thurgood", "team": "Troll Toll"},
    {"username": "pistrang", "team": "The Hawkblockers"},
    {"username": "chuck", "team": "The Hawkblockers"},
    {"username": "john", "team": "Cool Cats"},
    {"username": "paul", "team": "Cool Cats"},
    {"username": "george", "team": "The Actual Denver Broncos"},
    {"username": "ringo", "team": "The Actual Denver Broncos"},
    {"username": "bert", "team": "Big BlackHawks"},
    {"username": "ernie", "team": "Big BlackHawks"},
    {"username": "dirty dan", "team": "Dirty Dan & Pinhead Larry"},
    {"username": "pinhead larry", "team": "Dirty Dan & Pinhead Larry"},
    {"username": "calvin", "team": "Blinker Fluid"},
    {"username": "hobbes", "team": "Blinker Fluid"},
    {"username": "abbott", "team": "Chucking Parts"},
    {"username": "costello", "team": "Chucking Parts"},
    {"username": "waldorf", "team": "Bat Pictures Guild"},
    {"username": "statler", "team": "Bat Pictures Guild"},
    {"username": "hubert", "team": "Fighting Mongooses"},
    {"username": "hermes", "team": "Fighting Mongooses"},
]

for competitor in competitors:
    try:
        username = competitor.pop("username")
        team_name = competitor.pop("team")
        user = UserModel.objects.get(username=username)
        team = models.Team.objects.get(name=team_name)
        models.Competitor.objects.get_or_create(user=user, team=team)
    except Exception as e:
        print("competitors", e, username, team_name)


# Start a tourney
models.Tourney.objects.get(name="CashStar Rocket League 2020").start_tourney()
