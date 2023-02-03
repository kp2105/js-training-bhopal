function Search({ handlesearch }) {

  const searchResult = () => {
    handlesearch();
  };
  return (<div className="search-section"><input type='text' id="searchinput" placeholder="Search your Todo Here" /><button id="searchbtn" onClick={searchResult}>Search</button></div>)
}
export default Search;