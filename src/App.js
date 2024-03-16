import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
