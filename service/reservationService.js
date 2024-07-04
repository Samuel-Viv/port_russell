const Reservation = require('../models/reservation')
const Catway = require('../models/catways')
const User = require('../models/user')
const { decode } = require('jsonwebtoken')

exports.reservByIdCatway = async(req, res) => {
    try {
        const { catwayNumber } = req.params
        const { clientName, boatName, checkIn, checkOut} = req.body;
    
        //Verification de l'existance du catway
        const catway = await Catway.findOne({ catwayNumber })
        if(!catway){
            console.log(catway)
            return res.status(404).json('Catway not found!')
        }
    
        //Création d'un nouvelle reservation
        const reservation = new Reservation({
            catwayNumber,
            clientName,
            boatName,
            checkIn,
            checkOut
        });
    
        //Sauvegarde de la reservation
        await reservation.save();
        console.log(reservation)
        res.status(201).json({ message: "Reservation created !", reservation})
        
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.reservationList = async(req ,res) => {
    try {
        //Récupération des champs
        const reservations = await Reservation.find();
        res.render("reservations", { reservations });
      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }
}

