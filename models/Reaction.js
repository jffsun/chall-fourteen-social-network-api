const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/helper');

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // getter method to format the timestamp on query
        get: formatDate,
      },     
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    },
);

module.exports = reactionSchema; 