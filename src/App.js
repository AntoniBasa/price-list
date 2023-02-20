import React, { useEffect, useState } from "react";

function ListItem(props) {
  const handleClick = (event) => {
    props.onClick(event.target.getAttribute("data-id"));
  };
  return (
    <React.Fragment>
      <li data-id={props.item.id} onClick={handleClick}>
        Price {props.item.price}: id {props.item.id}
      </li>
      {props.children}
    </React.Fragment>
  );
}

function List(props) {
  if (props.items.length === 0) {
    return null;
  }
  const item = props.items[0];
  const rest = props.items.slice(1);
  return (
    <ListItem item={item} onClick={props.onClick}>
      <List items={rest} onClick={props.onClick} />
    </ListItem>
  );
}

function priceList(array, id) {
  if (array.length === 0) {
    return;
  }
  const item = array.shift();
  return (
    <React.Fragment>
      {item.id === id ? `${item.price},` : null}
      {priceList(array, id)}
    </React.Fragment>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(null);
  const handleClick = (id) => {
    setSelectedId(parseInt(id));
  };
  useEffect(() => {
    setData([
      { id: 1, price: 10 },
      { id: 2, price: 10 },
      { id: 1, price: 15 },
      { id: 3, price: 11 },
      { id: 1, price: 18 },
    ]);
  }, []);

  const itemsForPrice = data ? [...data] : [];
  return (
    <div className="app">
      {data ? (
        <React.Fragment>
          <ul>
            <List items={data} onClick={handleClick} />
          </ul>
          {selectedId ? (
            <React.Fragment>
              <p>Prices for ID {selectedId}:</p>
              <p>{priceList(itemsForPrice, selectedId)}</p>
            </React.Fragment>
          ) : null}
        </React.Fragment>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default App;
