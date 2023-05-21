import React, { useState } from 'react';
import './AddMas.css';

function AddMas() {

const data = [
    { id: 1 , name: 2023 },
    { id: 2 , name: 2024 },
    { id: 3 , name: 2025 },
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  function handleSelection(event, item) {
    // When an item is selected or deselected, update the list of selected items
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Convert the selected items to a JSON object
    const selectedItemsJson = JSON.stringify(selectedItems);

    // Send the JSON object to the Laravel backend
    // fetch('/api/save-items', {
    //   method: 'POST',
    const body = {body11 :selectedItems};
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));
    console.log(body);
  }

    // Split the data array into multiple arrays for each column
    const columnCount = 3;
    const rowCount = Math.ceil(data.length / columnCount);
    const columns = Array.from({ length: columnCount }, (_, i) =>
      data.slice(i * rowCount, (i + 1) * rowCount)
    );

  return (
    <div>
    <div className='container'>
    <div className="container">
      {columns.map((column, i) => (
        <div className="column" key={i}>
          {column.map((item) => (
           <div className='item' key={item.id}>
                <input
                    type="checkbox"
                    id={item.id}
                    value={item.id}
                    onChange={(event) => handleSelection(event, item)}
                />
                <label htmlFor={item.id}>{item.name}</label>
            </div>
          ))}
        </div>
      ))}
    <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        {data.map((item) => (
          <div key={item.id}>
            <input
              type="checkbox"
              id={item.id}
              value={item.id}
              onChange={(event) => handleSelection(event, item)}
            />
            <label htmlFor={item.id}>{item.name}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default AddMas;