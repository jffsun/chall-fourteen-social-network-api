const { User, } = require('../models');

module.exports = {

  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })

      // versionKey of document
      .select('-__v')
      .then(async (user) =>

        // If user cannot be found send 404 status error
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)
      });
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      
      // $set operator replaces previous value with the specified value
      { $set: req.body },
      
      // Updated user must still meet field requirements and return the updated document
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.status(200).json({ message: 'User deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

   // Add a friend to user's friend list by id
   addFriend(req, res) {
    User.findOneAndUpdate(
      
      // Find user by id in request parameters
      { _id: req.params.userId },

      // Append friend's id to user's friends array 
      { $push: { friends: req.params.friendId } },

      // Return updated user
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No student found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove friend from a user's friends list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      
      // Removes friend's id from the user's friends array 
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
