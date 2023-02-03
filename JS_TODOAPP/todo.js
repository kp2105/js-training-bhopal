function generateID() {
  return Math.floor(Math.random() * 1000);
}

function message(message, status) {
  return msgbox.innerHTML = message;
}

const item = document.getElementById('content');
const msgbox = document.getElementById("msg");
const heading = document.getElementById("heading");
const btn = document.getElementById('submit');
const business = document.getElementById('business');
const personal = document.getElementById('personal');
const newTodoForm = document.querySelector('#new-todo-form');
let edit = false;
let editID;
let todo = [];
todo = JSON.parse(localStorage.getItem('todos')) || [];

//variables for pagination
const todolist = document.getElementById("todo-list");
const listItems = todolist.querySelectorAll("li");
const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const itemperpage = 3;
let currentPage;
let pageCount = Math.ceil(todo.length / itemperpage);
let prevRange;
let currRange;
let pageNumber;
let queryParam;

// set current page dynamically
window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);
  handlebtn();
});

const handlebtn = () => {
  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });
  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
        // window.location.href = 'file:///home/lenovo/JS_TODOAPP/index.html?page=' + pageIndex;
      });
    }
  });
}

//create pageNo html
const appendPageNumber = (index) => {
  pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};

//upto which page we have to create page no
const getPaginationNumbers = () => {
  document.getElementById('pagination-numbers').innerHTML = '';
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

// what to display on current page and hidden and remove hidden class
const setCurrentPage = (pageNum) => {

  currentPage = pageNum;
  handlePageButtonsStatus();
  handleActivePageNumber();
  prevRange = (pageNum - 1) * itemperpage;
  currRange = pageNum * itemperpage;
  DisplayTodos(prevRange, currRange);
};

//handle active page class
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

//add to localstorage
newTodoForm.addEventListener('submit', e => {
  e.preventDefault();
  if (item.value == "" || business.checked == false & personal.checked == false) {
    message("please enter a todo item");
    setTimeout(function () {
      msg.innerHTML = "";
    }, 2000)
  }
  else if (edit) {
    currentvalue = item.value;
    todo[editID].todoname = currentvalue;
    message("ToDo edited sucessfully");
    setTimeout(function () {
      msg.innerHTML = "";
    }, 2000)
    edit = false;
    btn.value = 'ADD TO DO';
    heading.innerHTML = 'CREATE TO DO';
    setCurrentPage(currentPage);

  }
  else {
    let obj = {
      id: generateID(),
      todoname: item.value,
      category: e.target.elements.category.value,
    }
    todo.push(obj);
    message("TO DO CREATED");
    setTimeout(function () {
      msg.innerHTML = "";
    }, 2000)
  }
  localStorage.setItem('todos', JSON.stringify(todo));
  DisplayTodos(prevRange, currRange);
  pageCount = Math.ceil(todo.length / itemperpage);
  getPaginationNumbers();
  // setCurrentPage(pageCount);
  handlebtn();
  item.value = "";
  business.checked = false;
  personal.checked = false;
})

function DisplayTodos(prevRange, currRange) {
  todolist.innerHTML = "";
  todo.forEach((item, index) => {
    if (index >= prevRange && index < currRange) {
      let element = document.createElement('li');
      element.innerHTML = `<input type="checkbox">${item.todoname}<button class="edit-btn" id="edit-btn" onclick="edititem(${item.id})">Edit</button><button class="delete-btn"  id="deletebtn" onclick="deleteitem(${item.id})">Delete</button>`;
      todolist.appendChild(element);
    }
  });
}

function deleteitem(id) {

  todo = todo.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todo));
  DisplayTodos(prevRange, currRange);
  getPaginationNumbers();
  setCurrentPage(pageCount);
  // handlebtn();
  // window.location.reload();
  message("To do Deleted");
  setTimeout(function () {
    msg.innerHTML = "";
  }, 2000)
}

function edititem(id) {
  edit = true;
  let index = todo.findIndex((x) => x.id == id);
  editID = index;
  item.value = todo[index].todoname;
  document.getElementById(todo[index].category).checked = true;
  btn.value = 'save';
  heading.innerHTML = 'Edit ToDo';
  setCurrentPage(currentPage);
}


// disable previous button and next buttton
const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};
const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {

  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

//adding url pagination
//  let urlparams = new URLSearchParams(location.search);
// console.log(urlparams);
// for ( const value of urlparams.values()) {
//   queryParam = value;
// }
// if (queryParam) {
//   setCurrentPage(queryParam);
// }

function handlesearch(value) {
  if (value) {
    let searchinput = document.getElementById('searchinput').value;
    const newres = todo.filter((t) => {
      return t.todoname == searchinput;
    });
    todolist.innerHTML = "";
    document.getElementsByClassName('pagination-container')[0].style.display = 'none';
    newres.forEach((item, index) => {
      let element = document.createElement('li');
      element.innerHTML = `<input type="checkbox">${item.todoname}<button class="edit-btn" id="edit-btn" onclick="edititem(${item.id})">Edit</button><button class="delete-btn"  id="deletebtn" onclick="deleteitem(${item.id})">Delete</button>`;
      todolist.appendChild(element);
    })
  } else {
    DisplayTodos(0, 3);
    document.getElementsByClassName('pagination-container')[0].style.display = 'inline';
  }
}