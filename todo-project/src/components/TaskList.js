import { useState } from 'react';
import DisplayTask from './DisplayTask';
import Filter from './Filter';

function TaskList({ task, onDelete, onEdit, onDone, handlefilterdata }) {

  const rendertodoitems = task.map((item) => {
    return (<DisplayTask item={item} onDelete={onDelete} onEdit={onEdit} onDone={onDone}
      key={item.id} />);
  });
  return (
    <div className='grid-container'>
      <div className='grid-item filter-container' >
        <Filter handlefilterdata={handlefilterdata} />
      </div>
      <div className='grid-item'>
        {rendertodoitems}
      </div>
    </div>
  );
}
export default TaskList;
