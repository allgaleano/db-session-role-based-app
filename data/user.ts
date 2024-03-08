import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

export const dynamic = 'force-dynamic';

export const updateUserRoleById = async (userId: string, role: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    await sql`
      UPDATE users
      SET role = ${role}
      WHERE id = ${userId};`;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getUserByToken = async (sessionToken: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    const user = await sql`
      SELECT U.id AS id,
              U.username AS username,
              U.email AS email,
              U.role AS role
      FROM Sessions S
      INNER JOIN Users U ON S.userid = U.id
      WHERE S.sessiontoken = ${sessionToken};
      `;

    return user[0];
  } catch (error) {
    return null;
  }
}

export const getUserRoleByToken = async (sessionToken: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    const userRole = await sql`
      SELECT U.role AS role,
              U.id AS id
      FROM Sessions S
      INNER JOIN Users U ON S.userid = U.id
      WHERE S.sessiontoken = ${sessionToken};
      `;

    return userRole[0];
  } catch (error) {
    return null;
  }
}


export const createUser = async (username: string, email: string, password: string) => {
  console.log(databaseUrl);
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    const user = await sql`
      INSERT INTO users (username, email, password)
      VALUES (
        ${username},
        ${email},
        ${password});`;
    
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export const getUserByEmail = async (email: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    const user = await sql`
      SELECT * 
      FROM users 
      WHERE email = ${email}
      LIMIT 1;`;

    return user[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getAllUsers = async () => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    const users = await sql`
      SELECT * FROM users
    ;`;
    return users;
  } catch (error) {
    return null;
  }
}

export const deleteUserById = async (id: string) => {
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined.");
    return null;
  }
  const sql = neon(databaseUrl);

  try {
    
    await sql`
      DELETE FROM users 
      WHERE id = ${id};`;

    return true;
  } catch (error) {
    return false;
  }
}