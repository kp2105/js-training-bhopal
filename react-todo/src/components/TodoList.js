import DisplayToDo from './DisplayToDo';

function TodoList({ todoitem, onDelete, onEdit }) {
  const rendertodoitems = todoitem.map((item) => {
    return (<DisplayToDo onDelete={onDelete} onEdit={onEdit} key={item.id} item={item} />);
  });
  return <div className="todolist">{rendertodoitems}</div>;
}

export default TodoList;

