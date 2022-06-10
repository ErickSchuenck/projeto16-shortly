import joi from 'joi'
import connection from '../db.js'
import bcrypt from "bcrypt";

const signupSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().min(3).required().email(),
  password: joi.string().required(),
  confirmPassword: joi.ref('password')
});

const signinSchema = joi.object({
  email: joi.string().min(3).required().email(),
  password: joi.string().required()
});

export async function signUpMiddleware(req, res, next) {

  const validation = signInSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    console.log('Password and confirm password mismatch')
    const errorArr = validation.error.details;
    return res.status(422).send(errorArr.map((e) => { return e.message }));
  };


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
  const validation = signinSchema.validate(req.body)
  const { email, password } = req.body;
  if (validation.error) {
    console.log('Ops! Something looks wrong here...')
    return res.sendStatus(422);
  }
  try {
    const result = await connection.query(`
      SELECT * FROM users 
      WHERE email = $1;
    `, [email]
    );
    const dataVerification = bcrypt.compareSync(password, result.rows[0].password)

    if (!dataVerification) {
      return res.sendStatus(401);
    }
    if (dataVerification) {
      next()
    }
  }
  catch (error) {
    res.send(error)
  }
}
