import express from 'express'
import { postSignUp, postSignIn, postShortenURLs } from '../controllers/sessionControllers.js'
const sessionRouters = express.Router()

sessionRouters.post('/signup', postSignUp)
sessionRouters.post('/signin', postSignIn)
sessionRouters.post('/urls/shorten', postShortenURLs)

export default sessionRouters