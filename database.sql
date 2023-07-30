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

-- "user_images" table contains uploaded images 
CREATE TABLE "user_images" (
    "id" SERIAL PRIMARY KEY,
    "image_url" VARCHAR (500) NOT NULL,
    "upload_date" DATE DEFAULT CURRENT_DATE,
    "upload_time" TIME DEFAULT CURRENT_TIME,
    "user_id" INT,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);