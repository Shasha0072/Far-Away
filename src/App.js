import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: true },
];

const App = () => {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
};

const Logo = () => {
  return <h1>💕 Far Away 👌</h1>;
};

const Form = () => {
  const [description, setDescription] = useState("");
  const [itemNumber, setItemNumber] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(description, itemNumber);
    setDescription("");
    setItemNumber(1);
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
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

const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
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

const Item = ({ item }) => {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
};
export default App;
