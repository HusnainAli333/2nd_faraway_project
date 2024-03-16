import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems((items) => {
      return [...items, item];
    });
  }
  function handleDeleteItems(id) {
    setItems((items) => {
      return items.filter((value) => {
        return value.id !== id;
      });
    });
  }
  function handlePacked(id) {
    setItems((items) => {
      return items.map((value) => {
        return value.id === id ? { ...value, packed: !value.packed } : value;
      });
    });
  }
  return (
    <div className="app">
      <Logo />
      <Form handleItems={handleItems} />
      <PackingList
        items={items}
        handleDeleteItems={handleDeleteItems}
        handlePacked={handlePacked}
        setItems={setItems}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>👜 Far Away</h1>;
}

function Form({ handleItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do You need for Your Trip?😎</h3>
      <select
        value={quantity}
        onChange={(event) => {
          return setQuantity(event.target.value);
        }}
      >
        {Array.from({ length: 20 }, (value, index) => {
          return index + 1;
        }).map((value) => {
          return (
            <option value={value} key={value}>
              {value}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="item.."
        value={description}
        onChange={(event) => {
          return setDescription(event.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, handleDeleteItems, handlePacked, setItems }) {
  const [sort, setSort] = useState("input");
  let sortItem;
  if (sort === "input") sortItem = items;
  if (sort === "Description") {
    sortItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  function clearList() {
    const confirm = window.confirm("Are You sure u want to clear Items?");
    if (confirm) {
      setItems([]);
    }
  }
  function getId(id) {
    handleDeleteItems(id);
  }
  return (
    <div className="list">
      <ul>
        {sortItem.map((value) => {
          return (
            <li>
              <input
                type="checkbox"
                value={value.packed}
                onChange={() => handlePacked(value.id)}
              />
              <span
                style={value.packed ? { textDecoration: "line-through" } : {}}
              >
                {value.quantity}
                {"   "}
                {value.description}
              </span>
              <button onClick={() => getId(value.id)}>❌</button>
            </li>
          );
        })}
      </ul>
      <div className="actions">
        <select
          value={sort}
          onChange={(event) => {
            return setSort(event.target.value);
          }}
        >
          <option value="input"> Sort by input</option>
          <option value="Description"> sort by Description</option>
        </select>
        <button onClick={clearList}>Clear list </button>
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length) return <p className="stats">Start Adding some stuff 👌</p>;
  const length = items.filter((value) => {
    return value.packed === true;
  });

  const percentage = Math.round((length.length / items.length) * 100);
  return (
    <footer className="stats">
      <em>
        You have {items.length} items on Your list and you already packed{" "}
        {length.length} ({percentage}%)
      </em>
    </footer>
  );
}
