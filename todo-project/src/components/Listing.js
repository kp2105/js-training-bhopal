import Listitem from './Listitem';

function Listing({ data }) {


  const rendertodoitems = data.map((item) => {

    return (

      <Listitem item={item}
        key={item} />);
  }
 );

  return (
    <div>
      {rendertodoitems}
    </div>
  );
}
export default Listing;