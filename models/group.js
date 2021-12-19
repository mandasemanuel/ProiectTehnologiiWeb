const { DataTypes } = require("sequelize/dist");
const sequelize = require("../sequelize");


const Group = sequelize.define(
    "group",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                len: [3,30]
            }
        }

    }
);

module.exports = Group;