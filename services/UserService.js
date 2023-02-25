const { Op } = require("sequelize");
class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
        this.Animal = db.Animal;
    }

    async create(firstName, lastName, username, password) {
        return this.User.create(
            {
                FirstName: firstName,
                LastName: lastName,
                Username: username,
                Password: password
            }
        )
    }

    async getAll() {
        return this.User.findAll({
            where: {}
        })
    }
    async getOne(userId) {
        return await this.User.findOne({
            where: {Id: userId}
        });
    }
    async getOneByName(username) {
        return await this.User.findOne({
            where: {Username: username}
        });
    }
    async deleteUser(userId) {
        return this.User.destroy({
            where: {
                id: userId,
                Role: {
                    [Op.not]: 'admin'
                }
            }
        });
    }
}
module.exports = UserService;