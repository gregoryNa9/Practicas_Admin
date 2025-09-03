const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mecanica_db", "admin", "password123", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;