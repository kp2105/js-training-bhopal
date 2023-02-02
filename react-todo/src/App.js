import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { useState } from 'react';
import Pagination from './components/Pagination';
import SetMsg from './components/SetMsg';
import Search from './components/Search';
let item;
let uid;

function App() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("MyTasks")) || []);
  const [message, setMessage] = useState("");
  const [isEdit, setisEdit] = useState(false);

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page   
  const [recordsPerPage] = useState(3);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = todo.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(todo.length / recordsPerPage);

  //Delete Task
  const deletetodo = (id) => {
    const updatetodo = todo.filter((t) => {
      return t.id !== id;
    });
    setTodo(updatetodo);
    setMessage("Task deleted!!");
    setTimeout(function () {
      document.querySelector('#msgbox').innerHTML = '';
    }, 1000)
  };

  //Edit Task
  const edittodo = (id) => {
    let index = todo.findIndex((x) => x.id == id);
    item = document.querySelector('#todoinput');
    document.getElementById(todo[index].category).checked = true;
    item.value = todo[index].title;
    uid = id;
    setisEdit(true);
  }

  //Add Task
  const addtodo = (title, category) => {
    let editval = document.querySelector('#submit').value;
    const business = document.getElementById('business');
   const personal = document.getElementById('personal');

    if (editval == 'Edit') {
      const renderedArray = todo.map((task, index) => {
        if (task.id == uid) {
          return { ...task, title: item.value }
        }
        return task;
      })
      setTodo(renderedArray);
      setisEdit(false);
      setMessage('ToDo edited sucessfully');
      setTimeout(function () {
        document.querySelector('#msgbox').innerHTML = '';
      }, 1000)
      item.value = '';
      business.checked=false;
      personal.checked=false;
    }
    else {
      const updatetodo = [
        ...todo, { id: Math.floor(Math.random() * 1000), title: title, category: category }
      ]
      setTodo(updatetodo);
      setMessage('ToDo added sucessfully');
      setTimeout(function () {
        document.querySelector('#msgbox').innerHTML = '';
      }, 1000)     
    }
  }

  todo && localStorage.setItem("MyTasks", JSON.stringify(todo));

  return (
    <div className="App">
      <h3>To Do App</h3>
      <SetMsg message={message} />
      <div><AddTodo addtodo={addtodo} isEdit={isEdit} /></div>
      <Search alltodo={todo}/>
      <TodoList todoitem={currentRecords} onDelete={deletetodo} onEdit={edittodo} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
export default App;
