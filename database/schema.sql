set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "discs" (
  "discId" serial,
  "price" integer not null,
  "name" text not null,
  "brand" text not null,
  "classification" text not null,
  "plastic" text not null,
  "stability" text not null,
  "weight" integer not null,
  "speed" integer not null,
  "glide" integer not null,
  "turn" integer not null,
  "fade" integer not null,
  primary key ("discId")
);

CREATE TABLE "userCarts" (
  "userCartId" serial,
  "discId" integer not null,
  "userId" integer not null,
  "quantity" integer not null,
  primary key ("userCartId")
);

CREATE TABLE "users" (
  "userId" serial,
  "username" text not null,
  "createdAt" timestamptz not null,
  primary key ("userId")
);

CREATE TABLE "userBags" (
  "userBagId" serial,
  "userId" integer not null,
  "discId" integer not null,
  primary key ("userBagId")
);

ALTER TABLE "userCarts" ADD FOREIGN KEY ("discId") REFERENCES "discs" ("discId");

ALTER TABLE "userCarts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "userBags" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "userBags" ADD FOREIGN KEY ("discId") REFERENCES "discs" ("discId");
