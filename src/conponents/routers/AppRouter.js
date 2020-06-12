import React,{useEffect} from 'react';
import  {  Switch, Route,withRouter, Redirect } from 'react-router-dom';
import Header from '../header/Header';
import Home from '../home/Home';
import SignupAndSighin from '../signin/SignupAndSignin'
import ForgetPassword from '../signin/ForgetPassword'
import MyPage from '../mypage/MyPage';
import firebase from '../../config/firebase'

const AppRoute= (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        props.history.push('/auth');
      } 
    });
  }, []);

  return (
    <div>
        <Header history={props.history}/>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/forget" component={ForgetPassword} />
          <Route path="/auth" render={()=><SignupAndSighin history={props.history}/>}/>
          <Route path="/my-page" component={MyPage} />
          <Redirect exact from="/" to="/home"/>
          <Route render={()=><h1>Page Not Found</h1>}/>
        </Switch>
    </div>
  )
}

export const AppRouter=withRouter(AppRoute)