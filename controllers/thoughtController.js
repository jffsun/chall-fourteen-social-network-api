const { User, Thought } = require('../models');

module.exports = {

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get one thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })

      // versionKey of document
      .select('-__v')
      .then(async (thought) =>

        // If thought cannot be found send 404 status error
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a thought and pushes new thought to associated user thoughts array
  createThought(req, res) {
  Thought.create(req.body)  
    .then((thought) => 

      // Find user by username
      User.findOneAndUpdate(
        { username: req.body.username },

        // Push new thought's id to user's thoughts array
        { $push: { thoughts: thought._id } },

        // Return update user
        { new: true }
        )
    )
    .then((user) =>
     !user
      ? res.status(404).json({
        message: 'Thought created, but no user found',
      })
    : res.json({ message: 'Thought successfully added' })    
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      
      // $set operator replaces previous value with the specified value in request body
      { $set: req.body },
      
      // Updated thought is returned
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : res.status(200).json({ message: 'Thought deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      
      // Push reaction from request body to reactions array 
      { $push: { reactions: req.body } },

      // Return updated thought
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      
      // Removes thought's id from thought's reactions array
      { $pull: { reactions: { reactionId: req.body.reactionId } } },

      // Return updated thought
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
