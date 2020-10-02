import React ,{useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import './Todo.css';
import {createTodo} from './helpers/apiTodo';

function AddTask(){

    const user = useSelector(state => state.user);
    if (user.userData && user.userData._id) {
        var userId = user.userData._id;
    }

    const [values,setValues] = useState({
        name:"",
        priority:"Low",
        attachment:"",
        createdTask:"",
        error:"",
        loading:false,
        getRedirect:false,
        formData:""

    });

    const {name,priority,attachment,error,getRedirect,formData,createdTask,loading} = values;
    
    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, [])

    const successMessage = () =>(
        <div style={{display: createdTask?"":"none"}} className="alert alert-success mt-3">
          <h4>{createdTask} created successfully</h4>
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
                <label for="taskName">Name *</label>
                <input 
                type="text" 
                className="form-control" 
                id="taskName" 
                name="name"
                placeholder="Enter your task"
                value={name}
                onChange={handleChange("name")}
                required 
                />
            </div>
        </div>
        <div className="form-row">
            <div className="form-group col-md-4">
                <label for="priority">Priority *</label>
                <select id="priority" className="form-control" onChange={handleChange("priority")} required>
                    <option selected="true" disabled="disabled">Select Priority</option>
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
        <button onClick={onSubmit} type="submit" className="btn btn-primary">Add Task</button>
    </form>
      )

      const onSubmit = (event)=>{
        event.preventDefault()
        setValues({...values, error:"",loading:true})
        createTodo(userId,formData)
            .then(data=>{
                if(data.error){
                    setValues({...values, error: data.error})
                  }
                else{
                    setValues({
                        ...values,
                        name:"",
                        priority:"",
                        attachment:"",
                        loading:false,
                        createdTask:data.name,
                        getRedirect:true
                    })
                }
            })
      }

    return(
        <div className="todo-main">
            <h3 className="text-center todo-heading">Add Task</h3>
            <div className="container">
                {successMessage()}
                  {errorMessage()}
                {createTodoForm()}
                {getRedirect?<Redirect to="/todolist"/>:''} 
            </div>
        </div>
    )
}

export default AddTask;