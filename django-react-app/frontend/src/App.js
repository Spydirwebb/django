import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

const todoItems = [
  {
    id: 1,
    title: "Nature walk in the park",
    description: "Visit the park with my friends",
    completed: true
  },

  {
    id: 2,
    title: "Visit",
    description: "Got to my aunt's place",
    completed: true
  },

  {
    id: 3,
    title: "Write",
    description: "Do an article about anthropology",
    completed: true
  },
];

const TodoModelBlank= {
  title: "",
  description: "",
  completed: false 
}

const App = () => {
  //const [todos, setTodos] = useState(todoItems)
  const [activeItem, setActiveItem] = useState(TodoModelBlank)
  const [viewCompleted, setViewCompleted] = useState(false)
  const [todoList, setTodoList] = useState([])

  useEffect (() => {
    refreshList()
    //console.log('Todo list: '+todoList)
  }, [])
  
  const refreshList = async() => {
    await axios
      //.get('http://localhost:8000/api/todos/')
      .get('https://8000-spydirwebb-django-canuz7re0z4.ws-us67.gitpod.io/api/todos/')
      //.get('http://8000-spydirwebb-django-canuz7re0z4.ws-us65.gitpod.io/api/todos/')
      //.get('http://127.0.0.1:8000/api/todos/')
      .then(res => {
        console.log(res.data)
        setTodoList(res.data)
      })
      .catch(err => console.log(err))
  }

  const renderItems = () => {
    return todoList.map((todo, key) => {
      return (<li key={todo.id}>
        {todo.title}
      </li>)
    })
  }
  /*
  const renderItems = () => {
    //the problem is in here i think?
    //const { viewCompleted } = viewCompleted
    const newTodos = todoList.filter(
      todo => todo.completed === viewCompleted
    )
    return newTodos.map((todo, key) => {
      <li key = {todo.id}
        className='list-group-item d-flex justify-content-between align-items-center'
      >
        <span 
        className={`todo-title mr-2 ${viewCompleted ? 'completed-todo': ''}`}
        title = {todo.description}
        >
          {todo.title}
        </span>
      </li>
    })
  }
  */
  return (
    <main className='content'>
      <h1>Todo List</h1>
      <h3>Where is my list?</h3>
      <div className='row'>
        <div className='col-md-6 col-sm-10 mx-auto p-0'>
          <div className='card p-3'>
            {todoList.length>0 ? <ul>{renderItems(todoList)}</ul>
            : <p>Empty List</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
export default App;