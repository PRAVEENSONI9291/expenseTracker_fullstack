const ExpenseTrack= require('./models/expenseTrack');

exports.getExpenseTrack= async (req, res) => {
    try {
      const expenses = await ExpenseTrack.findAll();
      console.log("get response", expenses);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.postExpenseTrack= async (req, res) => {
    try {
      const expense = await ExpenseTrack.create(req.body);
      console.log("post response", expense);

      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteExpenseTrack= async (req, res) => {
    try {
      const id = req.params.id;
      await ExpenseTrack.destroy({ where: { id } });
      

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.putExpenseTrack= async (req, res) => {
    try {
      const id = req.params.id;
      await ExpenseTrack.update(req.body, { where: { id } });
      const updatedExpense = await ExpenseTrack.findByPk(id);
      console.log("update response", updatedExpense);

      res.json(updatedExpense);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //new