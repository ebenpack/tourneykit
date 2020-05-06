# Generated by Django 3.0.5 on 2020-05-05 12:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Game",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=100)),
            ],
            options={"abstract": False,},
        ),
        migrations.CreateModel(
            name="Match",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("round", models.IntegerField()),
                ("seed", models.IntegerField()),
                ("completed", models.BooleanField(default=False)),
                ("bye", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Team",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=100)),
            ],
            options={"abstract": False,},
        ),
        migrations.CreateModel(
            name="TeamTourney",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("seed", models.IntegerField()),
                ("eliminated", models.BooleanField(default=False)),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tourney.Team"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Tourney",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=100)),
                ("current_round", models.IntegerField(default=0)),
                (
                    "status",
                    models.CharField(
                        choices=[("S", "Setup"), ("R", "Running"), ("F", "Finished")],
                        default="S",
                        max_length=5,
                    ),
                ),
                (
                    "admin",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "game",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tourney.Game"
                    ),
                ),
                (
                    "teams",
                    models.ManyToManyField(
                        through="tourney.TeamTourney", to="tourney.Team"
                    ),
                ),
            ],
            options={"abstract": False,},
        ),
        migrations.AddField(
            model_name="teamtourney",
            name="tourney",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="tourney.Tourney"
            ),
        ),
        migrations.CreateModel(
            name="Set",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("team1_score", models.IntegerField()),
                ("team2_score", models.IntegerField()),
                (
                    "match",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tourney.Match"
                    ),
                ),
            ],
            options={"abstract": False,},
        ),
        migrations.AddField(
            model_name="match",
            name="team1",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="team1",
                to="tourney.TeamTourney",
            ),
        ),
        migrations.AddField(
            model_name="match",
            name="team2",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="team2",
                to="tourney.TeamTourney",
            ),
        ),
        migrations.AddField(
            model_name="match",
            name="tourney",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="tourney.Tourney"
            ),
        ),
        migrations.AddField(
            model_name="match",
            name="winner",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="winner",
                to="tourney.TeamTourney",
            ),
        ),
        migrations.AlterUniqueTogether(
            name="teamtourney", unique_together={("team", "tourney")},
        ),
        migrations.AlterUniqueTogether(
            name="match", unique_together={("round", "tourney", "team1", "team2")},
        ),
        migrations.CreateModel(
            name="Competitor",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="tourney.Team"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={"unique_together": {("user", "team")},},
        ),
    ]
