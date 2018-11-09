const User = require('./userModels/user.server.model');

module.exports = {
  User: User.model,
  UserSchema: User.schema
}
