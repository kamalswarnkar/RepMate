from .models import ProgressStat

def update_progress(user):
    stat, created = ProgressStat.objects.get_or_create(user=user)

    stat.streak += 1
    stat.xp += 10

    if stat.xp >= 100:
        stat.level += 1
        stat.xp = 0
    
    stat.save()