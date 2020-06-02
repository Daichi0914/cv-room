import React from "react";
import ProfileName from "./ProfileName";
import MailAndPass from './MailAndPass';
import Notice from "./Notice";
import Logout from "./Logout";

import classes from "./RightBlock.module.css";


const RightBlock = () => {
  return (
    <div className={classes.RightBlock}>
      <ProfileName />
      <MailAndPass />
      <Notice />
      <Logout />
    </div>
  );
};

export default RightBlock;