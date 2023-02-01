import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { useState } from 'react';
import Pagination from './components/Pagination';

let item;
function App() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("MyTasks")) || []);

  const deletetodo = (id) => {
    const updatetodo = todo.filter((t) => {
      return t.id !== id;
    });
    setTodo(updatetodo);
  };

  const edittodo = (id) => {
    let index = todo.findIndex((x) => x.id == id);
    item = document.querySelector('#cc');
    item.value = todo[index].title;
    const editBtn = document.getElementById('editbtn');
    editBtn.style.display='block'

    const submitbtn=document.getElementById('submit');
    submitbtn.style.display='none';
    console.log(submitbtn);
    editBtn.addEventListener("click", function () {
      const renderedArray = todo.map((task, index) => {
        if (task.id === id) {
          return { ...task, title: item.value }
        }
        return task;
      })
      setTodo(renderedArray);
    })

    // submitbtn.style.display='block';
    // editBtn.style.display='none';

  }

  const addtodo = (title, category) => {
    const updatetodo = [
      ...todo, { id: Math.floor(Math.random() * 1000), title: title, category: category }
    ]
    setTodo(updatetodo);
  }

  todo && localStorage.setItem("MyTasks", JSON.stringify(todo));

  return (
    <div className="App">
      <h3>To Do App</h3>
      <div><AddTodo addtodo={addtodo} /></div>
      <TodoList todoitem={todo} onDelete={deletetodo} onEdit={edittodo} />
      <Pagination/>
    </div>
  );
}
export default App;
