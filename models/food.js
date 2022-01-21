const { DataTypes } = require("sequelize/dist");
const sequelize = require("../sequelize");

const Food = sequelize.define(
    "Foods",
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
            defaultValue: true
        },
        category: {
            type: DataTypes.STRING
        },
        claimedBy: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
);

module.exports = Food;
