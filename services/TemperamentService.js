const animal = require("../models/animal");

class TemperamentService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
        this.Temperament = db.Temperament;
        this.Name = db.Name;
        this.Animal = db.Animal;
    }
    async getAll() {
        return this.Temperament.findAll({
            where: {}
        })
    }
    async create(name) {
        return this.Temperament.create({ Name : name });
    }
    async delete(id) {
        const temperament = await this.Temperament.findByPk(id);
        if (!temperament) {
            throw new Error(`Temperament with ID ${id} not found.`);
        }
        const animalCount = await this.Animal.count({
            include: [{
                model: this.Temperament,
                as: 'Temperament',
                where: { id: temperament.Id },
                through: {
                    attributes: []
                }
            }]
        });
        if (animalCount > 0) {
            throw new Error(`Cannot delete temperament with ID ${id} because it has an associated animal.`);
        }
        const result = await this.Temperament.destroy({ where: { id: temperament.Id }});
        return result;
    }
    
    async updateName(temperemantId, name) {
        const temperament = await this.Temperament.findOne({ where: { id: temperemantId }});
        if (!temperament){
            throw new Error(`Temperament with ID ${temperamentId} not found..`);
        }
        temperament.Name = name;
        await temperament.save();
        return temperament;
    }
    async hasDependantAnimals(temperamentId){
        const animalCount = await this.Animal.count({
            include: [{ model: models.temperament, where: { id: temperamentId }}]
        });
        return animalCount > 0;
    }
}
module.exports = TemperamentService;