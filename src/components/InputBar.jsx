import React, { useContext }  from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

function InputBar() {
    const {todos, setTodos, theinput, setTheinput, theid, setTheid} = useContext(GlobalContext);

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
      

    return (
    <form action="#" onSubmit={inputjaja}>
    <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        value={theinput}
        onChange={holdFunction}
    />
    </form>
    )
}

export default InputBar