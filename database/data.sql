-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "discs"
  ("price", "name", "brand", "classification", "plastic", "stability", "weight", "speed", "glide", "turn", "fade")
  values
  (19.99, 'destroyer', 'innova', 'distance driver', 'star', 'overstable', '174', 12, 5, -1, 3),
  (19.99, 'mamba', 'innova', 'distance driver', 'champion', 'very understable', '174', 11, 6, -5, 1),
  (19.99, 'thunderbird', 'innova', 'fairway driver', 'champion', 'overstable', '174', 9, 5, 0, 2),
  (19.99, 'firebird', 'innova', 'fairway driver', 'champion', 'very overstable', '174', 9, 3, 0, 4),
  (19.99, 'sidewinder', 'innova', 'fairway driver', 'champion', 'understable', '174', 9, 5, -3, 1),
  (19.99, 'roc3', 'innova', 'midrange', 'champion', 'overstable', '174', 9, 5, 0, 2),
  (19.99, 'mako3', 'innova', 'midrange', 'star', 'stable', '174', 5, 5, 0, 0),
  (19.99, 'aviar', 'innova', 'putter', 'champion', 'overstable', '174', 2, 3, 0, 1);

insert into "users"
("username", "hashedPassword")
values
('default', '$argon2id$v=19$m=4096,t=3,p=1$41QOWyBIObUzzILOc1fgNQ$Hbeh3KlJ+XNvfvH2h+4QzYHR5L9aUMdkrgFOhdByuQ0');
