import { useState } from "react";
export default function Form({ handleItems }) {
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
