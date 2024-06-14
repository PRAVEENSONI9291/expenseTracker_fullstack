const Sequelize= require('sequelize');

const sequelize= new Sequelize('expensetrack_db', 'root', 'Helloworld1*',{
    dialect:'mysql',
    host:'localhost'
});


module.exports= sequelize;