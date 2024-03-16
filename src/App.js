const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>👜 Far Away</h1>;
}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do You need for Your Trip?😎</h3>
      <select>
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
      <input type="text" placeholder="item.." />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((value) => {
          return (
            <li>
              <span
                style={value.packed ? { textDecoration: "line-through" } : {}}
              >
                {value.quantity}
                {value.description}
              </span>
              <button>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on ur list</em>
    </footer>
  );
}
