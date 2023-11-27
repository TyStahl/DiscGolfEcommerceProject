set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "discs" (
  "discId" serial primary key,
  "price" integer not null,
  "image1Url" text not null, --added for image url
  "name" text not null,
  "brand" text not null,
  "classification" text not null,
  "plastic" text not null,
  "stability" text not null,
  "weight" integer not null,
  "speed" integer not null,
  "glide" integer not null,
  "turn" integer not null,
  "fade" integer not null
  -- primary key ("discId")
);

CREATE TABLE "userCarts" (
  "userCartId" serial,
  "discId" integer not null,
  "userId" integer not null,
  "quantity" integer not null,
  primary key ("userCartId")
  -- foreign key ("userId")
);

CREATE TABLE "users" (
  "userId" serial,
  "username" text not null,
  "hashedPassword" text not null,
  "createdAt" timestamptz not null default now(),
  primary key ("userId"),
  unique ("username")
);

CREATE TABLE "userBags" (
  "userBagId" serial,
  "userId" integer not null,
  "discId" integer not null,
  primary key ("userBagId")
  -- foreign key ("userId")
);

ALTER TABLE "userCarts" ADD FOREIGN KEY ("discId") REFERENCES "discs" ("discId");

ALTER TABLE "userCarts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "userBags" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "userBags" ADD FOREIGN KEY ("discId") REFERENCES "discs" ("discId");
