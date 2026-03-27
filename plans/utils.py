def generate_plan(user):
    goal = user.usergoal_set.first().goal.code if user.usergoal_set.exists() else 'maintainance'

    plan_data = [
        {"day" : 1, "focus": "Chest", "exercises" : ["Pushups", "Bench Press"]},
        {"day" : 2, "focus": "Back", "exercises" : ["Pullups", "Deadlift"]},
        {"day" : 3, "focus": "Legs", "exercises" : ["Squats", "Lunges"]},
    ]

    return plan_data