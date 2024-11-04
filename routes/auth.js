async function authRoutes(fastify, options) {
    const db = fastify.mongo.db; // Access the MongoDB instance
    
    fastify.post('/signup', async (request, reply) => {
      const { username, password } = request.body;
      const result = await db.collection('users').insertOne({ username, password });
      reply.send({ message: 'User created', userId: result.insertedId });
    });
  
    fastify.post('/signin', async (request, reply) => {
      const { username, password } = request.body;
      const user = await db.collection('users').findOne({ username, password });
      if (user) {
        reply.send({ message: 'Sign-in successful' });
      } else {
        reply.status(401).send({ message: 'Invalid credentials' });
      }
    });
  }
  
  module.exports = authRoutes;
  