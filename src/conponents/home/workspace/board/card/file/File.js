import React from 'react';
import FileImage from './file.png';
import classes from '../Card.module.css';

const File = (props) => {
  return (
    <div className={classes.Flex}>
      <img src={FileImage} alt='No Found' height='50px' />
      <p>
        ファイル名： <a href={props.link}>{props.name}</a>
      </p>
      <p>追加日時： {props.time}</p>
      <button
        onClick={() => props.delete(props.id)}
      >
        削除
      </button>
    </div>
  );
};

export default File;
