import { useSelector } from "react-redux";
import {TODO_API} from "../../../../components/Config";


export const createTodo = (userId,list)=>{
    return fetch(`${TODO_API}/create/${userId}`,{
        method: "POST",
        body: list
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


export const getTodoByUser = (userId)=>{

    return fetch(`${TODO_API}/list/${userId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err));
}

export const getTodo = (todoId)=>{
    return fetch(`${TODO_API}/${todoId}`,{
        method: "GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const deleteTodo = (todoId)=>{
    return fetch(`${TODO_API}/delete/${todoId}`,{
        method: "DELETE"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
};


export const updateTodo = (todoId,list)=>{
    return fetch(`${TODO_API}/update/${todoId}`,{
        method:"PUT",
        body:list
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const getTodoArchived = (userId)=>{
    return fetch(`${TODO_API}/list/archive/${userId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err));
}

export const getTodoNotArchived = (userId)=>{
    return fetch(`${TODO_API}/list/notarchive/${userId}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err));
}