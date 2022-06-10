import { query } from 'express';
import connection from '../db.js'
import dotenv from "dotenv";
import { nanoid } from 'nanoid'
dotenv.config()

export async function getURLs(req, res) {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(404)
  }

  try {
    const result = await connection.query(`
    SELECT id, "shortUrl", url
    FROM urls
    WHERE id = $1;
  `, [id])
    res.send(result.rows[0])
  }
  catch (error) {
    res.status(404).send(error)
  }
};

export async function getShortenedURLs(req, res) {
  const { shortUrl } = req.params;
  console.log(shortUrl)

  if (!shortUrl) {
    return res.sendStatus(422);
  }

  try {
    let result = await connection.query(`
    SELECT url, visits FROM urls
    WHERE "shortUrl" = $1
    `, [shortUrl]);

    if (result.rowCount <= 0) {
      return res.status(404);
    }

    let visits = result.rows[0].visits + 1

    console.log(result.rows)

    await connection.query(`
      UPDATE urls SET visits = $1
      WHERE urls."shortUrl"=$2
    `, [visits, shortUrl])

    res.redirect(result.rows[0].url);
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
  const userId = res.locals.userId;
  const { url } = req.body;
  const shortUrl = nanoid(8);
  try {
    await connection.query(`
            INSERT INTO urls
            (url, "shortUrl", "userId")
            VALUES ($1, $2, $3) 
        `, [url, shortUrl, userId]);
    res.status(201).send(shortUrl);
  } catch (error) {
    res.send(error)
  }
};