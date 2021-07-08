import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">World WIP</Link>
        </li>
        <li>
          <Link to="/by-country-after-date">
            Live By Country And Status After Date
          </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
