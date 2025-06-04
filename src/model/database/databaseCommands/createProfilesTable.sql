CREATE TABLE profiles(
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    birthday TEXT NOT NULL,
    height INTEGER NOT NULL,
    sex TEXT NOT NULL,
    activity_level INTEGER,
    goal_type TEXT,
    goal_weight INTEGER,
    goal_bodyfat INTEGER,
    target_calories INTEGER
);
