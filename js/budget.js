const domContainer = identifier => document.querySelector(`${identifier}`);

class Budget {
  constructor(){
    this.budgetId = window.localStorage.getItem('Budget_id');
    this.expensesId = window.localStorage.getItem('Expenses_id');
    this.budgetForm = domContainer('.budget-form-group');
    this.expensesForm = domContainer('.expenses-form-group');
    this.budgetName = domContainer('.name-out');
    this.budgetAmount = domContainer('.budget-out');
    this.expenseAmount = domContainer('.expense-out');
    this.budgetBalance = domContainer('.balance-out');
  }

submitBudget = (e)=>{
  e.preventDefault();
  let budgetInput = {
    budget: this.budgetForm.budget.value,
    value: this.budgetForm.budget_amount.value
  }
  if (validate(budgetInput.budget, budgetInput.value, domContainer(".budget-error"))){
    if(!this.budgetId){
      window.localStorage.setItem("Budget_id", JSON.stringify(budgetInput));
    }else {
    JSON.parse(window.localStorage.getItem('Budget_id'));
      window.localStorage.setItem('Budget_id', JSON.stringify(budgetInput));
    }
    this.budgetForm.reset();

  } else {
    this.budgetForm.budget.value=budgetInput.budget;
    this.budgetForm.budget_amount.value=budgetInput.value;
  }
  this.getBudget();
  this.getBalance();
}

submitExpenses = (e)=>{
  e.preventDefault();
  let expenseInput = {
    expense: this.expensesForm.expenses.value,
    amount: this.expensesForm.expenses_amount.value
  }
 if (validate(expenseInput.expense, expenseInput.amount, domContainer('.expense-error'))){
  if(!this.expensesId){
    let expenses = [];
    expenses.push(expenseInput);
    window.localStorage.setItem('Expenses_id', JSON.stringify(expenses));
  } else {
    let expenses = JSON.parse(window.localStorage.getItem('Expenses_id'));
    expenses.push(expenseInput);
    window.localStorage.setItem('Expenses_id', JSON.stringify(expenses));
    
  }
  this.expensesForm.reset();
 }else {
  this.expensesForm.expenses.value = expenseInput.expense;
  this.expensesForm.expenses_amount.value = expenseInput.amount;
 }

 this.getExpenses();
 this.getBalance();
 
}

getExpenses(){
  let expenses = JSON.parse(window.localStorage.getItem('Expenses_id'));
  if (expenses !== null){
    let result = `
    <table class="expenses-result-out">
        <tr>
          <th>Expense</th>
          <th>Amount</th>
          <th></th>
        </tr>
    `
    expenses.forEach(element => {
      result += `
        <tr>
        <td>${element.expense}</td>
        <td>&#8358;${element.amount}</td>
        <td><button class="btn btn-outline-danger" onclick="deleteExpense(${expenses.indexOf(element)})">delete</button></td>
        </tr>
      
      `;
    });

    result += '</table>';

    domContainer('.expenses-result').innerHTML = result;
  }else {
    domContainer('.expenses-result').innerHTML = `
    <table class="expenses-result-out">
      <tr>
        <td>Expense Name</td>
        <td>Amount</td>
        <td></td>
      </tr>
    </table>
    `
  }
}
getBudget(){
  let budgetResult = JSON.parse(window.localStorage.getItem('Budget_id'));
  if (budgetResult !== null){
    this.budgetAmount.textContent = budgetResult.value;
    this.budgetName.textContent = budgetResult.budget;

  }
}

getBalance(){
  let budgetResult = JSON.parse(window.localStorage.getItem('Budget_id'));
  let expenses = JSON.parse(window.localStorage.getItem('Expenses_id'));
  if (budgetResult !== null && expenses !== null){
    let expenseTotal = expenses
    .map(expense => {
      return parseInt(expense.amount);
    })
    .reduce((amount, total) => {
      return total + amount;
    }, 0);

    let balance = parseInt(budgetResult.value) - expenseTotal;
    this.budgetBalance.textContent = balance || budgetResult.value;
    this.expenseAmount.textContent = expenseTotal;
  } else {
    this.budgetBalance.textContent = budgetResult.value;
  }
}

}

document.addEventListener('DOMContentLoaded', handleBudget);

function handleBudget (){
  const budget = new Budget();
  budget.getBudget();
  budget.getExpenses();
  budget.getBalance();
  domContainer('.budget-form-group').addEventListener('submit', budget.submitBudget);
  domContainer('.expenses-form-group').addEventListener('submit', budget.submitExpenses);
}

function deleteExpense(index){
  const modified = new Budget();
  let expenses = JSON.parse(window.localStorage.getItem('Expenses_id'));
  if (expenses){
    expenses.forEach((expense, i)=>{
      if(expenses.indexOf(expense) === parseInt(index)){
        expenses.splice(i, 1);
      }
    });
  }

  window.localStorage.setItem('Expenses_id', JSON.stringify(expenses))
  modified.getBudget();
  modified.getBalance();
  modified.getExpenses();

}
function validate (name, amount, element){
  if(name == "" || amount == ""){
    element.innerHTML = `<p class="error">Feild must not be blank</p>`;
    setTimeout(() => {
      element.innerHTML = '';
    }, 3000);
    return false;
  }else if(isNaN(amount)){
    element.innerHTML = `<p class="error">The amount must a number</p>`;
    setTimeout(() => {
      element.innerHTML = '';
    }, 3000);
    return false;
  }else if(name.includes('<')|| name.includes('\'') || name.includes('\"')){
    element.innerHTML = `<p class="error">Please enter a valid name</p>`;
    setTimeout(() => {
      element.innerHTML = '';
    }, 3000);
    return false;
  }else return true;
}