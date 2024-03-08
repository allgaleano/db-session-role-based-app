import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';

const databaseUrl = process.env.DATABASE_URL;

export const createSession = async (userId: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);
  
  const token = uuidv4();
  try {
    await sql`
      INSERT INTO sessions (userid, sessiontoken, expires)
      VALUES (
        ${userId},
        ${token},
        ${new Date(Date.now() + 1000 * 60 * 60 * 1)});`; // 1 minute
    
    const session = await sql`
      SELECT * 
      FROM sessions 
      WHERE sessiontoken = ${token}
      LIMIT 1;
    `    
    return session[0];
  } catch (error) {
    console.log('error',error);
    return null;
  }
}

export const getSessionByToken = async (token: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);
  
  try {
    const session = await sql`
      SELECT * 
      FROM sessions 
      WHERE sessiontoken = ${token}
      LIMIT 1;`;
    
    return session[0];
  } catch (error) {
    console.log('error',error);
    return null;
  }
}

export const getSessionByUserId = async (userId: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    const session = await sql`
      SELECT * 
      FROM sessions 
      WHERE userid = ${userId}
      LIMIT 1;`;
    
    return session[0];
  } catch (error) {
    return null;
  }
}

export const updateSessionByUserId = async (userId: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);
  try {
    await sql`
      UPDATE sessions 
      SET expires = ${new Date(Date.now() + 1000 * 60 * 60 * 1)} 
      WHERE userid = ${userId};`;                         // 1 minute session
    
    const session = await sql`
      SELECT * 
      FROM sessions 
      WHERE userid = ${userId}
      LIMIT 1;    
    `
    return session[0];
  } catch (error) {
    console.log('error',error);
    return null;
  }
}

export const deleteSessionByToken = async (token: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);
  try {
    const result = await sql`
      DELETE FROM sessions 
      WHERE sessiontoken = ${token};
    `
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}