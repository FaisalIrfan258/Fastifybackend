const bcrypt = require('bcryptjs');

module.exports = class User {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.collection.insertOne({
      email,
      password: hashedPassword,
    });
    return result;
  }

  async findByEmail(email) {
    return this.collection.findOne({ email });
  }

  async validatePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
};
