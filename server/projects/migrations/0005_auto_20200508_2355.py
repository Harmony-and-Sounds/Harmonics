# Generated by Django 3.0.4 on 2020-05-08 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_voice_voice_abc_directory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voice',
            name='instrument',
            field=models.CharField(choices=[('piano', 'piano'), ('vocals', 'vocals'), ('bass', 'bass'), ('drums', 'drums')], max_length=50),
        ),
    ]
