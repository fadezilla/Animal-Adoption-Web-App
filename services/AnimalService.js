const { Animal, Species, Size, Temperament } = require('../models');
class AnimalService {
    constructor(db) {
        this.client = db.sequelize;
        this.Animal = db.Animal;
        this.User = db.User;
        this.Size = db.Size;
        this.Species = db.Species;
        this.Temperament = db.Temperament;
        this.AnimalTemperament = db.AnimalTemperament;
    }

    getAge(dateString){
        const today = new Date();
        const birthDate = new Date(dateString);
        const yearsDiff = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
          return yearsDiff - 1;
        }
        return yearsDiff;
      }
      
    async get() {
        return this.Animal.findAll({
            where: {},
            attributes: ['id', 'Name', 'Birthday', 'Adopted'],
            include: [
            {
                model: this.Species
            },
            {
                model: this.Temperament,
                as: 'Temperament',
                through: {
                    model: this.AnimalTemperament,
                    attributes: []
                }
            },
            {
                model: this.Size
            },
        ],
        });
    }
    async adoptAnimal(animalId, userId) {
      const animal = await this.Animal.findOne({ where: { id: animalId } });
  
      if (!animal) {
        throw new Error(`Animal with ID ${animalId} not found`);
      }
      if (animal.Adopted) {
        throw new Error(`Animal with ID ${animalId} has already been adopted`);
      }
  
      animal.Adopted = true;
      animal.UserId = userId;

      await animal.save();
  
      console.log(`Adopted animal with ID ${animalId}`);
    }
    async cancelAdoption(animalId) {
      const animal = await this.Animal.findOne({ where: { id: animalId } });
  
      if (!animal) {
        throw new Error(`Animal with ID ${animalId} not found`);
      }
  
      animal.Adopted = false;
  
      await animal.save();
  
      console.log(`Cancelled adoption of animal with ID ${animalId}`);
    }
  }

module.exports = AnimalService;