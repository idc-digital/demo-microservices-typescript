const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');


router.use(express.json());
router.use(bodyParser.json());

const {
  getAllUsers,
  getUsersById,
  createNewUser,
  updateUserById,
  deleteAll,deleteById
} =require("../controllers/users.controller") 

router.route("/").get(getAllUsers);
router.route("/:id").get(getUsersById);
router.route("/create").post(createNewUser);
router.route("/update/:id").put(updateUserById);
router.route("/delete-all").delete(deleteAll);
router.route("/delete/:id").delete(deleteById);


module.exports = router;