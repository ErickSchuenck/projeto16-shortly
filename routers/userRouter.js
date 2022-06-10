import express from 'express'
import { getUsers, getUsersRanking } from '../controllers/userControllers.js'
import { authenticateToken } from '../middlewares/tokenAuthenticationMiddleware.js'
import { userMiddleware } from '../middlewares/userMiddleware.js'
const userRoutes = express.Router()

userRoutes.get('/users/:id', authenticateToken, userMiddleware, getUsers)
userRoutes.get('/ranking', getUsersRanking)

export default userRoutes