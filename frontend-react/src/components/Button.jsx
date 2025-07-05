import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ label, variant = 'primary', onClick, extraClass = '', url = null }) => {
  const baseClass =
    variant === 'outline'
      ? 'btn btn-outline-light'
      : variant === 'solid'
      ? 'btn btn-primary'
      : variant;

  const buttonElement = (
    <button className={`${baseClass} rounded-pill px-4 ${extraClass}`} onClick={onClick}>
      {label}
    </button>
  );

  // If a URL is provided, wrap the button in a <Link>
  return url ? <Link to={url}>{buttonElement}</Link> : buttonElement;
};

export default Button;
