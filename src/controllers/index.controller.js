import { pool } from "../db.js"

export const pong = async(req,res)=>{
    const [result] = await pool.query('Select "pong:" As result')
    res.json(result[0])
}