import React, { useState } from 'react';
import classes from './Board.module.css';
import Card from './card/Card';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import firebase from '../../../../config/firebase';

const Board = (props) => {
  const [inputShow, setInputShow] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [titleShow, setTitleShow] = useState(false);
  const [boardTitle, setBoardTitle] = useState(props.title);
  const [ref] = useState(firebase.firestore().collection('CV-Room-main'));

  const openinputShow = () => {
    setInputShow(true);
  };
  const closeinputShow = () => {
    setInputShow(false);
  };

  const titleToggle = () => {
    if (titleShow) {
      props.board.map((board) => {
        if (board.id === props.id) {
          board.title = boardTitle;
        }
        return board;
      });
      ref.doc(props.doc).update({
        board: props.board,
      });
    }
    setTitleShow(!titleShow);
  };

  const addCard = async () => {
    const random = Math.random().toString();
    const newItem = {
      title: cardTitle,
      id: random,
      file: [],
      comment: [],
      deadline: '未設定',
      priority: '未設定',
      time: returnTime(),
    };
    props.board.map((board) => {
      if (board.id === props.id) {
        board.card.push(newItem);
      }
      return board;
    });
    await ref.doc(props.doc).set({ board: props.board }, { merge: true });
    setCardTitle('');
    setInputShow(false);
  };

  const returnTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${year}年${month}月${day}日${hour}時${minute}分`;
    return time;
  };

  const changeCardTitle = (event) => {
    setCardTitle(event.target.value);
  };

  const changeBoardTitle = (event) => {
    setBoardTitle(event.target.value);
  };

  const setCardValue = async (cardTitle, cardId) => {
    if (cardTitle) {
      const newArray = props.board.map((board) => {
        if (props.id === board.id) {
          board.card.map((card) => {
            if (card.id === cardId) {
              card.title = cardTitle;
            }
            return card;
          });
        }
        return board;
      });

      await ref.doc(props.doc).set(
        {
          board: newArray,
        },
        { merge: true }
      );
      setCardTitle('');
      setTitleShow(false);
    } else {
      alert('1文字以上入力してください');
    }
    setCardTitle('');
    return false;
  };

  const setDeadline = async (cardDeadline, cardId) => {
    const newArray = props.board.map((board) => {
      if (props.id === board.id) {
        board.card.map((card) => {
          if (card.id === cardId) {
            card.deadline = cardDeadline;
          }
          return card;
        });
      }
      return board;
    });

    await ref.doc(props.doc).set(
      {
        board: newArray,
      },
      { merge: true }
    );
  };

  const setPriority = async (cardPriority, cardId) => {
    const newArray = props.board.map((board) => {
      if (props.id === board.id) {
        board.card.map((card) => {
          if (card.id === cardId) {
            card.priority = cardPriority;
          }
          return card;
        });
      }
      return board;
    });

    await ref.doc(props.doc).set(
      {
        board: newArray,
      },
      { merge: true }
    );
  };

  const deleteCard = async (cardId) => {
    if (window.confirm('本当に削除しますか？')) {
      const newArray = props.board.map((board) => {
        if (props.id === board.id) {
          board.card = board.card.filter((card) => card.id !== cardId);
        }
        return board
      });
      try {
        await ref.doc(props.doc).set({ board: newArray }, { merge: true });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className={classes.Board}>
        {titleShow ? (
          <div>
            <input
              type='text'
              value={boardTitle}
              onChange={changeBoardTitle}
              maxLength='15'
            />
            <button onClick={titleToggle}>変更</button>
          </div>
        ) : (
          <div>
            <h2 onClick={titleToggle}>{props.title}</h2>
            <button onClick={() => props.delete(props.id)}>削除</button>
          </div>
        )}
        <BrowserRouter>
          {props.card &&
            props.card.map((card, i) => (
              <div key={i.toString()}>
                <Link
                  to={props.link +'/card'+ card.id}
                  className={classes.CardTitle}
                >
                  <h2>
                    {card.title}
                    <span>
                      締め切り：{card.deadline}　優先度：{card.priority}{' '}
                      ファイル：{card.file.length}　コメント：
                      {card.comment.length}
                    </span>
                  </h2>
                </Link>
                <Route
                  path={props.link +'/card'+ card.id}
                  render={() => (
                    <Card
                      id={card.id}
                      key={i.toString()}
                      title={card.title}
                      setCardValue={setCardValue}
                      setDeadline={setDeadline}
                      setPriority={setPriority}
                      delete={deleteCard}
                      time={card.time}
                      comment={card.comment}
                      file={card.file}
                      nextDoc={props.id}
                      doc={props.doc}
                      deadline={card.deadline}
                      priority={card.priority}
                      card={props.card}
                      text={card.text}
                      link={props.link}
                      board={props.board}
                    />
                  )}
                />
              </div>
            ))}
        </BrowserRouter>
        {inputShow ? (
          <div>
            <textarea
              placeholder='カードタイトル'
              value={cardTitle}
              onChange={changeCardTitle}
              autoFocus
              maxLength='15'
            ></textarea>
            <div className={classes.flex}>
              <button onClick={addCard}>カードを追加</button>
              <span onClick={closeinputShow}>☓</span>
            </div>
          </div>
        ) : (
          <div>
            <button className={classes.openBtn} onClick={openinputShow}>
              ＋カードを追加
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
