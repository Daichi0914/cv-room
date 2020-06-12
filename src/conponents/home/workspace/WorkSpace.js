import React, { useState } from 'react';
import Board from './board/Board';
import classes from './WorkSpace.module.css';
import firebase from '../../../config/firebase';
import Header from '../../header/Header'

const BoardList = (props) => {
  const [workSpaceTitle, setWorkSpaceTitle] = useState(props.title);
  const [titleShow, setTitleShow] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [buttonShow, setButtonShow] = useState(false);

  const addBoard = async () => {
    if (boardTitle) {
      const db = firebase.firestore();
      const random = Math.random().toString();
      const newItem = {
        title: boardTitle,
        id: random,
        card: [],
        time: new Date(),
      };
      props.board.push(newItem);
      await db.collection('CV-Room-main').doc(props.id).set(
        {
          board: props.board,
        },
        { merge: true }
      );
      setBoardTitle('');
      setButtonShow(false);
    } else {
      alert('1文字以上入力してください');
    }
  };

  const changeWorkSpaceTitle = (event) => {
    setWorkSpaceTitle(event.target.value);
  };

  const changeBoardTitle = (event) => {
    setBoardTitle(event.target.value);
  };

  const toggleButton = () => {
    setButtonShow(!buttonShow);
  };

  const toggleTitle = () => {
    setTitleShow(!titleShow);
  };

  const updateWorkSpaceTitle = () => {
    firebase.firestore().collection('CV-Room-main').doc(props.id).update({
      title: workSpaceTitle,
    });
    setTitleShow(false);
  };

  const deleteBoard = async (boardId) => {
    if (window.confirm('本当に削除しますか？')) {
      const deleteBoard = props.board.filter((board) => board.id !== boardId);
      try {
        const db = firebase.firestore();
        await db.collection('CV-Room-main').doc(props.id).update({
          board: deleteBoard,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={classes.WorkSpace}>
      <button onClick={() => props.delete(props.id)} className={classes.Delete}>
        削除
      </button>
      <Header/>
      {titleShow ? (
        <div>
          <input
            maxLength='15'
            value={workSpaceTitle}
            onChange={changeWorkSpaceTitle}
          />
          <button onClick={updateWorkSpaceTitle}>変更</button>
          <button onClick={toggleTitle}>キャンセル</button>
        </div>
      ) : (
        <h1 onClick={toggleTitle}>{props.title}</h1>
      )}
      <div className={classes.Flex}>
        {props.board.length > 0 &&
          props.board.map((board) => (
            <Board
              key={String(board.id)}
              title={board.title}
              id={board.id}
              delete={deleteBoard}
              card={board.card}
              doc={props.id}
              board={props.board}
              link={props.link}
            />
          ))}
        <div>
          <button onClick={toggleButton}>
            {buttonShow ? '閉じる' : '+リストを追加する'}
          </button>
          {buttonShow && (
            <div>
              <input
                value={boardTitle}
                onChange={changeBoardTitle}
                maxLength='15'
              />
              <button onClick={addBoard}>作成</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
