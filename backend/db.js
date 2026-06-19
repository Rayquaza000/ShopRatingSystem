import mysql from "mysql2/promise";
import "dotenv/config";

let pool;

async function initializeDatabase(){
    //connect to mysql instance without a specific database
    const connection=await mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD

    });

    //create database if it is missing
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.end();

    //initialize permanent application connection pool
    pool=mysql.createPool({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0
    });
}

export async function getDB(){
    if(!pool){
        await initializeDatabase();
    }
    return pool;
}