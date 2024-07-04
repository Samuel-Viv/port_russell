var express = require("express");
var router = express.Router();

//Service
const authService = require('../service/authService');
const userService = require('../service/userService');
const catwayServices = require('../service/catwaysService');
const reservationSevice = require('../service/reservationService');
//Middelwares
const private = require('../middelwares/private');

//Route dashboard
router.get("/", authService.getDashboard);


//Route utilisateur
// Route pour afficher le formulaire d'édition du profil
router.get('/edit-profile/:id', private, userService.getUserById);
router.put('/edit-profile/:id',private, userService.updateUserById);
router.delete('/delete-profile/:id', private,userService.deleteUserById);

//Route catway
router.get('/catways', private,catwayServices.listCatways); //Route Liste des catways
router.get('/catway/:catwayNumber',private, catwayServices.detailCatway);
router.post('/create-catway', private,catwayServices.addCatway ); 
router.patch('/edit-catway/:catwayNumber', private,catwayServices.updateCatwayById);
router.delete('/delete-catway/:catwayNumber',private, catwayServices.deleteCatway);

//Route reservation
router.post('/catway/:catwayNumber/reservation',private , reservationSevice.reservByIdCatway);
router.get('/reservations',private ,reservationSevice.reservationList)


module.exports = router;
