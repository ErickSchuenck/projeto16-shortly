import express from 'express'
import { postURLs, getURLs, getShortenedURLs } from '../controllers/URLsController.js'
const URLsRouters = express.Router()

URLsRouters.post('/urls/shorten', postURLs)
URLsRouters.get('/urls/:id', getURLs)
URLsRouters.get('/urls/open/:shortUrl', getShortenedURLs)

export default URLsRouters