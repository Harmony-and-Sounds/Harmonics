# Generated by Django 3.0.4 on 2020-03-23 21:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_project_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='voice',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='voices', to='projects.Project'),
        ),
    ]
