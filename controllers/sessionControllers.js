import { query } from 'express';
import connection from '../db.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import chalk from 'chalk';
dotenv.config()

export async function postSignUp(req, res) {
  const { name, email, password
  } = req.body;
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
  const user = req.body.email;
  const accessToken = jwt.sign(user, "" + process.env.ACCESS_TOKEN_SECRET)
  return res.json({ accessToken: accessToken })
};

export async function postShortenURLs(req, res) {
};