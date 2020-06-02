import React, { useState } from "react";
import firebase from "../../config/firebase";
import ForgetPassword from "./ForgetPassword";

const Login = () => {
  const [showDisplay, setShowDisplay] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("ろぐいん！！！！");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>ログイン</h3>

        <div>
          <label>メールアドレス</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="メール"
            autoComplete="off"
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
      <button
        onClick={() => {
          setShowDisplay(!showDisplay);
        }}
      >
        パスワードわすrた
      </button>
      <div>{showDisplay ? <ForgetPassword /> : ""}</div>
    </div>
  );
};

export default Login;
