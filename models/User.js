const { Schema, Types } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            // Removes whitespace before and after string
            trim: true,
            unique: true
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
                ref: 'User'
            },
        ],        
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `commentCount` that gets the amount of comments per user
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });
