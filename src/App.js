import { useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleRemoveItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handlePackedItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        onRemoveItem={handleRemoveItem}
        onPackedItem={handlePackedItem}
        items={items}
      />
      <Stats />
    </div>
  );
};

const Logo = () => {
  return <h1>💕 Far Away 👌</h1>;
};

const Form = (props) => {
  const [description, setDescription] = useState("");
  const [itemNumber, setItemNumber] = useState(1);
  //const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    props.addItem(item);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!description) return;
    const newItem = {
      description,
      quantity: itemNumber,
      packed: false,
      id: Date.now(),
    };

    handleAddItems(newItem);

    setDescription("");
    setItemNumber(1);
  };

  const handleInput = (e) => {
    setDescription(e.target.value);
  };

  const handleSelect = (e) => {
    setItemNumber(Number(e.target.value));
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What Do You Need For Your Trip?</h3>
      <select value={itemNumber} onChange={handleSelect}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={handleInput}
      />
      <button type="submit">Add</button>
    </form>
  );
};

const PackingList = (props) => {
  return (
    <div className="list">
      <ul>
        {props.items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onPackedItem={props.onPackedItem}
            onRemoveItem={props.onRemoveItem}
          />
        ))}
      </ul>
    </div>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      You have X items on your list, and you already packed X
    </footer>
  );
};

const Item = ({ item, onRemoveItem, onPackedItem }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onPackedItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
};
export default App;
