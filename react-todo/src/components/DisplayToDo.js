function DisplayToDo({ item, onDelete, onEdit }) {
  const handlDelete = () => {
    onDelete(item.id);
  }
  const handleEdit = () => {
    onEdit(item.id);
  }
  return (
    <ul id="paginated-list">
      <li class="li">{item.title}<button className="edit-btn" id="edit-btn" onClick={handleEdit}>Edit</button><button className="delete-btn" id="deletebtn" onClick={handlDelete}>Delete</button></li>
    </ul>
  );
}
export default DisplayToDo;