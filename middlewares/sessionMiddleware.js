import joi from 'joi'
import connection from '../db.js'

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().min(3).required().email(),
  password: joi.string().required(),
  confirmPassword: joi.ref('password')
});

export async function signUpMiddleware(req, res, next) {
  const validation = schema.validate(req.body)

  if (validation.error) {
    console.log('Password and confirm password mismatch')
    return res.sendStatus(422);
  }

  try {
    const result = await connection.query(`
        SELECT *
        FROM users
        WHERE email= $1;`, [req.body.email]
    );

    if (result.rows.length > 0) {
      return res.sendStatus(409);
    }
    next();
  }

  catch (error) {
    res.send(error);
  }
};

export async function signInMiddleware(req, res, next) {

}
