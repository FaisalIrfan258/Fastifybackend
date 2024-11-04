const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authRoutes(fastify, options) {
  const db = fastify.mongo.db;
  const user = new User(db);

  // Signup Route
  fastify.post('/signup', async (request, reply) => {
    const { email, password } = request.body;

    const existingUser = await user.findByEmail(email);
    if (existingUser) {
      return reply.status(400).send({ error: 'User already exists' });
    }

    await user.createUser(email, password);
    return reply.send({ message: 'User registered successfully' });
  });

  // Signin Route
  fastify.post('/signin', async (request, reply) => {
    const { email, password } = request.body;
    const foundUser = await user.findByEmail(email);

    if (!foundUser || !(await user.validatePassword(password, foundUser.password))) {
      return reply.status(400).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return reply.send({ token });
  });
}

module.exports = authRoutes;
