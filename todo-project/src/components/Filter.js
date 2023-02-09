import { useState, useEffect } from 'react';

function Filter({ handlefilterdata }) {

  const [filtercategory, setFilterCategory] = useState([]);
  const [taskStatus, SetTaskStaus] = useState([]);
  const [query, Setquery] = useState('');
  const [selectedfilter, setSelectedFilter] = useState({ category: [], status: [], queryparam: '' })
  //handle what user search in searchbox
  const handlesearchinput = (event) => {
    Setquery(event.target.value);
    setSelectedFilter({ category: [...filtercategory], status: [...taskStatus], queryparam: event.target.value });
  }
  //handle which category is clicked by user in filter
  const handleFilterCategory = (event) => {
    if (event.target.checked) {
      setFilterCategory([...filtercategory, event.target.value]);
    }
    else {
      setFilterCategory(
        filtercategory.filter((e) => e !== event.target.value))
    }
    //set selected value of category to selected filter 
    if (event.target.checked) {
      setSelectedFilter({ category: [...filtercategory, event.target.value], status: [...taskStatus], queryparam: query })
    }
    else {
      setSelectedFilter({
        category: filtercategory.filter((e) => e !== event.target.value), status: [...taskStatus], queryparam: query
      });
    }
  }

  //handle which status is clicked by user in filter
  const handleTaskStatus = (event) => {
    if (event.target.checked) {
      SetTaskStaus([...taskStatus, event.target.value]);
    }
    else {
      SetTaskStaus(
        taskStatus.filter((e) => e !== event.target.value))
    }
    //set selected value of status to selected filter 
    if (event.target.checked) {
      setSelectedFilter({ category: [...filtercategory], status: [...taskStatus, event.target.value], queryparam: query })
    }
    else {
      setSelectedFilter({
        category: [...filtercategory],
        status: taskStatus.filter((e) => e !== event.target.value),
        queryparam: query
      });
    }
  }

  //send selected filter data to app.js 
  useEffect(() => {
    handlefilterdata(selectedfilter);
  }, [selectedfilter]);

  return (
    <div >
      <input type='text' id="searchinput" placeholder="Search your Todo Here" onChange={handlesearchinput} />
      <h3>filter by category and status</h3>
      <h3> choose category</h3>
      <div onChange={handleFilterCategory}>
        <label class="container">Business
          <input type="checkbox" value='business' />
          <span class="checkmark"></span>
        </label>
        <label class="container">Personal
          <input type="checkbox" value='personal' />
          <span class="checkmark"></span>
        </label>
        <label class="container">Other
          <input type="checkbox" value='other' />
          <span class="checkmark"></span>
        </label>
      </div>
      <h3>choose task status</h3>
      <div onChange={handleTaskStatus}>
        <label class="container">InProgress
          <input type="checkbox" value='inprogress' />
          <span class="checkmark"></span>
        </label>
        <label class="container">Complete
          <input type="checkbox" value='Done' />
          <span class="checkmark"></span>
        </label>
        <label class="container">Expire
          <input type="checkbox" value='Expired' />
          <span class="checkmark"></span>
        </label>
      </div>
    </div>)
}
export default Filter;