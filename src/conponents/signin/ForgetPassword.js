import React, { useState } from "react";
import firebase from "../../config/firebase";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const onsub = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("おくったよ！");
      });
  };

  return (
    <div>
      <form onSubmit={onsub}>
        <input
          placeholder="メールアドレスを入力する"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button>おくる</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
