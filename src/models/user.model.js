const mongoose = require('mongoose');

/**
 * UserSchema
 *
 * mongoose schema
 *
 * A schema defining how the user should look.
 */
const UserSchema = new mongoose.Schema({
  /**
   * name
   *
   * string
   *
   * The name of the user (inherited from the mentor)
   */
  name: {
    type: String,
    required: true,
  },

  /**
   * email
   *
   * string
   *
   * An email that the user has saved to their account.
   */
  email: {
    type: String,
    required: true,
  },

  /**
   * passwordHash
   *
   * string
   *
   * A string (hash) of their password used to authenticate.
   */
  passwordHash: {
    type: String,
    required: true,
  },

  /**
   * mentor
   *
   * ObjectId ref
   *
   * A reference to a mentor in which the user has created their account from.
   */
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  UserSchema,
  UserModel,
};
