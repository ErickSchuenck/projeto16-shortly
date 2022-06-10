import express from 'express'
import { postSignUp, postSignIn, postShortenURLs } from '../controllers/sessionControllers.js'
import { signUpMiddleware, signInMiddleware } from '../middlewares/sessionMiddleware.js'

const sessionRouters = express.Router()

sessionRouters.post('/signup', signUpMiddleware, postSignUp)
sessionRouters.post('/signin', signInMiddleware, postSignIn)
sessionRouters.post('/urls/shorten', postShortenURLs)

export default sessionRouters