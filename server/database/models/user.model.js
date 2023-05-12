const Sequelize = require("sequelize");
const { SequelizeInst } = require("..");
const Token = require("./token.model");
const Task = require("./todo.model");

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING
        }
    },

    { sequelize: SequelizeInst, underscored: true, modelName: "user" }
);

module.exports = User;