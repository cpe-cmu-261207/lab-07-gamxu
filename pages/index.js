import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {

  const [todos,setTodos] = useState([])

  const [todoInput,setTodoInput] = useState('')


  const deleteTodo = (idx) => {
    todos.splice(idx,1)
    const temp = [...todos]
    setTodos(temp)
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed
    setTodos([...todos])
  };

  const moveUp = (idx) => {
    if(idx>0){
      const TempTi = todos[idx].title
      const TempComp = todos[idx].completed

      todos[idx].title = todos[idx-1].title
      todos[idx].completed = todos[idx-1].completed

      todos[idx-1].title = TempTi
      todos[idx-1].completed = TempComp

      setTodos([...todos])

    }else return;
  };

  const moveDown = (idx) => {
    if(idx<todos.length-1){
      const TempTi = todos[idx].title
      const TempComp = todos[idx].completed

      todos[idx].title = todos[idx+1].title
      todos[idx].completed = todos[idx+1].completed

      todos[idx+1].title = TempTi
      todos[idx+1].completed = TempComp

      setTodos([...todos])

    }else return;
  };

  const addTodo = (todoInput,completed) => {
      setTodos([{title: todoInput, completed: completed}, ...todos])
      setTodoInput("")
  }

  const handleKey = (event) => {
    if(event.key==="Enter"){
      if(event.target.value === ""){
        alert("Todo cannot be empty")
        return;
      }else{
        addTodo(event.target.value,false)
      }
    }
    return;
  }

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onKeyUp={handleKey}
          onChange={(event)=>{setTodoInput(event.target.value)}}
          value={todoInput}
        />
        {/* Todos */}
        {
          todos.map((todoElement,i)=>(
            <Todo
              title={todoElement.title}
              completed={todoElement.completed}
              onMark={()=>markTodo(i)}
              onDelete={()=>deleteTodo(i)}
              onMoveUp={()=>moveUp(i)}
              onMoveDown={()=>moveDown(i)}
            />
          ))
        }

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">Pending ({todos.filter((x)=> x.completed===false).length}) </span>
          <span className="text-success">Completed ({todos.filter((x)=> x.completed===true).length})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Wuttipat Sanchai 640610668
        </p>
      </div>
    </div>
  );
}
