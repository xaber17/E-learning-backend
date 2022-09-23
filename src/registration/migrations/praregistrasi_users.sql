DROP TABLE IF EXISTS "public"."pre_registration_users";
-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Squences
CREATE SEQUENCE IF NOT EXISTS pre_registration_user_id_seq;

-- Table Definition
CREATE TABLE "public"."pre_registration_users" (
    "id" int4 NOT NULL DEFAULT nextval('pre_registration_user_id_seq'::regclass),
    "fullname" varchar(25),
    "place_of_birth" varchar(50),
    "date_of_birth" timestamptz,
    "first_telephone_number" varchar(20),
    "email" varchar(25),
    "ref_id" int4 NULL,
    "province_id" int4 NULL,
    "region_id" int4 NULL,
    "district_id" int4 NULL,
    "sub_district_id" int4 NULL,
    "address" varchar(200),
    "rt" varchar(5),
    "rw" varchar(5),
    "photo_doc" varchar(150),
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    "created_by" varchar(45) DEFAULT 'system'::character varying,
    "updated_by" varchar(45),
    "status" varchar(20) DEFAULT 'waiting_for_review'::character varying,
);


