import pool from '../config/database';

export const connectDatabase = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    console.log('Database connection test successful');
    client.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export const closeDatabase = async (): Promise<void> => {
  try {
    await pool.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};

export { pool };
