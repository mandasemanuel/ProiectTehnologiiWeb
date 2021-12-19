const { DataTypes } = require("sequelize/dist");
const sequelize = require("../sequelize");

const Food = sequelize.define(
    "food",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [3,30]
            }
        },
        available: {
            type: DataTypes.BOOLEAN,
        }
    }
);

module.exports = Food;
