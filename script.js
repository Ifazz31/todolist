// SELECT ELEMENTS
const form = document.getElementById("todoform")
const todoInput = document.getElementById("newtodo")
const todosListEl = document.getElementById("todos-list")

// VARS
let todos = []; 

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
        todos.push({
            value: todoValue,
            checked: false,
            color: '#' + Math.floor(Math.random()*16777215).toString(16)
    
    });
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
            ></i>
            <p class="">${todo.value} </p>
            <i class="bi bi-pencil-square"></i>
            <i class="bi bi-trash"></i></>
            </div> 
        `;
    });
}


// CLICK EVENT LISTENER FOR ALL THE TODOS
todosListEl.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if(parentElement.className !== 'todo') return;

    const todo= parentElement;
    const todoId = Number(todo.id);

    console.log(todoId);
});
