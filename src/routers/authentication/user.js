const express = require('express');
const {createUser, getUsers, getUser, deleteUser, updateUser, loginUser} = require('../../controllers/authentication/user');
const router = express.Router();

router.post('/create', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);

router.delete('/:id', deleteUser);
router.delete('/', deleteUser);
router.patch('/:id', updateUser);

// Route for user login (added here)
router.post('/login', loginUser); 

module.exports = router;