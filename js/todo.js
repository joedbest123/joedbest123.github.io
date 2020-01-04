const domContainer = identifier => document.querySelector(`${identifier}`);

const todoName = domContainer('.todo-name-in');
const todoList = domContainer('.todo-list-in');
const btnDelete = domContainer('.delete');

const todoNameOut = domContainer('.todo-name-out');
const todoListOut = domContainer('.todo-list-out');

const createTodo = domContainer('.btn-todo-name');
const addToList = domContainer('.btn-todo-list');

const errorCon = domContainer('.error');
const errorCon2 = domContainer('.error-list');

document.addEventListener("DOMContentLoaded", handleLoad);
function handleLoad (){
  getName();
  getList();
  todoName.addEventListener('submit', handleTodoName, true);
  todoList.addEventListener('submit', handleTodoList, true);
}


function handleTodoName(e){
  e.preventDefault();
  if(validate(this.todo_name.value, errorCon)){
    const Todo = this.todo_name.value;
    if(!window.localStorage.getItem("Todo_name")){
      let todoName = JSON.stringify(Todo);
      window.localStorage.setItem("Todo_name", todoName);
    }else {
      JSON.parse(window.localStorage.getItem("Todo_name"));
      let todoName = JSON.stringify(Todo);
      window.localStorage.setItem("Todo_name", todoName);
    }
  }
  getName();
  this.todo_name.value = '';
}



function handleTodoList (e){
  e.preventDefault();
  if(validate(this.todo_list.value, errorCon2)){
    let newTodoItem = this.todo_list.value;
    if(!window.localStorage.getItem("Todo_list")){
      let todoList = [];
      todoList.push(newTodoItem);
      window.localStorage.setItem("Todo_list", JSON.stringify(todoList));
    }else {
      let todoList = JSON.parse(window.localStorage.getItem("Todo_list"));
      todoList.push(newTodoItem);
      window.localStorage.setItem("Todo_list", JSON.stringify(todoList));
    }
  }
  getList();
  this.todo_list.value = '';
}


function handleDelete(index){
  if(window.localStorage.getItem("Todo_list")){
    let list = JSON.parse(window.localStorage.getItem('Todo_list'));
    list.forEach((item, i) =>{
      if(list.indexOf(item) === parseInt(index)){
        list.splice(i, 1);
      }
    }); 
    window.localStorage.setItem("Todo_list", JSON.stringify(list));
    getList();
  }
}

function getName (){
  let nameOut = JSON.parse( window.localStorage.getItem('Todo_name'));
  if (nameOut !== null){
    todoNameOut.innerHTML = `<h2>${nameOut}</h2>`.toUpperCase();
  }
  
}

function getList (){
  let list = JSON.parse(window.localStorage.getItem('Todo_list'));
  if (list){
    let listItems = '';
    list.forEach(item => {
      listItems += `
        <li>${item}<button class="delete" onclick=handleDelete('${list.indexOf(item)}')>delete</button></li>
      `;
    });
    todoListOut.innerHTML = listItems;
    domContainer('.no_item').innerHTML = "";
  }else {
    todoListOut.innerHTML = '';
    domContainer('.no_item').innerHTML = "<p>List is currently empty</p>";
  }
}
function validate (input, errorCon){
  if(input === ''){
    errorCon.textContent = "Feild can't be blank";
    setTimeout(() => {
      errorCon.textContent = "";
    }, 3000);
    return false;
  }else if(input.includes('<') ){
    errorCon.textContent = "Please enter a valid name";
    setTimeout(() => {
      errorCon.textContent = "";
    }, 3000);
    return false;
  } else return true;
}