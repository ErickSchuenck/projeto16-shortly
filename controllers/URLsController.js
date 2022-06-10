import { query } from 'express';
import connection from '../db.js'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { nanoid } from 'nanoid'
dotenv.config()

export async function getURLs(req, res) {
  const { id } = req.params;
  try {
    await connection.query(`
    SELECT * FROM urls
    WHERE id = $1
  `), [id]
    res.send(result.rows[0])
  }
  catch (error) {
    res.send(error)
  }
};

export async function getShortenedURLs(req, res) {
  const { shortUrl } = req.params;
  if (!shortUrl) {
    return res.sendStatus(422);
  }

  try {
    let result = await connection.query(`
    SELECT url FROM urls
    WHERE ulrs."shortUrl" = $1
    `, [shortUrl]);

    if (result.rowCount <= 0) {
      return res.status(404);
    }

    await connection.query(`
      UPDATE urls SET visits = visits + 1
      WHERE urls."shortUrl"=$1
    `, shortUrl)

    res.redirect(url.rows[0].url);
  }

  catch (error) {
    res.status(500).send("Something went wrong on getShortenedURLs route")
  }
};

export async function deleteURLs(req, res) {
  const { id } = req.params;
  try {
    const result = await connection.query(`
    SELECT * FROM urls WHERE urls.id=$1;`, [id])

    if (result.rows.length <= 0) {
      res.sendStatus(404)
    }

    await connection.query(`
    DELETE FROM urls WHERE urls.id=$1;`, [id])
    res.sendStatus(204)
  }

  catch (error) {
    res.status(500).send()
  }
}

export async function postShortenURLs(req, res) {
  console.log(111111111111111111111)
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