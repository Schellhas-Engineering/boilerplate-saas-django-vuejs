# Generated by Django 3.2.5 on 2021-09-09 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usermanagement', '0013_rename_subscription_workspace_subscriptionplan'),
    ]

    operations = [
        migrations.AddField(
            model_name='workspace',
            name='state',
            field=models.CharField(blank=True, max_length=100, verbose_name='State'),
        ),
    ]