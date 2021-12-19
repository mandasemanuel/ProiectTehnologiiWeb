const { DataTypes } = require("sequelize/dist");
const sequelize = require("../sequelize");

const Category = sequelize.define(
    "category",
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
    }
);

module.exports = Category;