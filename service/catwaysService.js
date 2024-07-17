const Catway = require("../models/catways");

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
  try {
    const catway = await Catway.findOneAndUpdate(
      req.params.catwayNumber,
      { catwayState: req.body.catwayState },
      { new: true }
    );
    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send(err);
  }
};

//Route delete catway
exports.deleteCatway = async (req, res) => {
  try {
    //recupération de l'id dans la requete
    const catwayNumber = req.body;

    const catway = await Catway.findOneAndDelete(catwayNumber);
    if (!catway) return res.status(404).send("Catway not found");
     //redirection au dashbord
    res.redirect("/dashboard");
  } catch (err) { 
    res.status(500).send(err);
  }
};

exports.detailCatway = async (req, res) => {
  try {
    //recupération de l'id dans la requete
    const catwayNumber = req.query;
    //Verification des catway par rapport a l'id enregistré
    const catway = await Catway.findOne(catwayNumber);
    if (!catway) {
      return res.status(404).json({ message: "Catway not found" });
    }
    console.log(catway);
    res.render("catwayDetail", { catway });
  } catch (err) {
    res.status(500).send(err);
  }
  };