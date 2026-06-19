import express from "express";
import {getDB} from "./db.js";

async function manageDatabase(){
    try{
        //await database initialization and pool retrieval
        const db=await getDB();

        //creating table insie the now guaranteed available database
        await db.query(`CREATE TABLE IF NOT EXISTS users(
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            user_name VARCHAR(60) NOT NULL,
            user_email VARCHAR(100) UNIQUE NOT NULL,
            user_password VARCHAR(16) NOT NULL,
            user_address VARCHAR(400),
            user_role VARCHAR(20) NOT NULL)`);
            console.log("Database and table successfully created")
    }
    catch(error)
    {
        console.log("DATABASE operation error:",error.message)
    }
}

manageDatabase();