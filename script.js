// SELECT ELEMENTS
const form = document.getElementById("todoform")
const todoInput = document.getElementById("newtodo")
const todosListEl = document.getElementById("todos-list")

// VARS
let todos = []; 
let EditTodoId = -1;
// FROM SUBMIT
form.addEventListener('submit' , function (event){
    event.preventDefault();
    saveTodo();
    renderTodos();
});

// SAVE TODO
function saveTodo(){
    const todoValue = todoInput.value

// check if the todo is empty
    const isEmpty = todoValue === '';


// check for duplicate todos
    const isDuplicate = 
    todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase);

    if(isEmpty){
        alert("Todo's input is empty");
    } else if(isDuplicate){
        alert('Todo already exists!');
    }
    else{
        if(EditTodoId >=0) {
           todos = todos.map((todo, index) => ({
                    ...todo,
                    value : index === editTodoId ? todoValue :todo.value,
          }));
          EditTodoId = -1;
        }else{
        todos.push({
            value: todoValue,
            checked: false,
            color: '#' + Math.floor(Math.random()*16777215).toString(16)
    
    });
}
        todoInput.value = '';
    }
}
// RENDER TODOS
function renderTodos(){
    // CLEAR ELEMENT BEFORE A RE-RENDER
    todosListEl.innerHTML = "";
    // RENDER TODOS
    todos.forEach((todo, index) => {
        todosListEl.innerHTML += `
        <div class= "todo" id=${index}>
            <i
                class="bi ${todo.checked ? 'bi-check-circle-fill' :'bi-circle'}"
                style="color : $(todo.color)"
                data-action="check"
            ></i>
            <p class="" data-action="check">${todo.value}</p>
            <i class="bi bi-pencil-square" data-action="edit"></i>
            <i class="bi bi-trash" data-action="delete"></i>
            </div> 
        `;
    });
}


// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if(parentElement.className !== 'todo') return;

    // to do id

    const todo= parentElement;
    const todoId = Number(todo.id);
    
    // target action
    const action= target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);
});

// check a todo
function checkTodo(todoId){
    todos = todos.map((todo, index) => ({
            ...todo,
            checked: index === todoId ? !todo.checked :todo.checked,
        }));

    renderTodos();
}

// edit a todo
function editTodo(todoId){
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

//delete todo
function deleteTodo(todoId){
   todos = todos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;
    //re-render
    renderTodos();
}