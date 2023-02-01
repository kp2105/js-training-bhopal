import React from "react";
import { useState } from "react";

function AddTodo({ addtodo  }) {


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
    addtodo(todoitem,category);
    settodoitem('');
    setcategory('');
  }

  return (

    <div>
      <div>Add ToDo!</div>
      <form id="todo-form" onSubmit={handleFormSubmit}>
        <h3>What's on your todo?</h3>
        <input type='text' value={todoitem} id="cc" onChange={handleChange} />
        <h3>Pick a category</h3>
        <div  onChange={handlecategory}>
          <label>Business</label>
          <input type="radio"  name="category" id="business" value="business" />
          <label>Personal</label>
          <input type="radio" name="category" id="personal" value="personal" />
        </div>
        <input type="submit" value="Add todo" id="submit" />
      </form>

      <button  id="editbtn">edit</button>
    </div>
  );
}
export default AddTodo;