import {useState, useEffect} from "react";
import Axios from "axios";

export const useGetTodos = () => {

    const url = `https://simple-todo-andres.herokuapp.com/todos`;

    const [todos, setTodos] = useState({
        data: [],
        loading: true,
    });

    useEffect(() => {
        Axios({
            method: "get",
            url,
        })
        .then(response => {
            setTodos({
                data: response.data, 
                loading: false
            });
        })
        .catch(error => console.error(error));
    }, []);

    const createTodo = async (e, input, setInput) => {
        e.preventDefault();
        try{
            const creatingTodo = await Axios.post("https://simple-todo-andres.herokuapp.com/todos", input);
            setTodos({data: [...todos.data, creatingTodo.data]});
            setInput({task: ""})
        }catch(error){
            console.error(error);
        }

    }

    const deleteTodo = async (id) => {
        try{
            const deletingTodo = await Axios.delete(`https://simple-todo-andres.herokuapp.com/todo/${id}`)
            const filterTodo = todos.data.filter(todo => todo._id !== id);
            setTodos({data: filterTodo});
        }catch(error) {
            console.error(error);
        }
    }

    const updateTodo = async (e, id) => {
        e.stopPropagation();
        try{
            const payload = {
                completed: !todos.data.find(todo => todo._id === id).completed,
            }
            const updatingTodo = await Axios.put(`https://simple-todo-andres.herokuapp.com/todo/${id}`, payload);
            const updatedTodos = todos.data.map(todo => {
                if(todo._id === id){
                    todo.completed = payload.completed
                }
                return todo;
            })
            setTodos({data: updatedTodos})
        }catch(error){
            console.error(error);
        }
    }

    return{
        todos,
        createTodo,
        deleteTodo,
        updateTodo,
    }

}
