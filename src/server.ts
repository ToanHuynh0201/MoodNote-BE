import dotenv from 'dotenv';
import app from './app';
import { connectDatabase, closeDatabase } from './database';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    console.log('Database connected successfully');

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Handle graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n${signal} received. Closing server gracefully...`);
      server.close(async () => {
        console.log('HTTP server closed');
        try {
          await closeDatabase();
          console.log('Database connection closed');
          process.exit(0);
        } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    return server;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default startServer;
