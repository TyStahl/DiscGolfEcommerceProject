/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import argon2 from 'argon2';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import {
  ClientError,
  authMiddleware,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';
// import { nextTick } from 'node:process';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

type Disc = {
  discId: number;
  price: number;
  image1Url: string;
  name: string;
  brand: string;
  classification: string;
  plastic: string;
  stability: string;
  weight: number;
  speed: number;
  glide: number;
  turn: number;
  fade: number;
};

app.get('/api/discs', async (req, res, next) => {
  try {
    const sql = `
    select *
    from "discs"
    `;
    const result = await db.query<Disc>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/discs/:discId', async (req, res, next) => {
  try {
    const discId = Number(req.params.discId);
    if (!discId) {
      throw new ClientError(400, 'discId must be a positive integer');
    }
    const sql = `
      select *
        from "discs"
        where "discId" = $1
    `;
    const params = [discId];
    const result = await db.query<Disc>(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `cannot find disc with discId ${discId}`);
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};

type Auth = {
  username: string;
  password: string;
};

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning *
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'username and password are required fields');
    }
    const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.get('/api/cart', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    select *
    from "userCarts"
    join "discs" using ("discId")
    where "userId" = $1
    `;
    const params = [req.user?.userId];
    const result = await db.query<Disc>(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

type CartItem = {
  discId: number;
  quantity: number;
};

app.post('/api/cart', authMiddleware, async (req, res, next) => {
  try {
    const { discId, quantity = 1 } = req.body as Partial<CartItem>;
    if (!discId || !quantity) {
      throw new ClientError(401, 'nothing to add');
    }

    const sql = `
    insert into "userCarts" ("discId", "quantity", "userId")
    values ($1, $2, $3)
    returning *
    `;
    const params = [discId, quantity, req.user?.userId];
    const result = await db.query<CartItem>(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// endpoint for changing quantity of item in cart
app.put('/api/cart', authMiddleware, async (req, res, next) => {
  try {
    const { discId, quantity } = req.body as Partial<CartItem>;
    if (!discId || !quantity) {
      throw new ClientError(400, 'nothing to add');
    }
    const sql = `
    UPDATE "userCarts"
    SET "quantity" = $1
    WHERE "discId" = $2 and "userId" = $3
    returning *
    `;
    const params = [quantity, discId, req.user?.userId];
    const result = await db.query<CartItem>(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/cart', authMiddleware, async (req, res, next) => {
  try {
    const { discId } = req.body as Partial<CartItem>;
    if (!discId) {
      throw new ClientError(400, 'nothing to add');
    }
    const sql = `
    DELETE from "userCarts"
    WHERE "discId" = $1 and "userId" = $2
    returning *
    `;
    const params = [discId, req.user?.userId];
    const result = await db.query<CartItem>(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/cart/all', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    DELETE from "userCarts"
    WHERE "userId" = $1
    returning *
    `;
    const params = [req.user?.userId];
    const result = await db.query<CartItem>(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/bag', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
    select *
    from "userBags"
    join "discs" using ("discId")
    where "userId" = $1
    `;
    const params = [req.user?.userId];
    const result = await db.query<Disc>(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/bag', authMiddleware, async (req, res, next) => {
  try {
    const { discId } = req.body as Partial<Disc>;
    if (!discId) {
      throw new ClientError(401, 'nothing to add');
    }
    const sql = `
    insert into "userBags" ("discId", "userId")
    values ($1, $2)
    returning *
    `;
    const params = [discId, req.user?.userId];
    const result = await db.query<Disc>(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/bag', authMiddleware, async (req, res, next) => {
  try {
    const { discId } = req.body as Partial<Disc>;
    if (!discId) {
      throw new ClientError(400, 'nothing to add');
    }
    const sql = `
    DELETE from "userBags"
    WHERE "discId" = $1 and "userId" = $2
    returning *
    `;
    const params = [discId, req.user?.userId];
    const result = await db.query<Disc>(sql, params);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
