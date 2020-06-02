import React from "react";

import classes from "./ProfileName.module.css";

const ProfileName = () => {
  return (
    <>
      <p>名前：</p>
      <div className="ui input">
        <input
          className={classes.inputName}
          type="text"
          placeholder="入力..."
        />
      </div>
    </>
  );
};

export default ProfileName;