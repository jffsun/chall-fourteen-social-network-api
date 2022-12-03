const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users with mongoose's find method
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get one user with mongoose's find method
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })

      // VersionKey of document
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

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.studentId })
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

  // // Add an assignment to a student
  // addAssignment(req, res) {
  //   console.log('You are adding an assignment');
  //   console.log(req.body);
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $addToSet: { assignments: req.body } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
  // // Remove assignment from a student
  // removeAssignment(req, res) {
  //   Student.findOneAndUpdate(
  //     { _id: req.params.studentId },
  //     { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
  //     { runValidators: true, new: true }
  //   )
  //     .then((student) =>
  //       !student
  //         ? res
  //             .status(404)
  //             .json({ message: 'No student found with that ID :(' })
  //         : res.json(student)
  //     )
  //     .catch((err) => res.status(500).json(err));
  // },
};
