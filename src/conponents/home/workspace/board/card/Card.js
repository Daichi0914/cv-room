import React, { useState } from 'react';
import classes from './Card.module.css';
import Comment from './comment/Comment';
import File from './file/File';
import BackDrop from './backdrop/BackDrop';
import firebase from '../../../../../config/firebase';

const Card = (props) => {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const [titleShow, setTitleShow] = useState(false);
  const [textShow, setTextShow] = useState(false);
  const [deadlineShow, setDeadlineShow] = useState(false);
  const [priorityShow, setPriorityShow] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [textValue, setTextValue] = useState(props.text);
  const [titleValue, setTitleValue] = useState(props.title);
  const [commentText, setCommentText] = useState('');
  const [fileItem, setFileItem] = useState('');
  const [deadlineTime, setDeadlineTime] = useState(props.deadline);
  const [priorityNum, setPriorityNum] = useState(props.priority);

  /* -------------------------------------------------------------------------- */
  /*                                  Function                                  */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------------- 変更 ----------------------------------- */

  const changeText = (event) => {
    setTextValue(event.target.value);
  };
  const changeTitle = (event) => {
    setTitleValue(event.target.value);
  };
  const changeComment = (event) => {
    setCommentText(event.target.value);
  };
  const changeFile = (event) => {
    setFileItem(event.target.value);
  };
  const changeDeadline = (event) => {
    setDeadlineTime(event.target.value);
  };
  const changePriority = (event) => {
    setPriorityNum(event.target.value);
  };

  /* ----------------------------------- 追加 ----------------------------------- */

  const addComment = async () => {
    if (commentText) {
      const db = firebase.firestore();
      const random = Math.random().toString();
      const newItem = {
        text: commentText,
        id: random,
        time: returnTime(),
        user: firebase.auth().currentUser.displayName,
        avatar: firebase.auth().currentUser.photoURL
      };
      const newArray = props.board.map((board) => {
        if (props.nextDoc === board.id) {
          board.card.map((card) => {
            if (card.id === props.id) {
              card.comment.push(newItem);
            }
            return card;
          });
        }
        return board;
      });

      await db.collection('CV-Room-main').doc(props.doc).set(
        {
          board: newArray,
        },
        { merge: true }
      );
      setCommentText('');
    } else {
      alert('1文字以上入力してください!');
    }
  };

  const addFile = async () => {
    if (fileItem) {
      const files = document.getElementById('fileInput').files;
      console.log(files[0]);
      const image = files[0];
      const ref = firebase.storage().ref('file').child(image.name);
      const db = firebase.firestore();
      await ref.put(image).then((snapshot) => {
        firebase
          .storage()
          .ref('file/' + image.name)
          .getDownloadURL()
          .then((url) => {
            const random = Math.random().toString();
            const newItem = {
              link: url,
              id: random,
              name: image.name,
              time: returnTime(),
            };

            const newArray = props.board.map((board) => {
              if (props.nextDoc === board.id) {
                board.card.map((card) => {
                  if (card.id === props.id) {
                    card.file.push(newItem);
                  }
                  return card;
                });
              }
              return board;
            });
            db.collection('CV-Room-main').doc(props.doc).set(
              {
                board: newArray,
              },
              { merge: true }
            );
          });
        setFileItem('');
      });
    } else {
      alert('ファイルが選択されていません');
    }
  };

  /* ----------------------------------- トグル ---------------------------------- */

  const titleToggle = () => {
    setTitleShow(!titleShow);
    if (titleShow) {
      props.setCardValue(titleValue, props.id);
    }
  };

  const textToggle = async () => {
    if (textShow) {
      const newArray = props.board.map((board) => {
        if (props.nextDoc === board.id) {
          board.card.map((card) => {
            if (card.id === props.id) {
              card.text = textValue;
            }
            return card;
          });
        }
        return board;
      });
      const db = firebase.firestore();
      await db.collection('CV-Room-main').doc(props.doc).set(
        {
          board: newArray,
        },
        { merge: true }
      );
    }
    setTextShow(!textShow);
  };

  let time = '未設定';
  const deadlineToggle = () => {
    if (deadlineTime) {
      const year = deadlineTime.substring(0, 4);
      const month = deadlineTime.substring(5, 7);
      const day = deadlineTime.substring(8, 10);
      const hour = deadlineTime.substring(11, 13);
      const minute = deadlineTime.substring(14, 16);
      if (year) {
        time = `${year}年${month}月${day}日${hour}時${minute}分`;
        setDeadlineTime(time);
        props.setDeadline(time, props.id);
      }
    }
    setDeadlineShow(!deadlineShow);
  };

  const priorityToggle = () => {
    if (priorityShow) {
      props.setPriority(priorityNum, props.id);
    }
    setPriorityShow(!priorityShow);
  };

  const commentToggle = async (commentText, commentId) => {
    if (commentShow) {
      const newArray = props.board.map((board) => {
        if (props.nextDoc === board.id) {
          board.card.map((card) => {
            if (card.id === props.id) {
              card.comment.map((comment) => {
                if (comment.id === commentId) {
                  comment.text = commentText;
                }
                return comment
              });
            }
            return card;
          });
        }
        return board;
      });
      const db = firebase.firestore();
      await db.collection('CV-Room-main').doc(props.doc).set(
        {
          board: newArray,
        },
        { merge: true }
      );
    }
    setCommentShow(!commentShow);
  };

  /* ----------------------------------- 削除 ----------------------------------- */

  const deleteFile = async (fileId) => {
    if (window.confirm('本当に削除しますか？')) {
      const newArray = props.board.map((board) => {
        if (props.nextDoc === board.id) {
          board.card.map((card) => {
            if (card.id === props.id) {
              card.file=card.file.filter((file) => file.id!==fileId);
            }
            return card;
          });
        }
        return board;
      });
      try {
        const db = firebase.firestore();
        await db
          .collection('CV-Room-main')
          .doc(props.doc)
          .set(
            {
              board: newArray,
            },
            { merge: true }
          );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('本当に削除しますか？')) {
      const newArray = props.board.map((board) => {
        if (props.nextDoc === board.id) {
          board.card.map((card) => {
            if (card.id === props.id) {
              card.comment=card.comment.filter((comment) => comment.id!==commentId);
            }
            return card;
          });
        }
        return board;
      });
      try {
        const db = firebase.firestore();
        await db
          .collection('CV-Room-main')
          .doc(props.doc)
          .set(
            {
              board: newArray,
            },
            { merge: true }
          );
      } catch (error) {
        console.error(error);
      }
    }
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

  /* -------------------------------------------------------------------------- */
  /*                                     JSX                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div>
      <BackDrop cardShow={true} link={props.link} />
      <div className={classes.Card}>
        <div className={classes.Flex}>
          {/* ---------------------------------- タイトル ---------------------------------- */}

          {titleShow ? (
            <div>
              <input value={titleValue} onChange={changeTitle} maxLength='15' />
            </div>
          ) : (
            <h2>{props.title}</h2>
          )}
          <button onClick={titleToggle}>編集</button>

          {/* ----------------------------------- 期限 ----------------------------------- */}

          {deadlineShow ? (
            <input
              type='datetime-local'
              min={new Date()}
              value={deadlineTime}
              onChange={changeDeadline}
            />
          ) : (
            <p>期限: {time === '未設定' ? deadlineTime : time}</p>
          )}
          <button onClick={deadlineToggle}>編集</button>

          {/* ----------------------------------- 優先度 ---------------------------------- */}
          {priorityShow ? (
            <p>
              優先度：{' '}
              <select onChange={changePriority}>
                <option value=''></option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
              </select>
            </p>
          ) : (
            <p>優先度： {priorityNum}</p>
          )}
          <button onClick={priorityToggle}>設定</button>
        </div>

        <div className={classes.Flex}>
          {/* ----------------------------------- 説明 ----------------------------------- */}
          <h3>説明</h3>
          <button onClick={textToggle}>編集</button>
        </div>
        {textShow ? (
          <textarea
            rows='10'
            value={textValue}
            onChange={changeText}
            autoFocus
            maxLength='15'
          ></textarea>
        ) : (
          <p>{props.text}</p>
        )}

        {/* ---------------------------------- ファイル ---------------------------------- */}
        <h3>添付したファイル一覧</h3>
        <div className={classes.Column}>
          {props.file &&
            props.file.map((file, i) => {
              return (
                <File
                  link={file.link}
                  delete={deleteFile}
                  key={i.toString()}
                  id={file.id}
                  name={file.name}
                  time={file.time}
                />
              );
            })}
          <form>
            <input
              type='file'
              id='fileInput'
              multiple
              onChange={changeFile}
              value={fileItem}
            />
            <button type='button' onClick={addFile}>
              添付
            </button>
          </form>
        </div>

        {/* ---------------------------------- コメント ---------------------------------- */}
        <h3>コメント</h3>
        <div className={classes.Flex}>
          <img src='' alt='' />
          <input
            placeholder='コメントを入力してください'
            onChange={changeComment}
            value={commentText}
            maxLength='50'
          />
          <button type='button' onClick={addComment}>
            送信
          </button>
        </div>
        {props.comment &&
          props.comment.map((comment, i) => {
            return (
              <Comment
                text={comment.text}
                key={i.toString()}
                delete={deleteComment}
                id={comment.id}
                time={comment.time}
                toggle={commentToggle}
                commentShow={commentShow}
                user={comment.user}
                avatar={comment.avatar}
              />
            );
          })}
        <p>作成日時：{props.time}</p>
        <button onClick={() => props.delete(props.id)}>削除</button>
      </div>
    </div>
  );
};

export default Card;
