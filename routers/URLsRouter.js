import express from 'express'
import { getURLs, getShortenedURLs, deleteURLs, postShortenURLs } from '../controllers/URLsController.js'
import { autenticateToken } from '../middlewares/tokenAuthenticationMiddleware.js'
const URLsRouters = express.Router()

URLsRouters.get('/urls/:id', getURLs)
URLsRouters.get('/urls/open/:shortUrl', getShortenedURLs)
URLsRouters.delete('/urls/:id', deleteURLs)
URLsRouters.post('/urls/shorten', autenticateToken, postShortenURLs)

export default URLsRouters