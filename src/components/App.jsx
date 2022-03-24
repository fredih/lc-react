import { useState } from 'react';
import '../reset.css';
import '../App.css';

function App() {
  const [theinput, setTheinput] = useState("");
  
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Tarea 1",
      isComplete: false,
    },
    {
      id: 2,
      title: "Tarea 2",
      isComplete: false,
    },
    {
      id: 3,
    title: "Tarea 3",
    isComplete: false,
  },
  {
    id: 4,
    title: "asdsa",
    isComplete: true,
  },
]);

const [theid, setTheid] = useState(1+Object.keys(todos).length);

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
              <input type="checkbox"/>
              <span className="todo-item-label">{todo.title+" id:"+todo.id} </span>
              {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
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
