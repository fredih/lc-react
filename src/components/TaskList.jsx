import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

function TaskList() {
  const {showstate, setShowstate, todos, setTodos} = useContext(GlobalContext);
  


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
    setTodos(todos.map(todo=>{
      if (todo.id === id){
        todo.isEditing = !todo.isEditing;
      }
      return todo;
    }));
  
  }
  
  function endEditingTask(newTaskName, id){
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
  
  

function showTask(todo){
  return (
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
  return (
    <ul className="todo-list">
          {todos.map(todo=>(showTaskConditionally(todo)))}
    </ul>
  )
}

export default TaskList