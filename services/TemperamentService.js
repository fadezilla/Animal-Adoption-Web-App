class TemperamentService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
        this.Temperament = db.Temperament;
    }
    async getAll() {
        return this.Temperament.findAll({
            where: {}
        })
    }
}
module.exports = TemperamentService;