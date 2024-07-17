var express = require("express");
var router = express.Router();

const authService = require('../service/authService');


router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", authService.postRegister);

router.post('/login',authService.postLogin)



module.exports = router;
