import React from 'react';
import classes from './BackDrop.module.css';
import { Link } from 'react-router-dom';

const BackDrop = (props) => {
  let backdrop = null;
  if (props.cardShow) {
    backdrop = <Link to={`${props.link}`} ><div className={classes.BackDrop}></div></Link>;
  }
  return <div>{backdrop}</div>;
};

export default BackDrop;
