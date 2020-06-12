import React, { useState, useEffect } from 'react';
import WorkSpace from './workspace/WorkSpace';
import { Route, Link,BrowserRouter } from 'react-router-dom';
import firebase from '../../config/firebase';
import classes from './Home.module.css';
import Spinner from '../../spinner/Spinner'

const Home = (props) => {
  const [inputShow, setInputShow] = useState(false);
  const [workSpaceArray, setWorkSpaceArray] = useState([]);
  const [workSpaceTitle, setWorkSpaceTitle] = useState('');
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    setLoading(true)
    const db = firebase.firestore();
    const unsubscribe = db
      .collection('CV-Room-main')
      .orderBy('time', 'asc')
      .onSnapshot((querySnapshot) => {
        const _workSpaceArray = querySnapshot.docs.map((doc) => {
          return { ...doc.data() };
        });
        setWorkSpaceArray(_workSpaceArray);
        setLoading(false)
      });
    return () => {
      unsubscribe();
    };
  }, []);

  const openInput = () => {
    setInputShow(true);
  };

  const closeInput = () => {
    setInputShow(false);
  };

  const addWorkSpace = async () => {
    if (workSpaceTitle) {
      const db = firebase.firestore();
      const random = Math.random().toString();
      await db.collection('CV-Room-main').doc(random).set(
        {
          title: workSpaceTitle,
          id: random,
          board: [],
          time: new Date(),
        },
        { merge: true }
      );
      setWorkSpaceTitle('');
    } else {
      alert('1文字以上入力してください');
    }
  };

  const deleteWorkSpace = async (workSpaceId) => {
    if (window.confirm('本当に削除しますか？')) {
      const deleteWorkSpace = workSpaceArray.filter(
        (workSpace) => workSpace.id === workSpaceId
      );
      try {
        const db = firebase.firestore();
        await db.collection('CV-Room-main').doc(deleteWorkSpace[0].id).delete();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const setWorkSpaceValue = async (workSpaceTitle, workSpaceId) => {
    if (workSpaceTitle) {
      const db = firebase.firestore();
      await db.collection('CV-Room-main').doc(workSpaceId).update({
        title: workSpaceTitle,
      });
      setWorkSpaceTitle('');
    } else {
      alert('1文字以上入力してください');
    }
  };

  const changeWorkSpaceTitle = (event) => {
    setWorkSpaceTitle(event.target.value);
  };

  return (
    loading?<Spinner/>:<div className={classes.Home}>
      <BrowserRouter>
      {workSpaceArray &&
        workSpaceArray.map((workSpace, i) => (
          <div key={i.toString()}>
            <Link to={'/home/workspace/' + workSpace.id}>
              <h1 className={classes.Square}>{workSpace.title}</h1>
            </Link>
            <Route
              path={'/home/workspace/' + workSpace.id}
              render={() => (
                <WorkSpace
                  id={workSpace.id}
                  key={i.toString()}
                  title={workSpace.title}
                  setWorkSpaceValue={setWorkSpaceValue}
                  board={workSpace.board}
                  delete={deleteWorkSpace}
                  link={'/home/workspace/'+workSpace.id}
                />
              )}
            />
          </div>
        ))}
      </BrowserRouter>
      {inputShow ? (
        <div>
          <input
            type='text'
            value={workSpaceTitle}
            onChange={changeWorkSpaceTitle}
            maxLength='15'
          />
          <button onClick={addWorkSpace}>追加</button>
          <button onClick={closeInput}>キャンセル</button>
        </div>
      ) : (
        <div>
          <button onClick={openInput} className={classes.Square}>+</button>
        </div>
      )}
    </div>
  );
};

export default Home;
