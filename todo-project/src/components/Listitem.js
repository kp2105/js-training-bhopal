import { useState } from 'react';
function Listitem({ item }) {

  const arr = [{ ...item }]

  const [ischild, setischild] = useState(false);
  const [firstchild, setfirstchild] = useState([]);
  const [secchild, setsecchild] = useState([]);


  const parentclick = (parent) => {
    setfirstchild(parent.items);
  }

  const firstchildclick = (subchild) => {
    console.log(subchild.items);
    setsecchild(subchild.items);
  }

  return (

    <>
      {arr.map(parent => (
        <ul key={parent} onClick={() => parentclick(parent)}>
          {parent.name}

          {parent.isFolder ? firstchild.map(child => (
            <li key={child} onClick={() => firstchildclick(child)}>
              {child.name}

              {child.isFolder ? secchild.map(subchild => (
                <ul key={subchild}>
                  {subchild.name}
                </ul>)) : ''}

            </li>)) : ''}

        </ul>))}

    </>

  );
}
export default Listitem;
