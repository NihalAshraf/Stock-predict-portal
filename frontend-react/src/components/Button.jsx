import React from 'react';

const Button = ({ label, variant = 'primary', onClick, extraClass = '' }) => {
  const baseClass =
    variant === 'outline'
      ? 'btn btn-outline-light'
      : variant === 'solid'
      ? 'btn btn-primary'
      : variant; 

  return (
    <button className={`${baseClass} rounded-pill px-4 ${extraClass}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
