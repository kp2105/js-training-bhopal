import { useEffect, useState } from 'react';

function AddTask({ addtask, tasktoEdit, editfn }) {

  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  const handleTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  }

  const handleDuration = (event) => {
    setDuration(event.target.value);
  }

  // edit
  useEffect(() => {
    if (Object.keys(tasktoEdit).length > 0) {
      setTaskTitle(tasktoEdit.title);
      setCategory(tasktoEdit.category);
      setDuration(tasktoEdit.duration);
    }
  }, [tasktoEdit]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(tasktoEdit).length > 0) {
      tasktoEdit.title = taskTitle
      tasktoEdit.category = category
      tasktoEdit.duration = duration
      editfn(tasktoEdit);
      setCategory('');
      setDuration('');
      setTaskTitle('');
    } else {
      addtask(taskTitle, category, duration);
      setCategory('');
      setDuration('');
      setTaskTitle('');
    }
  }

  return (
    <section className='create-todo'>
      <form id="todo-form">
        <h4>What's on your todo?</h4>
        <input type="text" value={taskTitle} placeholder="Add your todo here" name="title" id="title" onChange={handleTitle} />

        <h4>Pick a category</h4>
        <div className="options" onChange={handleCategory}>
          <label>Business
            <input type="radio" name="category" id="business" value="business" checked={category === "business"} />
            <span className="bubble business"></span>
          </label>
          <label>Personal
            <input type="radio" name="category" id="personal" value="personal" checked={category === "personal"} />
            <span className="bubble personal"></span>
          </label>
          <label>other
            <input type="radio" name="category" id="other" value="other" checked={category === "other"} />
            <span className="bubble personal"></span>
          </label>
        </div>

        <h4>Duration</h4>
        <div className="options" onChange={handleDuration}>
          <label>1 Hr
            <input type="radio" name="duration" value="1" checked={duration === "1"} />
          </label>
          <label>2 Hr
            <input type="radio" name="duration" value="2" checked={duration === "2"} />
            <span className="bubble personal"></span>
          </label>
          <label>3 Hr
            <input type="radio" name="duration" value="3" checked={duration === "3"} />
            <span className="bubble personal"></span>
          </label>
        </div>
        <input type="submit" value={Object.keys(tasktoEdit).length > 0 ? 'UPDATE' : 'ADD TO DO'} id="submit" onClick={handleFormSubmit} />
      </form>
    </section>
  )
}
export default AddTask;