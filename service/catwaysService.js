const Catway = require("../models/catways");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

//Méthode d'ajout de catway
exports.addCatway = async (req, res) => {
  try {
    //recupération des champs dans le corp de la requete
    const { catwayNumber, type, catwayState } = req.body;

    //Verification dans la base de donné de l'existance d'un catwayNumber identique
    let newCatway = await Catway.findOne({ catwayNumber });
    if (newCatway) {
      return res.status(400).json("Catway already exists");
    }
    //Création du nouveau catway
    newCatway = new Catway({ catwayNumber, type, catwayState });

    //sauvegarde du catway
    await newCatway.save();
    console.log(newCatway);
    //redirection au dashbord
    res.redirect("/dashboard/catways");
  } catch (error) {
    console.error(error);
    res.status(501).json(error);
  }
};

//Méthode pour afficher la liste des catway
exports.listCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("catways", { catways });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//Méthode pour le formulaire de modification par rapport à l'id
exports.updateCatwayById = async (req, res) => {
  const { catwayState } = req.body;
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.catwayNumber });
    if (!catway) {
      return res.status(404).json({ message: "Catway not found!" });
    }
    catway.catwayState = catwayState;

    await catway.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Route delete catway
exports.deleteCatway = async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.catwayNumber });

    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }

    await Catway.deleteOne({ catwayNumber: req.params.catwayNumber });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
    
  }
};

exports.detailCatway = async (req, res) => {
    try {
      const catwayNumber = req.params.catwayNumber;
      //Rechercher un catway correspond dans la base de donné par rapport à sin catwayNumber
      const catway = await Catway.findOne({ catwayNumber });
      //Verification du catway si il existe
      if (!catway) {
        return res.status(404).json({ message: "Catway not found" });
      }
      //Récupération du token depuis les cookies
      const token = req.cookies.token;
      if (!token) {
        return res.redirect('/');
      }
      //Décodage du JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Récupération des info de l'utilsateur
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      //Récupération de tout les catways
      const catways = await Catway.find();
      //Afficher sur le dashbord
      res.render('dashboard', { catways, user, catway });
    } catch (error) {
      console.error('Error fetching catway details:', error);
      res.status(500).send('Server Error');
    }
  };