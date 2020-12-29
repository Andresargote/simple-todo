import {useState, useEffect} from "react";
import Axios from "axios";

export const useGetTodos = () => {

    const [todos, setTodos] = useState({
        data: [],
        loading: true,
    });

    useEffect(() => {
        Axios({
            method: "get",
            url: "http://localhost:3001/todos",
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
            const creatingTodo = await Axios.post("http://localhost:3001/todos", input);
            setTodos({data: [...todos.data, creatingTodo.data]});
            setInput({task: ""})
        }catch(error){
            console.error(error);
        }

    }

    const deleteTodo = async (id) => {
        try{
            const deletingTodo = await Axios.delete(`http://localhost:3001/todo/${id}`)
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
            const updatingTodo = await Axios.put(`http://localhost:3001/todo/${id}`, payload);
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
