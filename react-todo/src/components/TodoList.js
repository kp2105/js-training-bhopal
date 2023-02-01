import DisplayToDo from './DisplayToDo';

function TodoList({ todoitem, onDelete, onEdit }) {
  const rendertodoitems = todoitem.map((item) => {
    return <DisplayToDo onDelete={onDelete}  onEdit={onEdit} key={item.id} item={item} />;
    // return <li>{item.title}<button className="edit-btn" id="edit-btn" onClick="">Edit</button><button className="delete-btn"  id="deletebtn" onClick={onDelete(item.id)}>Delete</button></li>
  });
  return <div>{rendertodoitems}</div>;
}

export default TodoList;

