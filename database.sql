-- CREATE DATABASE: rooted_app

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- Create the "triggers" table to store each triggering event. Each event is linked to a user.
CREATE TABLE "triggers" (
    "id" SERIAL PRIMARY KEY,
    "location" VARCHAR(500),
    "date" DATE,
    "time" TIME,
    "intensity_rating" INT,
    "user_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

-- Create the "inputs" table to store inputs for each triggering event. Each input is linked to a trigger.
CREATE TABLE "inputs" (
    "id" SERIAL PRIMARY KEY,
    "see_input" VARCHAR(500),
    "feel_input" VARCHAR(500),
    "hear_input" VARCHAR(500),
    "smell_input" VARCHAR(500),
    "taste_input" VARCHAR(500),
    "trigger_id" INT,
    FOREIGN KEY ("trigger_id") REFERENCES "triggers" ("id")
);

-- "user_images" table contains uploaded images 
CREATE TABLE "user_images" (
    "id" SERIAL PRIMARY KEY,
    "image_url" VARCHAR (500) NOT NULL,
    "upload_date" DATE DEFAULT CURRENT_DATE,
    "upload_time" TIME DEFAULT CURRENT_TIME,
    "user_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    "trigger_id" INT,
    FOREIGN KEY ("trigger_id") REFERENCES "triggers" ("id")
    
);

