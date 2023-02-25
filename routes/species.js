var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var SpeciesService = require("../services/SpeciesService")
var db = require("../models");
var speciesService = new SpeciesService(db);
var { checkIfAuthorized, isAdmin } = require('./authMiddlewares');

router.get('/', async function(req, res, next) {
    const species = await speciesService.getAll();
    const user = req.user;
    const isAdmin = req.user?.role === "admin";
    res.render('species', { species: species.map(species => ({
        Id: species.Id,
        Name: species.Name,
      })), user, isAdmin });
  });

  router.post('/add', isAdmin, async (req, res) => {
    const { name } = req.body;
    try {
      await speciesService.create(name);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  router.put('/:speciesId', isAdmin, jsonParser, async (req, res) => {
    var id = req.params.speciesId;
    var name = req.body.name;
    try {
      await speciesService.updateName(id, name);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

  router.delete('/:speciesId', isAdmin, async (req, res) => {
    const { speciesId } = req.params;
  
    try {
      await speciesService.delete(speciesId);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  });

module.exports = router;