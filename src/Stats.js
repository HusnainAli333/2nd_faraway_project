export default function Stats({ items }) {
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
