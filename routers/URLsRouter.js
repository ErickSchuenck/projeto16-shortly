import express from 'express'
import { getURLs, getShortenedURLs, deleteURLs } from '../controllers/URLsController.js'
const URLsRouters = express.Router()

URLsRouters.get('/urls/:id', getURLs)
URLsRouters.get('/urls/open/:shortUrl', getShortenedURLs)
URLsRouters.delete('/urls/:id', deleteURLs)

export default URLsRouters