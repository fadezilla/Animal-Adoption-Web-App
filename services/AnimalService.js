const { Animal, Species, Size, Temperament, Adoption} = require('../models');
class AnimalService {
    constructor(db) {
        this.client = db.sequelize;
        this.Animal = db.Animal;
        this.User = db.User;
        this.Size = db.Size;
        this.Species = db.Species;
        this.Temperament = db.Temperament;
        this.AnimalTemperament = db.AnimalTemperament;
        this.Adoption = db.Adoption;
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
      console.log('animalId:', animalId);
      console.log('userId:', userId);
      const user = await this.User.findByPk(userId);
      console.log('user:', user);
      const animal = await this.Animal.findOne({ where: { id: animalId } });
      console.log('animal:', animal);
      if (!user || !animal) {
        throw new Error('User or animal not found');
      }
      if (animal.Adopted) {
        throw new Error('Animal already adopted');
      }
      animal.Adopted = true;
      animal.UserId = userId;
      const adoption = await this.Adoption.create({ AnimalId: animalId, UserId: userId });
      console.log('adoption:', adoption);
      await animal.save();
    }
    
    async cancelAdoption(animalId) {
      const animal = await this.Animal.findOne({ where: { id: animalId } });
  
      if (!animal) {
        throw new Error(`Animal with ID ${animalId} not found`);
      }

      const adoption = await this.Adoption.findOne({ where: { AnimalId: animalId}});
      if (!adoption){
        throw new Error(`Adoption for animal with ID ${animalId} not found`);
      }
  
      animal.Adopted = false;
      animal.UserId = null;

      await this.Adoption.destroy({ where: { AnimalId: animalId } });
      await this.Animal.update({ Adopted: false }, { where: { id: animalId } });
      
      console.log(`Cancelled adoption of animal with ID ${animalId}`);
  
      console.log(`Cancelled adoption of animal with ID ${animalId}`);
    }
  }

module.exports = AnimalService;