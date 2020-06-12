import React, { useState } from 'react';

const Comment = (props) => {
  const [textValue, setTextValue] = useState(props.text);

  const changeText = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <div>
      <img src={props.avatar} alt='' />
      <p>{props.time}</p>
      {props.commentShow ? (
        <div><p>{props.user}</p><input type='text' value={textValue} onChange={changeText} /></div>
      ) : (
        <div><p>{props.user}</p><p>{props.text}</p></div>
      )}
      <button onClick={() => props.toggle(textValue, props.id)}>ç·¨é›†</button>
      <button onClick={() => props.delete(props.id)}>å‰Šé™¤</button>
    </div>
  );
};

export default Comment;
