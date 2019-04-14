# Generated by Django 2.2 on 2019-04-14 21:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0003_auto_20190414_2056'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='team1',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team1', to='tourney.TeamTourney'),
        ),
        migrations.AlterField(
            model_name='match',
            name='team2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team2', to='tourney.TeamTourney'),
        ),
    ]
