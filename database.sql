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

-- user_event_entries stores information about a user's location when a triggering event occurs.
-- A single user can create multiple entries, and the data is linked by a unique id number.
CREATE TABLE "user_event_entries" (
    "id" SERIAL PRIMARY KEY,
    "location"  VARCHAR(255), -- This might change to a different type if I have time to explore how to store geolocation data
    "date" DATE,
    "time" TIME,
    "distress_rating" INT CHECK(distress_rating >= 0 AND distress_rating <= 10),
    "user_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

CREATE TABLE "see_inputs" (
    "id" SERIAL PRIMARY KEY,
    "see_item_1" VARCHAR(100),
    "see_item_2" VARCHAR(100),
    "see_item_3" VARCHAR(100),
    "see_item_4" VARCHAR(100),
    "see_item_5" VARCHAR(100),
    "user_id" INT,
    "user_event_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    FOREIGN KEY ("user_event_id") REFERENCES "user_event_entries" ("id")
);

CREATE TABLE "touch_inputs" (
    "id" SERIAL PRIMARY KEY,
    "touch_item_1" VARCHAR(100),
    "touch_item_2" VARCHAR(100),
    "touch_item_3" VARCHAR(100),
    "touch_item_4" VARCHAR(100),
    "user_id" INT,
    "user_event_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    FOREIGN KEY ("user_event_id") REFERENCES "user_event_entries" ("id")
);

CREATE TABLE "hear_inputs" (
    "id" SERIAL PRIMARY KEY,
    "hear_item_1" VARCHAR(100),
    "hear_item_2" VARCHAR(100),
    "hear_item_3" VARCHAR(100),
    "user_id" INT,
    "user_event_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    FOREIGN KEY ("user_event_id") REFERENCES "user_event_entries" ("id")
);

CREATE TABLE "smell_inputs" (
    "id" SERIAL PRIMARY KEY,
    "smell_item_1" VARCHAR(100),
    "smell_item_2" VARCHAR(100),
    "user_id" INT,
    "user_event_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    FOREIGN KEY ("user_event_id") REFERENCES "user_event_entries" ("id")
);

CREATE TABLE "taste_inputs" (
    "id" SERIAL PRIMARY KEY,
    "taste_item_1" VARCHAR(100),
    "user_id" INT,
    "user_event_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    FOREIGN KEY ("user_event_id") REFERENCES "user_event_entries" ("id")
);

CREATE TABLE "user_images" (
    "id" SERIAL PRIMARY KEY,
    "image_url" VARCHAR (500) NOT NULL,
    "upload_date" DATE DEFAULT CURRENT_DATE,
    "upload_time" TIME DEFAULT CURRENT_TIME,
    "user_id" INT,
    "user_event_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id"),
    FOREIGN KEY ("user_event_id") REFERENCES "user_event_entries" ("id")
);

