const Sequelize= require('sequelize');

const sequelize= require('../database');

const ExpenseTrack= sequelize.define('expenses',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false
    },
    category:{
        type:Sequelize.STRING,
        allowNull: false
    }
});

module.exports= ExpenseTrack;