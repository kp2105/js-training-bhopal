function Search({ alltodo }) {
  const searchResult = () => {
    let searchinput = document.getElementById('searchinput').value;
    document.getElementById("demo").innerHTML = alltodo.filter(myfunction);

    function myfunction(t) {
      if (t.title == searchinput) {
       // console.log(t.title);
        return t.title;
      }
    }
  }
  return (<div className="search-section"><input type='text' id="searchinput" placeholder="Search your Todo Here" /><button className="searchbtn" onClick={searchResult}>Search</button></div>)
}
export default Search;