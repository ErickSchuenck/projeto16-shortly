import express from 'express'
import { getURLs, getShortenedURLs } from '../controllers/URLsController.js'
const URLsRouters = express.Router()

URLsRouters.get('/urls/:id', getURLs)
URLsRouters.get('/urls/open/:shortUrl', getShortenedURLs)

export default URLsRouters