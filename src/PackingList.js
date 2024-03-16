import { useState } from "react";

export default function PackingList({
  items,
  handleDeleteItems,
  handlePacked,
  setItems,
}) {
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
