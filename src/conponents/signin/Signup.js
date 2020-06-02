import React, { useState } from "react";
import firebase from "../../config/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateProfile({ displayName: username })
          .then(() => {
            console.log(firebase.auth().currentUser);
          });
        // signIn(firebase.auth().currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>サインアップ</h3>
        <div>
          <label>名前</label>
          <input
            type="text"
            name="username"
            placeholder="名前"
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>メールアドレス</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="メール"
          />
        </div>
        <div className="field">
          <label>パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {/* <div className="field">
        <label>パスワード(再確認)</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
      </div> */}

        <div className="ui right aligned container">
          <button type="submit" className="ui button basic primary">
            登録
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
