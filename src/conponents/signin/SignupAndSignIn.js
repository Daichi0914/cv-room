import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const SignupAndSignin = () => {
  const [haveAcount, setHaveAcount] = useState(true);

  const changeAcount = () => {
    setHaveAcount(!haveAcount);
  };

  return (
    <div>
      <div>
        <h1>CV-Room</h1>
      </div>
      <div>
        <div>{haveAcount ? <Signin /> : <Signup />}</div>
      </div>
      <button onClick={changeAcount}>切り替え</button>
    </div>
  );
};

export default SignupAndSignin;
