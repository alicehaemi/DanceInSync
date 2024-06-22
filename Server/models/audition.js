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

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch((error) => {
    console.error('Unable to connect to database: ', error);
})

const Audition = sequelize.define("audition", {
    PUID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    Years_experience: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Song_genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pre_placement: {
        type: DataTypes.STRING,
        allowNull: false
    },
    final_placement: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('Audition table created successfully.');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = Audition;