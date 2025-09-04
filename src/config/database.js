const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("industriassd_db", "root", "Pamela1311", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;