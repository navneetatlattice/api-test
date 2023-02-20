const fs = require("fs");
const path = require('path');
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

let sequelize = new Sequelize(
    'Lattice',
    'root',
    'my-secret-pw',
    {
        host: 'localhost',
        port: '3306',
        dialect: "mysql",
        operatorsAliases: false,
    }
);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
