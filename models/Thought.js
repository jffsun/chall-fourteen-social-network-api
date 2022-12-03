const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/helper');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        // Thought must be between 1 and 280 characters
        maxlength: 280,
        minlength: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // getter method to format the timestamp on query
        get: formatDate
      },     
      username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
      },
      id: true,
    },
);

// Virtual property `reactionCount` that retrieves the length of this user's friends array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought; 