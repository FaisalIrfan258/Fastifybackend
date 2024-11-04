require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const authRoutes = require('./routes/auth');
fastify.register(authRoutes);

// MongoDB Connection
fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.MONGODB_URI,
});

// Add a default route to check if server is live
fastify.get('/', async (request, reply) => {
  return { message: "Server is live!" };
});

fastify.listen({ port: process.env.PORT || 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
