function DisplayTask({ item, onDelete, onEdit, onDone }) {

  const handlDelete = () => {
    onDelete(item.id);
  }
  const handleEdit = () => {
    onEdit(item);
  }
  const handleDone = () => {
    onDone(item);
  }

  return (
    <div>
      <ul id="paginated-list">
        <li className={item.status} id="li">{item.title}<span className="status">{item.status}</span>
        <button className="edit-btn" id={item.status} disabled={item.status == 'Expired' || item.status == 'Done'} onClick={handleEdit}>Edit</button>
        <button className="delete-btn" id="deletebtn" onClick={handlDelete}>Delete</button>
        <button className="done-btn" id={item.status} onClick={handleDone} disabled={item.status == 'Expired' || item.status == 'Done'}>Done</button>
        </li>
      </ul>
      <div>
      </div>
    </div>
  );
}
export default DisplayTask;