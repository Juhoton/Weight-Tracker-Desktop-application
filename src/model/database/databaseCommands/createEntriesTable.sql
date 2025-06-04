CREATE TABLE entries(
    id INTEGER PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    year_week TEXT NOT NULL,
    weight_monday INTEGER,
    weight_tuesday INTEGER,
    weight_wednesday INTEGER,
    weight_thursday INTEGER,
    weight_friday INTEGER,
    weight_saturday INTEGER,
    weight_sunday INTEGER,
    weight_avg INTEGER,
    neck INTEGER,
    waist INTEGER,
    hips INTEGER,
    bodyfat INTEGER,
    UNIQUE(profile_id, year_week)
);
