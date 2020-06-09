import  React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <header>
      <h1>CVroom</h1>
      <ul>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/my-page">My Page</NavLink>
      </ul>
    </header>
  )
}