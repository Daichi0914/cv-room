import React from 'react';
// import Header from './Header';
import LeftBlock from "./LeftBlock/LeftBlock";
import RightBlock from "./RightBlock/RightBlock";

import classes from './MyPage.module.css';


const MyPage = () => {
  return (
    <>
      {/* <Header /> */}
      <h1 className={classes.title}>アカウント設定</h1>
      <span></span>
      <div className={classes.afterBlock}>
        <LeftBlock />
        <RightBlock />
      </div>
    </>
  )
}

export default MyPage