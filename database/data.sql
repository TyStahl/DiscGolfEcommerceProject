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
("price", "image1Url", "name", "brand", "classification", "plastic", "stability", "weight", "speed", "glide", "turn", "fade")
values
  (20.00, '/images/destroyer-star-blue.webp', 'destroyer', 'innova', 'distance driver', 'star', 'overstable', '174', 12, 5, -1, 3),
  (20.00, '/images/mamba-champion-red.webp', 'mamba', 'innova', 'distance driver', 'champion', 'very understable', '174', 11, 6, -5, 1),
  (20.00, '/images/thunderbird-champion-blue.webp', 'thunderbird', 'innova', 'fairway driver', 'champion', 'overstable', '174', 9, 5, 0, 2),
  (20.00, '/images/firebird-champion-yellow.webp', 'firebird', 'innova', 'fairway driver', 'champion', 'very overstable', '174', 9, 3, 0, 4),
  (20.00, '/images/sidewinder-champion-yellow.webp', 'sidewinder', 'innova', 'fairway driver', 'champion', 'understable', '174', 9, 5, -3, 1),
  (20.00, '/images/roc3-champion-green.webp', 'roc3', 'innova', 'midrange', 'champion', 'overstable', '174', 9, 5, 0, 2),
  (20.00, '/images/mako3-star-orange.webp', 'mako3', 'innova', 'midrange', 'star', 'stable', '174', 5, 5, 0, 0),
  (20.00, '/images/aviar-star-red.jpg', 'aviar', 'innova', 'putter', 'star', 'overstable', '174', 2, 3, 0, 1),
  (20.00, '/images/leopard3-halo-orange.jpg' ,'leopard3', 'innova', 'fairway driver', 'halo', 'understable', '174', 7, 5, -2, 1),
  (20.00, '/images/wraith-star-pink.webp', 'waith', 'innova', 'distane driver', 'star', 'stable', '174', 11, 5, -1, 3),
  (20.00, '/images/tern-halo-red.webp', 'tern', 'innova', 'distane driver', 'halo', 'understable', '174', 12, 6, -3, 2),
  (20.00, '/images/boss-champion-pink.webp', 'boss', 'innova', 'distane driver', 'champion', 'overstable', '174', 13, 5, 0, 3),
  (100.00, '/images/drone-esp-orange.jpg', 'drone', 'discraft', 'midrange', 'esp', 'very overstable', '180', 5, 3, -1, 4),
  (20.00, '/images/buzz-esp-blue.jpg', 'buzz', 'discraft', 'midrange', 'esp', 'stable', '180', 5, 4, -1, 1);








insert into "users"
("username", "hashedPassword")
values
('default', '$argon2id$v=19$m=4096,t=3,p=1$41QOWyBIObUzzILOc1fgNQ$Hbeh3KlJ+XNvfvH2h+4QzYHR5L9aUMdkrgFOhdByuQ0');
