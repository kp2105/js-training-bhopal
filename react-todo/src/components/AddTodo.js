import React from "react";
import { useState } from "react";

function AddTodo({ addtodo, isEdit }) {
  const business = document.getElementById('business');
  const personal = document.getElementById('personal');
  const todoinput = document.querySelector('#todoinput');

  const [todoitem, settodoitem] = useState('');
  const [category, setcategory] = useState('');
  const handleChange = (event) => {
    settodoitem(event.target.value);
  };

  const handlecategory = (event) => {
    setcategory(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addtodo(todoitem, category);
    business.checked = false;
    personal.checked = false;
    todoinput.value = " ";
  }

  return (
    <div>
      <div>Add ToDo!</div>
      <form id="todo-form" >
        <h3>What's on your todo?</h3>
        <input type='text' id="todoinput" onChange={handleChange} />
        <h3>Pick a category</h3>
        <div onChange={handlecategory}>
          <label>Business</label>
          <input type="radio" name="category" id="business" value="business" />
          <label>Personal</label>
          <input type="radio" name="category" id="personal" value="personal" />
        </div>
        <input type="submit" value={isEdit ? 'Edit' : 'Add to do'} id="submit" onClick={handleFormSubmit} />
      </form>
    </div>
  );
}
export default AddTodo;