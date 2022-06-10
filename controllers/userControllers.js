import { query } from 'express';
import connection from '../db.js'

export async function getUsers(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const query = await connection.query(`
            SELECT urls.id, urls."shortUrl", urls.url, urls.visits
            FROM urls
            WHERE urls."userId"=$1;
        `, [id]);
    const { rows } = query;
    const data = { ...user, shortenedUrls: rows };
    res.status(200).send(data);
  }

  catch (error) {
    res.send(error);
  }
};

export async function getUsersRanking(req, res) {
  try {
    const query = await connection.query(`
    SELECT 
    users."id", 
    users.name, 
    COUNT(urls."userId") as "linksCount", 
    COALESCE(SUM(urls.visits),0) as "visitCount"
    FROM users
    LEFT JOIN urls ON users."id" = urls."userId"
    GROUP BY users."id"
    ORDER BY "visitCount" DESC, "linksCount" DESC
    LIMIT 10;
    `);
    const ranking = query.rows;
    res.status(200).send(ranking);
  } catch (error) {
    res.send('Could not connect to database');
  }
};
