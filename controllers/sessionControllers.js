import { query } from 'express';
import connection from '../db.js'

export async function postSignUp(req, res) {
  const { name, email, password, confirmPassword
  } = req.body;
  console.log(name, email, password)
  try {
    await connection.query(
      `
      INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
      `, [name, email, password]
    )
    res.sendStatus(201)
  } catch (error) {
    res.send(error)
  }
};

export async function postSignIn(req, res) {

};

export async function postShortenURLs(req, res) {
};