import React, { useEffect, useState } from 'react'
import "./style.css"

// get the localstorage data back
const getLocalData =() => {
  const lists = localStorage.getItem("mytodolist");

  if(lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
}

const Todo = () => {
  document.title = `TodoList`;
  const [inputdata,setInputdata] = useState("");
  const [items,setItems] = useState(getLocalData());
  const[isEditItem, setisEditItem] = useState("");
  const[toggleButton,setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if(!inputdata) {
      alert("please fill the data")
    }else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if(curElem.id === isEditItem) {
            return{...curElem,name:inputdata};
          }
          return curElem;
        })
      );
      setInputdata([]);
      setisEditItem(null);
      setToggleButton(false);
    }
     else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items,myNewInputData]);
      setInputdata("");
    }
  };

  // edit the item
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputdata(item_todo_edited.name);
    setisEditItem(index);
    setToggleButton(true);
  };

  // delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id != index;
    });
    setItems(updatedItems);
  };

  // remove all items
  const removeAll = () => {
    setItems([]);
  };

  // adding localstorage
  useEffect(() => {
    localStorage.setItem("mytodolist" ,JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
            <img src="./images/todo.png" alt="todologo" />
            <figcaption>Add your items here ✌</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='✍ Add items' className='form-control'
                value={inputdata}
                onChange={(event) => setInputdata(event.target.value)}/>
                {
                  toggleButton ? (
                    <i className="fa fa-edit add-btn" onClick={addItem}></i>
                  ) : (
                    <i className="fa fa-plus add-btn" onClick={addItem}></i>
                  )}
            </div>

            {/* show our items */}
            <div className="showItems">
              {
                items.map((curElem) => {
                  return (
                    <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                    </div>
                   </div>
                  );
                })}
              
            </div>
            <div className="showItems">
              <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                <span>CHECKLIST</span>
              </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo;
