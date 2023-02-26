var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var AnimalService = require("../services/AnimalService")
var UserService = require("../services/UserService");
var db = require("../models");
var animalService = new AnimalService(db);
const userService = new UserService(db);
var { canSeeUserDetails, canSeeUserList, checkIfAuthorized, isAdmin } = require("./authMiddlewares");

router.get('/animals', async function(req, res, next) {
  const animals = await animalService.get();
  const user = req.user
  const isAdmin = req.user?.role === "admin";
  const today = new Date();
  res.render('animals', { animals: animals.map(animal => ({
    Id: animal.id,
    Name: animal.Name,
    Birthday: animal.Birthday,
    Species: animal.Species.Name,
    Temperament: animal.Temperament.map(temp => temp.Name).join(', '),
    Size: animal.Size.Name,
    Adopted: animal.Adopted,
    Age: animalService.getAge(animal.Birthday, today)
  })), user, isAdmin });
});

router.post('/adopt/:animalId', checkIfAuthorized, async (req, res) => {
  const animalId = req.params.animalId;
  const userId = req.body.userId;

  try {
    await animalService.adoptAnimal(animalId, userId);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

router.post('/cancelAdoption/:animalId', isAdmin, async (req, res) => {
  const animalId = req.params.animalId;

  try {
    await animalService.cancelAdoption(animalId);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;

