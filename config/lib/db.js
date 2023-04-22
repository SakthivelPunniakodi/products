const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const Product = sequelize.define("Products", {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    Viewed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

sequelize.sync().then(() => {
    console.log('Products table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

module.exports = {
    Product,
    Op
}