import { useState } from 'react';
import '../reset.css';
import '../App.css';

function App() {
  const [theinput, setTheinput] = useState("");
  
  const [todos, setTodos] = useState([
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
  let localTasks = todos;
  localTasks[id].isComplete = event.target.checked;
  setTodos([...localTasks]);
  return;
}

function startEditingTask(event, id){
  let localTasks = todos;
  localTasks[id].isEditing = !localTasks[id].isEditing;
  // localTasks[id].title = event.target.value;
  setTodos([...localTasks]);


}

function endEditingTask(event, id){
  let localTasks = todos;
  localTasks[id].isEditing = !localTasks[id].isEditing;
  if (event.target.value !== ""){
    localTasks[id].title = event.target.value;
  }
  setTodos([...localTasks]);
}

function onKey(event, id) {
  if (event.key === "Enter"){
    endEditingTask(event, id)
  } else if (event.key === "Escape"){
    endEditingTask(event, id)
  }
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
          {todos.map((todo,index)=>(
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
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
