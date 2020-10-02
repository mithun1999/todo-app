import React ,{useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import './Todo.css';
import {getTodoByUser,deleteTodo,getTodoNotArchived} from './helpers/apiTodo';
import loadinggif from "./loading.gif";



function TodoList() {
    const user = useSelector(state => state.user);
    if (user.userData && !user.userData._id) {
        var userId = user.userData._id;
    }
    
    const [todos, setTodos] = useState([]);
    const [loading,setLoading] = useState(false);

    const preload = ()=>{
      setLoading(true)
      getTodoNotArchived(userId)
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                }
                else{
                    setTodos(data)
                    setLoading(false)
                }
            })
    }

    useEffect(() => {
        preload()
    }, []);

    const deleteThisTodo = (todoId)=>{
      deleteTodo(todoId)
        .then(data=>{
          if(data.error){
            console.log(data.error);
          }
          else{
            preload()
          }
        })
    }

    const loadingMessage = () =>(
      <div style={{display: loading?"":"none"}} className="mt-3 text-center">
      <img src={loadinggif}/>
    </div>
    )

    const noDataMessage = () =>(
      <div style={{display:loading?"none":""}} className="alert alert-danger mt-3">
        <h5 className="text-center">No Tasks to do!</h5>
        <h6 className="text-center"><Link to="/addtask">Add Task</Link></h6>
      </div>
    )


    const todoContent = () =>{
      return(
        <div className="container-fluid">
        <div className="archive-section">
          <Link to="/todolist/archived" className="btn btn-primary">Show Archived Tasks</Link>
          
        <button className="btn btn-primary ml-2" onClick={generatePdf}>Download PDF</button>
        </div>
        <table id="todotable" className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Status</th>
                <th scope="col">Name</th>
                <th scope="col">Priority</th>
                <th scope="col">Attachment</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo=>{
                let checked = todo.completed=='Yes'?true:false;
                let downloadLink = `/uploads/${todo.attachment}`;
                var displayPriority;
                if(todo.priority == 1){
                  displayPriority = "Low"
                }
                else if(todo.priority == 2){
                  displayPriority = "Medium"
                }
                else{
                  displayPriority = "High"
                }
                return(
                <tr key={todo._id}>
                <th scope="row"><input type="checkbox" checked={checked} /></th>
                <td>{todo.name}</td>
                <td>{displayPriority}</td>
                <td><a style={{display: todo.attachment? '':'none'}} className="btn btn-secondary btn-sm" href={downloadLink} download><i className="fa fa-download"></i> {todo.attachment}</a></td>
                <td><Link to={`/update/${todo._id}`} className="btn btn-primary btn-sm">Update</Link></td>
                <td><span onClick={()=>{deleteThisTodo(todo._id)}} className="btn btn-danger btn-sm">Delete</span></td>
                </tr>
                )
              })}
            </tbody>
        </table>


        </div>
      );
    }

    const generatePdf = () => {
      const doc = new jsPDF('p', 'pt','a4');
      doc.setFont('helvetica')
      doc.text('Your TODO List',230,40)
      const tableColumn = ['Completed','Name','Priority']
      const tableRow = [];

      todos.forEach(todo=>{
        var priorityPdf;
        if(todo.priority == 1){
          priorityPdf = "Low"
        }
        else if(todo.priority == 2){
          priorityPdf = "Medium"
        }
        else{
          priorityPdf = "High"
        }
        const todoData = [
          todo.completed,
          todo.name,
          priorityPdf
        ];
        tableRow.push(todoData);
      });

      doc.autoTable(tableColumn,tableRow,{startY:70})

      doc.save('todolist.pdf')
    }



    return (
        <>
            <div className="todo-main">
                <h3 className="text-center todo-heading">Your Todo List</h3>
                {loadingMessage()}
                {todos.length>0?todoContent():noDataMessage()}
                
            </div>
        </>
    )
}

export default TodoList;
