class SpeciesService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
        this.Species = db.Species;
        this.Animal = db.Animal
    }
    async getAll() {
        return this.Species.findAll({
            where: {}
        })
    }
    async create(name) {
        return this.Species.create(
            {
                Name: name
            }
        )
    }
    async hasDependantAnimals(speciesId){
        const animalCount = await db.Animal.count({
            where: { SpeciesId: speciesId}
        });
        return animalCount > 0;
    }
    async delete(id) {
        const species = await this.Species.findByPk(id);
        if(!species){
            throw new Error(`Species with ID ${id} not found.`);
        }
        const animalCount = await this.Animal.count({ where: { SpeciesId: id}});
        if(animalCount > 0) {
            throw new Error(`cannot delete species with ID ${id} because it has an associated animal. `)
        }
        const result = await this.Species.destroy({ where: { id } });
        return result;
      }
    async updateName(speciesId, name) {
        const species = await this.Species.findOne({ where: { id: speciesId } });
    
        if (!species) {
          throw new Error(`Species with ID ${speciesId} not found`);
        }
        species.Name = name;
        await species.save();
    
        return species;
      }
}
module.exports = SpeciesService;