const express = require('express');
const router = express.Router();
const {getUsers, getUser, createUsers, updateUser, deleteUser} = require("./../controllers/users.js")


const { protect, authorize} = require("../middlewares/auth.js")


router.get('/', getUsers);
router.get('/:id', protect, getUser);
router.post('/', createUsers);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, authorize("admin", "superadmin"), deleteUser);


module.exports = router