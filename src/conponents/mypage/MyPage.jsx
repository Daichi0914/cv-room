import React from 'react';
import UserImg from "./UserImg";
import UserInfo from "./UserInfo";

const Account = () => {
  return (
    <>
      <h1 style={{textAlign: 'center', color: '#00b3b3'}}>Settings</h1>
      <div style={{display: 'flex'}}>
        <UserInfo />
        <UserImg />
      </div>
    </>
  );
};

export default Account;