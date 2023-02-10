import { useState } from 'react';
function Listitem({ item }) {

  // const arr = [{ ...item }]


  const [ischild, setischild] = useState(false);
  const [firstchild, setfirstchild] = useState([]);
  const [secchild, setsecchild] = useState([]);


  const handleparent = () => {
    if (item.isFolder == true) {
      setfirstchild(item.items);
    }else{
      setfirstchild([]);
    }
  }

  const handlebtnclick = (f) => {
    console.log(f);
    console.log(f.items);
    if (f.isFolder) {
      setsecchild(f.items);
    } else {
      setsecchild([]);
    };
  }


  // const name = arr.map(element => element.name);

  // let f1 = [];
  // const parentclick = (e) => {
  //   // f1 = [e.items];
  // }
  // console.log(f1);

  return (

  
    // <>
    //   {arr.map(e => (
    //     <li key={e} onClick={() => parentclick(e)}>
    //       {e.name}

    //       {e.isFolder == true ? f1.map(f => (<li>{f.name}</li>)) : ''}

    //     </li>
    //   ))}

    // </>


    <ul  key={item} onClick={handleparent}>
      {item.name}

      {firstchild.map(f => (
        <li className="fc" key={f} onClick={() => handlebtnclick(f)}>
          {f.name }

          {secchild.map(s => (<a key={s} className='sc'>{s.name}</a>))}

        </li>
      ))}

    </ul>

  );
}
export default Listitem;
