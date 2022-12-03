const router = require('express').Router();

// Controller functions for our User CRUD requests
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
} = require('../../controllers/userController');

// '/api/users' endpoint
router.route('/').get(getUsers).post(createUser);


// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
