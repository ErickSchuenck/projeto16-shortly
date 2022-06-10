import connection from '../db.js'

export async function userMiddleware(req, res, next) {
  const { id } = req.params;
  try {
    const result = await connection.query(`
            SELECT users.id, users.name, 
            COALESCE(SUM(urls.visits),0) as "visitCount" 
            FROM users
            LEFT JOIN urls ON users.id = urls."userId"
            WHERE users.id=$1 
            GROUP BY users.id;
        `, [id]);
    const { rows } = result;

    if (rows.length === 0) {
      return res.sendStatus(404);
    };

    res.locals.user = rows[0];
    next();
  } catch (e) {
    res.send(e);
  };
};