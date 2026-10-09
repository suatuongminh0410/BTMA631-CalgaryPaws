-- Calgary Paws & Whiskers: 20 fictional rows for every table.
-- Run this ONCE in the Supabase SQL Editor, after 1-create-tables.sql.
-- Every animal and person below is made up. Phone numbers use the 555-01xx range used for fiction.
--
-- If you already ran an older sample-data script and want to start over, run this line first:
-- truncate table medical_records, foster_assignments, animals, fosters restart identity;

insert into animals (name, species, breed, sex, approx_age, colour, drop_off_date, vaccination_status, current_status, notes) values
  ('Bow', 'Dog', 'Labrador mix', 'Female', '2 years', 'Yellow', current_date - 45, 'Up to date', 'At centre', 'Loves swimming. Good with other dogs.'),
  ('Chinook', 'Dog', 'Husky cross', 'Male', '2 years', 'Grey and white', current_date - 30, 'Overdue', 'In foster', 'High energy. Needs a fenced yard.'),
  ('Hoodoo', 'Dog', 'Australian shepherd', 'Male', '4 years', 'Blue merle', current_date - 22, 'Up to date', 'In foster', 'Herds everything, including the family.'),
  ('Poutine', 'Dog', 'Bulldog mix', 'Male', '6 years', 'Fawn and white', current_date - 18, 'Not vaccinated', 'At centre', 'Snores loudly. Gentle with kids.'),
  ('Toonie', 'Dog', 'Beagle', 'Female', '5 years', 'Tricolour', current_date - 14, 'Overdue', 'At centre', 'Follows her nose. Needs a secure leash.'),
  ('Sundance', 'Dog', 'Golden retriever mix', 'Female', '3 years', 'Golden', current_date - 90, 'Up to date', 'Adopted', 'Adopted by a family in Airdrie.'),
  ('Timbit', 'Dog', 'Chihuahua mix', 'Male', '1 year', 'Tan', current_date - 9, 'Unknown', 'In foster', 'Small but bossy. Wears a sweater in winter.'),
  ('Kana', 'Dog', 'Bernese mountain dog mix', 'Female', '9 months', 'Black, white and rust', current_date - 6, 'Not vaccinated', 'At centre', 'Growing fast. Still learning leash manners.'),
  ('Bannock', 'Dog', 'Border collie', 'Male', '7 years', 'Black and white', current_date - 3, 'Unknown', 'At centre', 'Surrendered when his owner moved. Calm and well trained.'),
  ('Saskatoon', 'Dog', 'German shepherd mix', 'Female', '5 years', 'Black and tan', current_date - 70, 'Up to date', 'Adopted', 'Adopted by a couple in Okotoks.'),
  ('Whisper', 'Cat', 'Domestic shorthair', 'Female', '4 years', 'Grey tabby', current_date - 35, 'Up to date', 'In foster', 'Shy at first, then very cuddly.'),
  ('Pickles', 'Cat', 'Domestic longhair', 'Male', '1 year', 'Orange', current_date - 20, 'Overdue', 'At centre', 'Needs a booster shot. Loves boxes.'),
  ('Luna', 'Cat', 'Siamese mix', 'Female', '10 weeks', 'Cream and brown', current_date - 11, 'Not vaccinated', 'In foster', 'Kitten. Bottle fed for the first week.'),
  ('Loonie', 'Cat', 'Domestic shorthair', 'Male', '3 years', 'Black', current_date - 27, 'Up to date', 'At centre', 'Calm lap cat. Fine with dogs.'),
  ('Nanaimo', 'Cat', 'Ragdoll mix', 'Female', '2 years', 'Seal point', current_date - 16, 'Overdue', 'At centre', 'Goes limp when picked up. Needs regular brushing.'),
  ('Toque', 'Cat', 'Maine Coon mix', 'Male', '6 years', 'Brown tabby', current_date - 80, 'Up to date', 'Adopted', 'Adopted by a senior in Kensington.'),
  ('Mittens', 'Cat', 'Domestic shorthair', 'Female', '8 years', 'Tuxedo', current_date - 8, 'Unknown', 'In foster', 'Senior cat on thyroid medication.'),
  ('Cinnamon', 'Cat', 'Burmese mix', 'Male', '5 months', 'Chocolate brown', current_date - 5, 'Not vaccinated', 'In foster', 'Playful kitten. Bonded with Luna.'),
  ('Prairie', 'Cat', 'Domestic shorthair', 'Female', '12 weeks', 'Calico', current_date - 4, 'Unknown', 'At centre', 'Found in a garage in Forest Lawn.'),
  ('Stampy', 'Cat', 'Bengal mix', 'Male', '2 years', 'Spotted gold', current_date - 50, 'Up to date', 'In foster', 'Very active. Needs climbing space.');

insert into fosters (full_name, email, phone, neighbourhood, max_animals, is_active, notes) values
  ('Priya Sandhu', 'priya.sandhu@example.com', '403-555-0101', 'Beltline', 2, true, 'Experienced with large dogs.'),
  ('Marcus Tremblay', 'marcus.tremblay@example.com', '403-555-0102', 'Tuscany', 1, true, null),
  ('Jenna Kowalchuk', 'jenna.kowalchuk@example.com', '403-555-0103', 'Marda Loop', 2, true, 'Has a large fenced yard.'),
  ('Hannah Okafor', 'hannah.okafor@example.com', '403-555-0104', 'Kensington', 3, true, 'Great with kittens and bottle feeding.'),
  ('Tyler Beaumont', 'tyler.beaumont@example.com', '403-555-0105', 'Inglewood', 1, true, 'Small dogs only (condo).'),
  ('Alana Crowchild', 'alana.crowchild@example.com', '403-555-0106', 'Bridgeland', 2, true, 'Comfortable giving medication.'),
  ('Sam Nguyen', 'sam.nguyen@example.com', '403-555-0107', 'Signal Hill', 2, true, null),
  ('Declan Murray', 'declan.murray@example.com', '403-555-0108', 'Mahogany', 2, true, null),
  ('Fatima Rahimi', 'fatima.rahimi@example.com', '403-555-0109', 'Bowness', 1, true, 'Prefers cats.'),
  ('Lucas Bergeron', 'lucas.bergeron@example.com', '403-555-0110', 'Crescent Heights', 2, true, null),
  ('Mei-Ling Chan', 'meiling.chan@example.com', '403-555-0111', 'Sunnyside', 1, true, 'Works from home.'),
  ('Gordon Yellowhorn', 'gordon.yellowhorn@example.com', '403-555-0112', 'Auburn Bay', 3, true, 'Retired. Home all day.'),
  ('Sofia Marchetti', 'sofia.marchetti@example.com', '403-555-0113', 'Altadore', 2, true, null),
  ('Brandon Olsen', 'brandon.olsen@example.com', '403-555-0114', 'Evergreen', 1, false, 'On pause until spring.'),
  ('Keisha Thompson', 'keisha.thompson@example.com', '403-555-0115', 'Cranston', 2, true, 'Has two children.'),
  ('Ivan Petrov', 'ivan.petrov@example.com', '403-555-0116', 'Kingsland', 1, false, 'Travelling until January.'),
  ('Ruth Eklund', 'ruth.eklund@example.com', '403-555-0117', 'Ramsay', 2, true, null),
  ('Nadia Hassan', 'nadia.hassan@example.com', '403-555-0118', 'Varsity', 2, true, 'University student. Evenings and weekends free.'),
  ('Colin MacAskill', 'colin.macaskill@example.com', '403-555-0119', 'Silverado', 1, false, 'Moved out of the city.'),
  ('Tessa Lindqvist', 'tessa.lindqvist@example.com', '403-555-0120', 'Hillhurst', 2, true, null);

insert into foster_assignments (animal_id, foster_id, start_date, end_date, notes) values
  ((select id from animals where name = 'Chinook'), (select id from fosters where full_name = 'Priya Sandhu'), current_date - 28, null, 'Settling in well.'),
  ((select id from animals where name = 'Whisper'), (select id from fosters where full_name = 'Marcus Tremblay'), current_date - 33, null, null),
  ((select id from animals where name = 'Hoodoo'), (select id from fosters where full_name = 'Jenna Kowalchuk'), current_date - 20, null, 'Doing great with the yard.'),
  ((select id from animals where name = 'Luna'), (select id from fosters where full_name = 'Hannah Okafor'), current_date - 10, null, 'Needs feeding every 4 hours.'),
  ((select id from animals where name = 'Cinnamon'), (select id from fosters where full_name = 'Hannah Okafor'), current_date - 4, null, 'Sharing a room with Luna.'),
  ((select id from animals where name = 'Timbit'), (select id from fosters where full_name = 'Tyler Beaumont'), current_date - 8, null, null),
  ((select id from animals where name = 'Mittens'), (select id from fosters where full_name = 'Alana Crowchild'), current_date - 7, null, 'Gets a thyroid pill twice a day.'),
  ((select id from animals where name = 'Stampy'), (select id from fosters where full_name = 'Sam Nguyen'), current_date - 45, null, 'Needs a long-term foster.'),
  ((select id from animals where name = 'Sundance'), (select id from fosters where full_name = 'Declan Murray'), current_date - 88, current_date - 20, 'Fostered until adopted.'),
  ((select id from animals where name = 'Saskatoon'), (select id from fosters where full_name = 'Gordon Yellowhorn'), current_date - 66, current_date - 15, 'Fostered until adopted.'),
  ((select id from animals where name = 'Toque'), (select id from fosters where full_name = 'Fatima Rahimi'), current_date - 75, current_date - 30, 'Fostered until adopted.'),
  ((select id from animals where name = 'Bow'), (select id from fosters where full_name = 'Lucas Bergeron'), current_date - 42, current_date - 35, 'Short stay while the kennel was repaired.'),
  ((select id from animals where name = 'Toonie'), (select id from fosters where full_name = 'Mei-Ling Chan'), current_date - 12, current_date - 6, null),
  ((select id from animals where name = 'Pickles'), (select id from fosters where full_name = 'Sofia Marchetti'), current_date - 18, current_date - 10, 'Returned to the centre for his booster.'),
  ((select id from animals where name = 'Loonie'), (select id from fosters where full_name = 'Brandon Olsen'), current_date - 25, current_date - 17, null),
  ((select id from animals where name = 'Nanaimo'), (select id from fosters where full_name = 'Keisha Thompson'), current_date - 14, current_date - 7, 'Returned to the centre when the foster went on vacation.'),
  ((select id from animals where name = 'Kana'), (select id from fosters where full_name = 'Ivan Petrov'), current_date - 5, current_date - 2, 'Too much energy for the foster''s apartment.'),
  ((select id from animals where name = 'Poutine'), (select id from fosters where full_name = 'Ruth Eklund'), current_date - 16, current_date - 9, null),
  ((select id from animals where name = 'Prairie'), (select id from fosters where full_name = 'Nadia Hassan'), current_date - 3, current_date - 1, 'Weekend foster.'),
  ((select id from animals where name = 'Bannock'), (select id from fosters where full_name = 'Tessa Lindqvist'), current_date - 2, current_date - 1, 'Overnight trial stay.');

insert into medical_records (animal_id, record_type, record_date, description, vet_name, next_due_date) values
  ((select id from animals where name = 'Bow'), 'Vaccination', current_date - 44, 'Rabies and DHPP vaccines', 'Dr. Amara Singh', current_date + 321),
  ((select id from animals where name = 'Chinook'), 'Vaccination', current_date - 300, 'DHPP vaccine (first dose)', 'Dr. Amara Singh', current_date - 10),
  ((select id from animals where name = 'Chinook'), 'Checkup', current_date - 29, 'Intake exam. Healthy, slightly thin.', 'Dr. Amara Singh', null),
  ((select id from animals where name = 'Hoodoo'), 'Surgery', current_date - 20, 'Neuter surgery', 'Dr. Leo Park', null),
  ((select id from animals where name = 'Poutine'), 'Treatment', current_date - 17, 'Antibiotics for an ear infection', 'Dr. Leo Park', current_date - 3),
  ((select id from animals where name = 'Toonie'), 'Vaccination', current_date - 400, 'Rabies vaccine', 'Dr. Rebecca Tran', current_date - 35),
  ((select id from animals where name = 'Sundance'), 'Vaccination', current_date - 89, 'Rabies and DHPP vaccines', 'Dr. Amara Singh', current_date + 276),
  ((select id from animals where name = 'Timbit'), 'Checkup', current_date - 8, 'Dental check. Two loose teeth noted.', 'Dr. Rebecca Tran', current_date + 14),
  ((select id from animals where name = 'Kana'), 'Treatment', current_date - 5, 'Deworming treatment', 'Dr. Leo Park', current_date + 9),
  ((select id from animals where name = 'Whisper'), 'Surgery', current_date - 33, 'Spay surgery', 'Dr. Leo Park', null),
  ((select id from animals where name = 'Pickles'), 'Vaccination', current_date - 380, 'FVRCP vaccine', 'Dr. Amara Singh', current_date - 15),
  ((select id from animals where name = 'Luna'), 'Checkup', current_date - 10, 'Kitten wellness exam. Weight good.', 'Dr. Leo Park', current_date + 4),
  ((select id from animals where name = 'Loonie'), 'Vaccination', current_date - 26, 'FVRCP and rabies vaccines', 'Dr. Rebecca Tran', current_date + 339),
  ((select id from animals where name = 'Nanaimo'), 'Vaccination', current_date - 500, 'FVRCP vaccine', 'Dr. Jonah Whitecalf', current_date - 60),
  ((select id from animals where name = 'Toque'), 'Surgery', current_date - 78, 'Dental cleaning and one extraction', 'Dr. Jonah Whitecalf', null),
  ((select id from animals where name = 'Mittens'), 'Treatment', current_date - 7, 'Started thyroid medication', 'Dr. Rebecca Tran', current_date + 7),
  ((select id from animals where name = 'Cinnamon'), 'Treatment', current_date - 4, 'Flea treatment', 'Dr. Leo Park', current_date + 10),
  ((select id from animals where name = 'Prairie'), 'Checkup', current_date - 3, 'Intake exam. Healthy, a little dehydrated.', 'Dr. Jonah Whitecalf', current_date + 11),
  ((select id from animals where name = 'Stampy'), 'Vaccination', current_date - 48, 'Rabies and FVRCP vaccines', 'Dr. Amara Singh', current_date + 317),
  ((select id from animals where name = 'Saskatoon'), 'Checkup', current_date - 68, 'Intake exam. Healthy and well socialized.', 'Dr. Rebecca Tran', null);
