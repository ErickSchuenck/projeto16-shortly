import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function authenticateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '').trim();
  const key = process.env.ACCESS_TOKEN_SECRET;

  jwt.verify(token, key, (err, result) => {
    if (err) return res.status(401).send({ err: err });

    if (result) {
      res.locals.userId = result;
      next();
    }
  });
};
