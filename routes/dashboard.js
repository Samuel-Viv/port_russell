var express = require("express");
var router = express.Router();
const User = require("../models/user");

const authService = require('../service/authService');
const private = require('../middelwares/private')
const userService = require('../service/userService');

//Route dashboard
router.get("/", authService.getDashboard);


//Route utilisateur
// Route pour afficher le formulaire d'édition du profil
router.get('/edit-profile/:id', private, userService.getUserById);

router.put('/edit-profile/:id',private, userService.updateUserById);
router.delete('/delete-profile/:id',userService.deleteUserById)
module.exports = router;
