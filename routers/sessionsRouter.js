import express from 'express'
import { postSignUp, postSignIn, postShortenURLs } from '../controllers/sessionControllers.js'
import { signUpMiddleware, signInMiddleware } from '../middlewares/sessionMiddleware.js'
import { autenticateToken } from '../middlewares/tokenAuthenticationMiddleware.js'

const sessionRouters = express.Router()

sessionRouters.post('/signup', signUpMiddleware, postSignUp)
sessionRouters.post('/signin', signInMiddleware, postSignIn)
sessionRouters.post('/urls/shorten', autenticateToken, postShortenURLs)

export default sessionRouters