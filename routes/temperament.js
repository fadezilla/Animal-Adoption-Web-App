var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var TemperamentService = require("../services/TemperamentService")
var db = require("../models");
var temperamentService = new TemperamentService(db);

router.get('/', async function(req, res, next) {
    const temperament = await temperamentService.getAll();
    const user = req.user
    const isAdmin = req.user?.role === "admin";
    res.render('temperament', { temperament: temperament.map(temperament => ({
        Id: temperament.Id,
        Temper: temperament.Name,
      })), user, isAdmin });
  });

router.post('/update', async function (req,res,next){
    res.render("index",{user: null})
})

module.exports = router;