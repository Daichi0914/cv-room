import React from 'react';
import  { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../signin/Signin';
import MyPage from '../mypage/MyPage';

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/login" component={Login} />
          <Route path="/my-page" component={MyPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}