import { query } from 'express';
import connection from '../db.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { nanoid } from 'nanoid'
dotenv.config()

export async function postSignUp(req, res) {
  const { name, email, password } = req.body;
  let hashedPassword = bcrypt.hashSync(password, 10)

  try {
    await connection.query(
      `
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
      `, [name, email, hashedPassword]
    )
    res.sendStatus(201)
  } catch (error) {
    res.send(error)
  }
};

export async function postSignIn(req, res) {
  const { id } = res.locals.user;
  const accessToken = jwt.sign(id, "" + process.env.ACCESS_TOKEN_SECRET)
  return res.json({ accessToken: accessToken })
};

export async function postShortenURLs(req, res) {
  const userId = res.locals.userId;
  const { url } = req.body;
  const shortUrl = nanoid(8);
  try {
    await connectionSQL.query(`
            INSERT INTO urls
            (url, "shortUrl", "userId")
            VALUES ($1, $2, $3) 
        `, [url, shortUrl, userId]);
    res.status(201).send(shortUrl);
  } catch (error) {
    res.send(error)
  }
};