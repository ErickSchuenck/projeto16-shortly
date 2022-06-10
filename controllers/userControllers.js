import { query } from 'express';
import connection from '../db.js'

export async function getUsers(req, res) {
  const { id } = req.params;
  try {
    await connection.query(
      `
      SELECT id, 
      name,
      FROM users
      `, [id])

  } catch (error) {
    res.send(error)
  }
};

export async function getUsersRanking(req, res) {
};
