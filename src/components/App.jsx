import { useState } from 'react';
import '../reset.css';
import '../App.css';
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [theinput, setTheinput] = useState("");
  const [showstate, setshowstate] = useLocalStorage("showstate","All");
  const [todos, setTodos] = useLocalStorage("todolist",[
    {
      id: 0,
      title: "Tarea 1",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 1,
      title: "Tarea 2",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
    title: "Tarea 3",
    isComplete: false,
    isEditing: false,
  },
  {
    id: 3,
    title: "asdsa",
    isComplete: true,
    isEditing: false,
  },
]);

const [theid, setTheid] = useState(Object.keys(todos).length);

function holdFunction(event){
  setTheinput(event.target.value);
}

function inputjaja(){
if (theinput.trim()===""){
  return;
}

  setTodos([...todos,
    {
      id: theid,
      title:theinput,
      isComplete: false,
    }]);
    setTheinput("");
    setTheid(prevSetTheid => prevSetTheid+1);
}

function deleteTask(id){
  setTodos([...todos].filter(todo=>(todo.id!==id)));
  console.log("deleting task "+id)
}

function checkTask(event,id){
  setTodos(todos.map(todo=>{
    if (todo.id===id){
      todo.isComplete = event.target.checked
    }
    return todo;
  }));
}

function startEditingTask(event, id){
  // let localTasks = todos;
  // localTasks[id].isEditing = !localTasks[id].isEditing;
  // localTasks[id].title = event.target.value;
  setTodos(todos.map(todo=>{
    if (todo.id === id){
      todo.isEditing = !todo.isEditing;
    }
    return todo;
  }));

}

function endEditingTask(newTaskName, id){
  // let localTasks = todos;
  setTodos(todos.map(todo=>{
    if (todo.id===id){
      todo.isEditing = false;
      if (newTaskName.trim() !== ""){
        todo.title = newTaskName;
      }
    }
    return todo;
}));
}

function onKey(event, id) {
  if (event.key === "Enter"){
    endEditingTask(event.target.value, id)
  } else if (event.key === "Escape"){
    endEditingTask("", id)
  }
}

function checkAll(){
  let localTasks = todos;
  localTasks.map(todo=>todo.isComplete = true)
  setTodos([...localTasks]);
}

function countRemaining(){
  return todos.filter(todo=>todo.isComplete===false).length;
}

function showTask(todo){
  return (
    // if (showstate === "All") 
    <li key={todo.id} className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" onChange={(event)=>(checkTask(event,todo.id))} 
          checked={todo.isComplete ? true : false}/>
          { todo.isEditing ?
            <input type="text" defaultValue={todo.title} autoFocus={true} onBlur={(event)=>(endEditingTask(event,todo.id))} onKeyDown={event=>onKey(event,todo.id)} className="todo-item-input"/>
          :
          <span onDoubleClick={(event)=>(startEditingTask(event,todo.id))} className={todo.isComplete ? "todo-item-label line-through" : "todo-item-label"}>
            {todo.title}</span>
          }
      </div>
      <button className="x-button" onClick={()=>(deleteTask(todo.id))}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  )
}

function showTaskConditionally(todo){
  if (showstate==="All"){
    return showTask(todo);
  } else if (showstate==="Active" && !todo.isComplete){
    return showTask(todo);
  } else if (showstate==="Completed" && todo.isComplete){
    return showTask(todo);
  }
}
function changeShowstate(event){
  setshowstate(event.target.innerHTML);
}

function clearCompleted(){
  setTodos([...todos].filter(todo=>todo.isComplete===false));
}
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={inputjaja}>
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            value={theinput}
            onChange={holdFunction}
          />
        </form>
        <ul className="todo-list">
          {todos.map(todo=>(showTaskConditionally(todo)))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button" onClick={checkAll}>Check All</div>
          </div>

          <span>{countRemaining()} items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button onClick={event=>changeShowstate(event)} className={`button filter-button ${showstate==="All" ? "filter-button-active" : ""}`}>
              All
            </button>
            <button onClick={event=>changeShowstate(event)}  className={`button filter-button ${showstate==="Active" ? "filter-button-active" : ""}`}>Active</button>
            <button onClick={event=>changeShowstate(event)}  className={`button filter-button ${showstate==="Completed" ? "filter-button-active" : ""}`}>Completed</button>
          </div>
          <div>
            <button onClick={()=>clearCompleted()} className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
