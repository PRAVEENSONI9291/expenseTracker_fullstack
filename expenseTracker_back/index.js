const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');



const sequelize= require('./database');
const controller= require('./controllers');



const app= express();
app.use(bodyParser.json());
app.use(cors());

app.get('/expenseTracker', controller.getExpenseTrack );
  
  app.post('/expenseTracker', controller.postExpenseTrack);
  
  app.delete('/expenseTracker/:id', controller.deleteExpenseTrack);
  
  app.put('/expenseTracker/:id', controller.putExpenseTrack);




sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  });

