import React, { useContext }  from 'react';
import { CSSTransition } from 'react-transition-group';
import { GlobalContext } from '../contexts/GlobalContext';
import useLocalStorage from '../hooks/useLocalStorage';

function Options() {

    const {showstate, setshowstate, todos, setTodos} = useContext(GlobalContext)
    const [toggleOpt,setToggleOpt] = useLocalStorage("toggleOptions", true);

    function checkAll(){
        let localTasks = todos;
        localTasks.map(todo=>todo.isComplete = true)
        setTodos([...localTasks]);
      }
    
    function changeShowstate(event){
        setshowstate(event.target.innerHTML);
    }
    
    function clearCompleted(){
        setTodos([...todos].filter(todo=>todo.isComplete===false));
    }
    
    function countRemaining(){
      return todos.filter(todo=>todo.isComplete===false).length;
    }

    function showOptions(){

    }
  return (
      <>
      <button className="show-options-button" onClick={()=>setToggleOpt(prevToggleOpt=>!prevToggleOpt)}>Show options</button>
      <CSSTransition in={toggleOpt} timeout={300} classNames="slide-vertical" unmountOnExit>
      
      <div>
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
      </CSSTransition>
    </>
  );
}

export default Options