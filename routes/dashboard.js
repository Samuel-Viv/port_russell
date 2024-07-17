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
router.put('/user/:id',private, userService.updateUserById);
router.delete('/delete-profile/:id', private,userService.deleteUserById);

//Route catway
router.get('/catways', private,catwayServices.listCatways); //Route Liste des catways
router.post('/catways', private,catwayServices.addCatway ); 
router.get('/catways/:id', private, catwayServices.detailCatway);
router.patch('/catways/:id', private,catwayServices.updateCatwayById);
router.delete('/catways/:id', private, catwayServices.deleteCatway);

//Route reservation
router.get('/reservations', private, reservationSevice.listeReservations)
router.post('/catways/:id/reservations', private, reservationSevice.createReservation);
router.get('/catways/:id/reservations', private, reservationSevice.listReservationsByCatway);
router.get('/catways/:id/reservations/:idReservation', private, reservationSevice.getReservationById);
router.delete('/catways/:id/reservations/:idReservation', private, reservationSevice.deleteReservation);

module.exports = router;
