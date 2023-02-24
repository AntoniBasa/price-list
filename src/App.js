import React, { useEffect, useState } from "react";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState(null);
  const priceMap = new Map();

  useEffect(() => {
    setData([
      { id: 1, price: 10 },
      { id: 2, price: 10 },
      { id: 1, price: 15 },
      { id: 3, price: 11 },
      { id: 1, price: 18 },
    ]);
  }, []);

  const handleClick = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="app">
      {data ? (
        <React.Fragment>
          <ul>
            {data.map(({ id, price }, index) => {
              if (priceMap.has(id)) {
                priceMap.set(id, `${priceMap.get(id)}, ${price}`);
              } else {
                priceMap.set(id, `${price}`);
              }
              return(
              <li key={index} onClick={() => handleClick(id)}>
                Price {price}: id {id}
              </li>
              )
            })}
          </ul>
          <p>Prices for ID {selectedId}:</p>
          {selectedId && <p>{priceMap.get(selectedId)}</p>}
        </React.Fragment>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default App;
