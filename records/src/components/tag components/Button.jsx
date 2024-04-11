import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ title, linkTo, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className=' flex text-white font-semibold py-2 px-4'>
      {linkTo ? (
        <Link to={linkTo} className=' border-transparent hover:text-yellow-100 hover:underline'>{title}</Link>
      ) : (
        <button className=' border-transparent hover:text-yellow-100 hover:underline' onClick={handleClick}>{title}</button>
      )}
    </div>
  );
}
