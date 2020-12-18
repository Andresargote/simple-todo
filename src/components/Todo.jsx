import React, {useState, useEffect} from "react";
import Axios from "axios";

import "./styles/Todo.css";

function Todo(){

    const [todos, setTodos] = useState({
        data: [],
        loading: true,
    });

    const [input, setInput] = useState({task: ""});

    useEffect(() => {
        Axios({
            method: "get",
            url: "http://localhost:3000/todos",
        })
        .then(response => {
            setTodos({
                data: response.data, 
                loading: false
            });
        })
        .catch(error => console.error(error));
    }, []);

    const handleInput = (e) => {
        setInput({
            task: e.target.value,
        });
    }

    const createTodo = (e) => {
        const newTodo = async () => {
            try{
                const creatingTodo = await Axios.post("http://localhost:3000/todos", input);
                setTodos({data: [...todos.data, creatingTodo.data]});
                setInput({task: ""})
            }catch(error){
                console.error(error);
            }
        }
        e.preventDefault();
        return newTodo();
    }

    const deleteTodo = async (id) => {
        try{
            const deleteTodo = await Axios.delete(`http://localhost:3000/todo/${id}`)
            const filterTodo = todos.data.filter(todo => todo._id !== id);
            setTodos({data: filterTodo});
        }catch(error) {
            console.error(error);
        }
    }

    const updateTodo = async (todoId, id) => {
        try{
            const putTodo = await Axios.put(`http://localhost:3000/todo/${todoId}`, {completed: !todos.data[id].completed});
        }catch(error){
            console.error(error);
        }
        todos.data[id].completed = !todos.data[id].completed;
    }

    const loader = <div className="loadingio-spinner-rolling-5man1h8rye6"><div className="ldio-3lb2qef3qi">
    <div></div>
    </div></div>;

    if(todos.loading){
        return loader;
    }

    return(
        <>
        <form className="form">
            <label>
                <input type="text" placeholder="Write a todo" value={input.task} onChange={handleInput}/>
            </label>
            <button disabled={(input.task === "") ? true : false} onClick={createTodo}>Create a todo</button>
        </form>
        
        {(todos.data.length === 0) ? <p className="todo-notodo animate__animated animate__fadeIn">There are no Todos</p> : todos.data.map((todo, index) => {
            return(
                <div className={todo.completed ? "todo active animate__animated animate__fadeIn" : "todo animate__animated animate__fadeIn"} key={todo._id}>
                    <div className="todo-title">
                        <h3 onClick={() => updateTodo(todo._id, index)} className={todo.completed ? "line" : ""}>{todo.task}</h3>
                    </div>
                    <div className="todo-delete">
                        <span onClick={() => deleteTodo(todo._id)}>x</span>
                    </div>
                </div>
            )
        })}

        </>
    )
}
export default Todo;