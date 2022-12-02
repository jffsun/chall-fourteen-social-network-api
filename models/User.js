const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        // Removes whitespace before and after string
        trim: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        // Regex expression to validate input matches email address format
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      },
      // Array of id values from Thought model
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],   
      // Array of id values from User model (self reference)
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],        
    },
    {
      toJSON: {
        virtuals: true,
      },
    id: false,
    },
);

// Virtual property `friendCount` that retrieves the length of this user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;