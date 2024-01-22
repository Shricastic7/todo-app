import React, {useEffect, useState} from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";


function Home() {
  //declared todos variable as empty array and setTodos fuction will be used to modify the variable
  const [todos, setTodos] = useState([])  
  useEffect(() =>{
    axios.get('http://localhost:3000/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  }, [])
  
  const handleEdit = (id) => {
    axios.put(`http://localhost:3000/update/${id}`)
      .then(result => {
        setTodos(prevTodos => prevTodos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: true };
          }
          return todo;
        }));
      })
      .catch(err => console.log(err));
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(result => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="home">
      <h2> Todo App </h2>
      
      <Create />
      
      {
        todos.length === 0 
        ?
        <div><h2>no records</h2></div>
        :
        todos.map(todo =>(
          <div key={todo._id} className='task'>
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done?
              <BsFillCheckCircleFill className='icon'/>
              :<BsCircleFill className='icon'/>
              } 
              <p className={todo.done? "line-through" :""}>{todo.task}</p>
            </div>
            <div>
              <span>
              <BsFillTrashFill className='icon' onClick={()=>handleDelete(todo._id)}/>
              </span>
            </div>
            
          </div>
        ))
      }
    </div>
  )
}

export default Home
