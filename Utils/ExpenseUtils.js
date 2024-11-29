export const calculatePercentage = (expenses, amount) => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    return totalExpenses > 0 ? ((parseFloat(amount) / totalExpenses) * 100).toFixed(2) : '0.00';
  };
  
  export const groupExpensesByType = (expenses) => {
    const grouped = expenses.reduce((acc, expense) => {
      acc[expense.type] = (acc[expense.type] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});
    return grouped;
  };
  