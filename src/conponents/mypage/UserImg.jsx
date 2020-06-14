import React, { useState } from "react";

import firebase from "../../config/firebase";
import Avatar from 'react-avatar';
import classes from "./UserImg.module.css";

const UserImg = () => {
  const [nowName, setNowName] = useState('')

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setNowName(user.displayName)
    } else {
      console.log('error')
    }
  });

  return (
    <div className={classes.right}>
      <div className={classes.defaultImg} id='imgContainer'>
      <Avatar
        name={nowName}
        size="200"
        className={classes.defaultImg}
      />
        <div
          labeltext={null} // labelTextだとエラー
          imagestyle={{    // imageStyleだとエラー
            width: "200px",
            height: "200px",
            borderRadius: "100px",
            objectFit: "cover",
            margin: "0 auto",
          }}
          accept="image/*" //許可するファイルのtype
        />
      </div>
    </div>
  );
};

export default UserImg;