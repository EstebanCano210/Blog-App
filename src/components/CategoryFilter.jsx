import React from 'react';
export default function CategoryFilter({ cats, onSelect }) {
  return (
    <select onChange={e => onSelect(e.target.value)}>
      <option value="">Todas</option>
      {cats.map(c => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}