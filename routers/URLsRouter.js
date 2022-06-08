import express from 'express'
import { postURLs, getURLs, getShortenURLs } from '../controllers/userControllers.js'
const URLsRouters = express.Router()

URLsRouters.post('/urls/shorten', postURLs)
URLsRouters.get('/urls/:id', getURLs)
URLsRouters.get('/urls/open/:shortUrl', getShortenURLs)

export default userRoutes