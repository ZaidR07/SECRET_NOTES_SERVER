import { PrismaClient } from "@prisma/client";

// Instantiate the Prisma client
const prisma = new PrismaClient();

// Log on client connection (during startup)
prisma.$connect()
  .then(() => {
    console.log('Prisma client connected to the database.');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Log when Prisma client disconnects (during shutdown)
prisma.$disconnect()
  .then(() => {
    console.log('Prisma client disconnected from the database.');
  })
  .catch((err) => {
    console.error('Error disconnecting from the database:', err);
  });

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('Shutting down...');
//   await prisma.$disconnect();
//   console.log('Prisma client disconnected.');
//   process.exit(0);
// });

// Export Prisma client instance
export { prisma };
