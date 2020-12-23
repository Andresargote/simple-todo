import React, {useState} from "react";

import {useGetTodos} from "../hooks/useGetTodos";
import {Loader} from "./Loader";

import "./styles/Todo.css";

function Todo(){

    const [input, setInput] = useState({task: ""});
    const {todos, createTodo, deleteTodo, updateTodo} = useGetTodos();
    const {data, loading} = todos;

    const handleInput = (e) => {
        setInput({
            task: e.target.value,
        });
    }

    if(loading){
        return <Loader/>;
    }

    return(
        <>
        <form className="form">
            <label>
                <input type="text" placeholder="Write a todo" value={input.task} onChange={(e) => handleInput(e)}/>
            </label>
            <button disabled={(input.task === "") ? true : false} onClick={(e) => createTodo(e, input, setInput)}>Create a todo</button>
        </form>        
        
        {(data.length === 0) ? <p className="todo-notodo animate__animated animate__fadeIn">There are no Todos</p> : data.map(({_id, completed, task}) => {
            return (
                <div key={_id} className={completed ? "todo active animate__animated animate__fadeIn" : "todo animate__animated animate__fadeIn"}>
                    <div className="todo-title">
                        <h3 onClick={(e) => updateTodo(e, _id)} className={completed ? "line" : ""}>{task}</h3>
                    </div>
                    <div className="todo-delete">
                        <span onClick={(e) => deleteTodo(_id)}>x</span>
                    </div>
                </div>
            )
        })}

        </>
    )
}
export default Todo;