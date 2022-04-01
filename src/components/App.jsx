import { useState } from 'react';
import '../reset.css';
import '../App.css';
import useLocalStorage from '../hooks/useLocalStorage';
import { GlobalContext } from '../contexts/GlobalContext';
import Options from './Options';
import InputBar from './InputBar';
import TaskList from './TaskList';

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
    isComplete: true,
    isEditing: false,
  },
]);

const [theid, setTheid] = useState(Object.keys(todos).length);

  return (
    <GlobalContext.Provider value={{showstate, setshowstate, todos, setTodos, theinput, setTheinput, theid, setTheid}}>
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <>
        <InputBar/>

        <TaskList/>

        <Options/>
        </>
      </div>
    </div>
    </GlobalContext.Provider>
  );
}

export default App;
