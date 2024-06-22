const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    'db',
    'root',
    'Alice0227',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

const Person = sequelize.define("person", {
    PUID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Year: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

sequelize.sync().then(() => {
    console.log('Person table created successfully.');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = Person;