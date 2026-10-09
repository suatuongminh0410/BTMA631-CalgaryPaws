-- Calgary Paws & Whiskers: create the four tables.
-- Run this ONCE in the Supabase SQL Editor.

create table animals (
  id                 bigint generated always as identity primary key,
  name               text not null,
  species            text not null check (species in ('Dog', 'Cat')),
  breed              text,
  sex                text not null default 'Unknown' check (sex in ('Female', 'Male', 'Unknown')),
  approx_age         text,
  colour             text,
  drop_off_date      date not null default current_date,
  vaccination_status text not null default 'Unknown'
                     check (vaccination_status in ('Up to date', 'Overdue', 'Not vaccinated', 'Unknown')),
  current_status     text not null default 'At centre'
                     check (current_status in ('At centre', 'In foster', 'Adopted')),
  notes              text,
  created_at         timestamptz not null default now()
);

create table fosters (
  id            bigint generated always as identity primary key,
  full_name     text not null,
  email         text,
  phone         text,
  neighbourhood text,
  max_animals   integer not null default 1 check (max_animals >= 1),
  is_active     boolean not null default true,
  notes         text,
  created_at    timestamptz not null default now()
);

-- Links an animal to a foster for a period of time.
-- Deleting an animal deletes its assignments; a foster with assignments cannot be deleted.
create table foster_assignments (
  id         bigint generated always as identity primary key,
  animal_id  bigint not null references animals (id) on delete cascade,
  foster_id  bigint not null references fosters (id) on delete restrict,
  start_date date not null default current_date,
  end_date   date,
  notes      text,
  created_at timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);

create table medical_records (
  id            bigint generated always as identity primary key,
  animal_id     bigint not null references animals (id) on delete cascade,
  record_type   text not null check (record_type in ('Vaccination', 'Checkup', 'Surgery', 'Treatment', 'Other')),
  record_date   date not null default current_date,
  description   text not null,
  vet_name      text,
  next_due_date date,
  created_at    timestamptz not null default now()
);

create index on foster_assignments (animal_id);
create index on foster_assignments (foster_id);
create index on medical_records (animal_id);

-- Security: block Supabase's public "anon" web API from reading or changing these tables.
-- Our website talks to the database directly through a secure connection, so it is unaffected.
alter table animals            enable row level security;
alter table fosters            enable row level security;
alter table foster_assignments enable row level security;
alter table medical_records    enable row level security;
