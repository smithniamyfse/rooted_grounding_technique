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

-- Staging Data
-- User 1 event entries
INSERT INTO "user_event_entries" ("location", "date", "time", "distress_rating", "user_id")
VALUES 
('Work', '2023-08-02', '14:30:00', 7, 1),
('Hospital', '2023-08-03', '16:45:00', 5, 1),
('Crowded Market', '2023-08-04', '09:15:00', 8, 1);

-- User 1 image entries
INSERT INTO "user_images" ("image_url", "user_id", "user_event_id")
VALUES 
('http://example.com/image1.jpg', 1, 1),
('http://example.com/image2.jpg', 1, 2),
('http://example.com/image3.jpg', 1, 3);

-- User 1 see_inputs entries
INSERT INTO "see_inputs" ("see_item_1", "see_item_2", "see_item_3", "see_item_4", "see_item_5", "user_id", "user_event_id")
VALUES 
('Boss', 'Overloaded inbox', 'Long to-do list', 'Coffee spilled on reports', 'Unanswered phone', 1, 1),
('Hospital bed', 'IV drip', 'Heart monitor', 'Hospital gown', 'Unfamiliar room', 1, 2),
('Crowd', 'Long lines', 'Sold out sign', 'Overfilled carts', 'Empty shelves', 1, 3);

-- User 1 touch_inputs entries
INSERT INTO "touch_inputs" ("touch_item_1", "touch_item_2", "touch_item_3", "touch_item_4", "user_id", "user_event_id")
VALUES 
('Chair back', 'Desk edge', 'Keyboard keys', 'Mouse', 1, 1),
('Bed rail', 'Cotton gown', 'Cold floor', 'Plastic cup', 1, 2),
('Wallet', 'Shopping bag', 'Car keys', 'Phone', 1, 3);

-- User 1 hear_inputs entries
INSERT INTO "hear_inputs" ("hear_item_1", "hear_item_2", "hear_item_3", "user_id", "user_event_id")
VALUES 
('Phone ringing', 'Typing', 'Office chatter', 1, 1),
('Beeping machines', 'Quiet whispers', 'Footsteps', 1, 2),
('Market noise', 'Cash register', 'People talking', 1, 3);

-- User 1 smell_inputs entries
INSERT INTO "smell_inputs" ("smell_item_1", "smell_item_2", "user_id", "user_event_id")
VALUES 
('Coffee', 'Printer ink', 1, 1),
('Antiseptic', 'Hospital food', 1, 2),
('Fresh produce', 'Bakery bread', 1, 3);

-- User 1 taste_inputs entries
INSERT INTO "taste_inputs" ("taste_item_1", "user_id", "user_event_id")
VALUES 
('Mint gum', 1, 1),
('Hospital food', 1, 2),
('Apple', 1, 3);


-- User 2 event entries
INSERT INTO "user_event_entries" ("location", "date", "time", "distress_rating", "user_id")
VALUES 
('Work', '2023-08-02', '12:30:00', 6, 2),
('Hospital', '2023-08-03', '17:15:00', 7, 2),
('Crowded Market', '2023-08-04', '10:45:00', 6, 2);

-- User 2 image entries
INSERT INTO "user_images" ("image_url", "user_id", "user_event_id")
VALUES 
('http://example.com/image4.jpg', 2, 4),
('http://example.com/image5.jpg', 2, 5),
('http://example.com/image6.jpg', 2, 6);

-- User 2 see_inputs entries
INSERT INTO "see_inputs" ("see_item_1", "see_item_2", "see_item_3", "see_item_4", "see_item_5", "user_id", "user_event_id")
VALUES 
('Critical email', 'Meeting reminder', 'Full calendar', 'Deadline', 'Empty coffee cup', 2, 4),
('Mom', 'Hospital room', 'Doctors', 'Medications', 'Worrying news', 2, 5),
('Heavy traffic', 'Accident', 'Police', 'Late for work', 'Empty gas tank', 2, 6);

-- User 2 touch_inputs entries
INSERT INTO "touch_inputs" ("touch_item_1", "touch_item_2", "touch_item_3", "touch_item_4", "user_id", "user_event_id")
VALUES 
('Office chair', 'Table surface', 'Pen', 'Notepad', 2, 4),
('Mothers hand', 'Chair arm', 'Hospital blanket', 'Paper tissues', 2, 5),
('Steering wheel', 'Seatbelt', 'Car door', 'Radio knob', 2, 6);

-- User 2 hear_inputs entries
INSERT INTO "hear_inputs" ("hear_item_1", "hear_item_2", "hear_item_3", "user_id", "user_event_id")
VALUES 
('Email notification', 'Meeting discussions', 'Coffee machine', 2, 4),
('Heart monitor', 'Doctor speaking', 'TV news', 2, 5),
('Car horns', 'Radio music', 'Engine humming', 2, 6);

-- User 2 smell_inputs entries
INSERT INTO "smell_inputs" ("smell_item_1", "smell_item_2", "user_id", "user_event_id")
VALUES 
('Colleagues perfume', 'Lunch', 2, 4),
('Sterile gloves', 'Flower bouquet', 2, 5),
('Car freshener', 'Fast food', 2, 6);

-- User 2 taste_inputs entries
INSERT INTO "taste_inputs" ("taste_item_1", "user_id", "user_event_id")
VALUES 
('Black coffee', 2, 4),
('Water', 2, 5),
('Energy drink', 2, 6);


-- User 3 event entries
INSERT INTO "user_event_entries" ("location", "date", "time", "distress_rating", "user_id")
VALUES 
('Work', '2023-08-02', '15:30:00', 7, 3),
('Hospital', '2023-08-03', '18:30:00', 5, 3),
('Crowded Market', '2023-08-04', '11:00:00', 8, 3);

-- User 3 image entries
INSERT INTO "user_images" ("image_url", "user_id", "user_event_id")
VALUES 
('http://example.com/image7.jpg', 3, 7),
('http://example.com/image8.jpg', 3, 8),
('http://example.com/image9.jpg', 3, 9);

-- User 3 see_inputs entries
INSERT INTO "see_inputs" ("see_item_1", "see_item_2", "see_item_3", "see_item_4", "see_item_5", "user_id", "user_event_id")
VALUES 
('Overflowing inbox', 'Unfinished project', 'Clock ticking', 'Empty chair', 'Missed call', 3, 7),
('Dad', 'Hospital corridor', 'Nurses', 'Tests', 'Uncertain results', 3, 8),
('Crowded store', 'Long queue', 'Closed checkout', 'Impatient customers', 'Broken card machine', 3, 9);

-- User 3 touch_inputs entries
INSERT INTO "touch_inputs" ("touch_item_1", "touch_item_2", "touch_item_3", "touch_item_4", "user_id", "user_event_id")
VALUES 
('Keyboard', 'Mouse pad', 'Coffee mug', 'Office phone', 3, 7),
('Fathers shoulder', 'Hospital bed', 'Magazine', 'Cold water bottle', 3, 8),
('Credit card', 'Grocery cart', 'Shopping list', 'Cellphone', 3, 9);

-- User 3 hear_inputs entries
INSERT INTO "hear_inputs" ("hear_item_1", "hear_item_2", "hear_item_3", "user_id", "user_event_id")
VALUES 
('Keyboard clicks', 'Phone conversation', 'Printer noise', 3, 7),
('Hospital PA system', 'Nurse instructions', 'Roommate snoring', 3, 8),
('Checkout beeps', 'Customer complaints', 'Shopping carts', 3, 9);

-- User 3 smell_inputs entries
INSERT INTO "smell_inputs" ("smell_item_1", "smell_item_2", "user_id", "user_event_id")
VALUES 
('New stationery', 'Sandwich', 3, 7),
('Hand sanitizer', 'Body odor', 3, 8),
('Perfume aisle', 'Fresh coffee', 3, 9);

-- User 3 taste_inputs entries
INSERT INTO "taste_inputs" ("taste_item_1", "user_id", "user_event_id")
VALUES 
('Green tea', 3, 7),
('Orange juice', 3, 8),
('Sandwich', 3, 9);