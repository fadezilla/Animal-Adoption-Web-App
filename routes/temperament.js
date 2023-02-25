var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var TemperamentService = require("../services/TemperamentService")
var db = require("../models");
var temperamentService = new TemperamentService(db);
var { checkIfAuthorized, isAdmin } = require('./authMiddlewares');

router.get('/', async function(req, res, next) {
    const temperament = await temperamentService.getAll();
    const user = req.user
    const isAdmin = req.user?.role === "admin";
    res.render('temperament', { temperament: temperament.map(temperament => ({
        Id: temperament.Id,
        Temper: temperament.Name,
      })), user, isAdmin });
  });

router.post('/add', async function(req, res, next){
    const { name } = req.body;
    await temperamentService.create(name);
    res.redirect('/temperament');
});

router.put('/:temperamentId', async function(req, res, next){
    var id = req.params.temperamentId;
    var name = req.body.name;
    try {
        await temperamentService.updateName(id, name);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

router.delete('/:temperamentId', isAdmin, async (req, res) => {
    const { temperamentId } = req.params;
  
    try {
      await temperamentService.delete(temperamentId);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });


module.exports = router;