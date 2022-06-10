import { query } from 'express';
import connection from '../db.js'


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