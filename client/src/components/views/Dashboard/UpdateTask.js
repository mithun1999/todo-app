import React ,{useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import './Todo.css';
import {updateTodo, getTodo} from './helpers/apiTodo';

function UpdateTask({match}){

    const user = useSelector(state => state.user);
    if (user.userData && user.userData._id) {
        var userId = user.userData._id;
    }

    const [values,setValues] = useState({
        name:"",
        priority:"Low",
        attachment:"",
        completed:"",
        archived:"",
        updatedTask:"",
        error:"",
        loading:false,
        getRedirect:false,
        formData:""

    });

    const {name,priority,attachment,error,getRedirect,formData,updatedTask,loading,completed,archived} = values;

    const preload = (todoId)=>{
        getTodo(todoId).then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }
            else{
                setValues({
                    ...values,
                    name:data.name,
                    priority:data.priority,
                    completed:data.completed,
                    archived:data.archived,
                    formData:new FormData()
                })
            }
        })
    }

    
    useEffect(() => {
        preload(match.params.todoId);
    }, [])




    const successMessage = () =>(
        <div style={{display: updatedTask?"":"none"}} className="alert alert-success mt-3">
          <h4>{updatedTask} updated successfully</h4>
        </div>
      )
  
      const errorMessage = () =>(
        <div style={{display: error?"":"none"}} className="alert alert-danger mt-3">
          <h4>{error}</h4>
        </div>
      )

      const handleChange = name => event => {
        const value = name==="attachment" ? event.target.files [0] : event.target.value;
        formData.set(name,value);
        setValues({...values, [name]:value})
    }

      const createTodoForm = () => (

        <form>
        <div className="form-row">
            <div className="form-group col-md-8">
                <label for="taskName">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="taskName" 
                name="name"
                placeholder="Enter your task"
                value={name}
                onChange={handleChange("name")} 
                />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-4">
                <label for="completed">Completed</label>
                <select value={completed} id="completed" className="form-control" onChange={handleChange("completed")}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="form-group col-md-4">
                <label for="archived">Archived</label>
                <select value={archived} id="archived" className="form-control" onChange={handleChange("archived")}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
        </div>


        <div className="form-row">
            <div className="form-group col-md-4">
                <label for="priority">Priority</label>
                <select value={priority} id="priority" className="form-control" onChange={handleChange("priority")}>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>
            </div>
            <div className="form-group col-md-4">
                <label for="attachment">Attachment</label>
                <input type="file" className="form-control" id="attachment" name="attachment" onChange={handleChange("attachment")} />
            </div>
        </div>
        <button onClick={onSubmit} type="submit" className="btn btn-primary">Update Task</button>
    </form>
      )

      const onSubmit = (event)=>{
        event.preventDefault()
        setValues({...values, error:"",loading:true})
        updateTodo(match.params.todoId,formData)
            .then(data=>{
                if(data.error){
                    setValues({...values, error: data.error})
                  }
                else{
                    setValues({
                        ...values,
                        name:data.name,
                        priority:data.priority,
                        completed:data.completed,
                        archived:data.archived,
                        attachment:"",
                        loading:false,
                        updatedTask:data.name,
                        getRedirect:true
                    })
                }
            })
      }

    return(
        <div className="todo-main">
            <h3 className="text-center todo-heading">Update Task</h3>
            <div className="container">
                {successMessage()}
                  {errorMessage()}
                {createTodoForm()}
                 {getRedirect?<Redirect to="/todolist"/>:''} 
            </div>
        </div>
    )
}

export default UpdateTask;