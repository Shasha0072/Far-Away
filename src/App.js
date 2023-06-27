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

  const handleClearItems = () => {
    setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        onRemoveItem={handleRemoveItem}
        onPackedItem={handlePackedItem}
        onClearItems={handleClearItems}
        items={items}
      />
      <Stats items={items} />
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
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;
  if (sortBy === "input") sortedItem = props.items;
  if (sortBy === "description") {
    sortedItem = props.items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItem = props.items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            onPackedItem={props.onPackedItem}
            onRemoveItem={props.onRemoveItem}
          />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>
      </div>
      <button onClick={props.onClearItems}>Clear List</button>
    </div>
  );
};

const Stats = ({ items }) => {
  const numItems = items.length;
  const packed = items.reduce((acc, curr) => acc + (curr.packed ? 1 : 0), 0);
  return (
    <footer className="stats">
      You have {numItems} items on your list, and you already {packed} items (
      {Math.round((packed / numItems) * 100)} %)
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
