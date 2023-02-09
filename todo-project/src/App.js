import './App.css';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Pagination from './components/Pagination';
import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import SetMsg from './components/SetMsg';

function App() {

  const [task, setTask] = useState(JSON.parse(localStorage.getItem("task")) || []);
  const [showList, setShowlist] = useState([...task]);
  const [message, setMessage] = useState('');
  const [tasktoEdit, settaskToEdit] = useState({});
  const [filter, setfilter] = useState({});

  const handlefilterdata = (array) => {
    setfilter(array);
  }

  useEffect(() => {
    let arr = [...task]
    for (let x in filter) {
      //handlestatus   
      if (filter.status.length > 0) {
        arr = arr.filter((t) => filter.status.includes(t.status))
      }
      //handlecategory filter
      if (filter.category.length > 0) {
        arr = arr.filter((t) => filter.category.includes(t.category))
        // console.log(arr);
      }
      //hadleqyeryparam
      if (filter.queryparam.length > 0) {
        arr = arr.filter((t) => t.title.toLowerCase().includes(filter.queryparam));
      }
    }
    setShowlist(arr);
    setCurrentPage(1);
  }, [filter,task]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = showList.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(showList.length / recordsPerPage);

  //handle adtask functionality
  const addtask = (title, category, duration) => {
    if (title == "") {
      setMessage('please enter valid title')
    } else {
      const updatetask = [
        ...task, { id: Math.floor(Math.random() * 1000), title: title, category: category, duration: duration, status: 'inprogress', expirytime: (Math.round(new Date().getTime() / 60000) + (duration * 60)) }
      ]
      setTask(updatetask);
      // setShowlist(updatetask);
      console.log(nPages);
      setCurrentPage(nPages);
    }
  }

  //ondone when click on task done  
  const handletaskprogress = (item) => {
    const newstatus= task.map((t)=> t.id==item.id ? {...t , status: 'Done' }: t);
    setTask(newstatus);
    // setShowlist(newstatus);
  }

  //handle delete
  const deletetask = (id) => {
    const updatetodo = task.filter((t) => {
      return t.id !== id;
    });
    setTask(updatetodo);
    // setShowlist(updatetodo);
    setCurrentPage(nPages);
    // setMessage('task deleted sucessfully');
  }

  //pass obj to edit 
  const edittask = (obj) => {
    settaskToEdit(obj);
  }

  //handle edit logic
  const editfn = (ob) => {
    const editedarray = task.map((t) => {
      if (t.id == ob.id) {
        return { ...t, title: ob.title, category: ob.category, duration: ob.duration }
      }
      return t;
    });
    setTask(editedarray);
    setMessage('task edited sucessfully');
    //to blank the fields after edit done
    settaskToEdit({});
  }


  //tocheck the status of task
  useEffect(() => {
    const date = new Date();
    let currentTime = Math.round(date.getTime() / 60000);
    const newState = task.map((obj) =>
      obj.expirytime < currentTime
        ? { ...obj, status: "Expired" }
        : obj
    );
    localStorage.setItem('task', JSON.stringify(newState));
  }, [task]);

  task && localStorage.setItem("task", JSON.stringify(task));

  return (
    <div className="App">
      <SetMsg message={message} />
      <AddTask addtask={addtask} tasktoEdit={tasktoEdit} editfn={editfn} />
      <TaskList task={currentRecords} onDelete={deletetask} onEdit={edittask} onDone={handletaskprogress} handlefilterdata={handlefilterdata} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
