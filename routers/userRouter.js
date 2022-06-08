import express from 'express'
import { getUsers, getUsersRanking } from '../controllers/userControllers.js'
const userRoutes = express.Router()

userRoutes.get('/users/:id', getUsers)
userRoutes.get('/users/ranking', getUsersRanking)

export default userRoutes