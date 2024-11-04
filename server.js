require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const authRoutes = require('./routes/auth');

// MongoDB Connection
fastify.register(require('@fastify/mongodb'), {
  forceClose: true,
  url: process.env.MONGODB_URI,
});

// Register routes after MongoDB connection
fastify.after(() => {
  fastify.register(authRoutes);
});

// Listen on the port specified in the environment variable
fastify.listen({ port: Number(process.env.PORT), host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on ${address}`);
});
