import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import firebase from '../../config/firebase';
import { Container, Header, Menu,Icon } from 'semantic-ui-react';

export default (props) => {
  const handleSignout = () => {
    if (window.confirm('ログアウトしますか？')) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('signed out');
          props.history.push('/signin');
        });
    }
    return;
  };
  return (
    <Container inverted={true} style={{paddingTop: 20,width: "100vw",backgroundColor: "black"}}>
      <Link to="/home"><Header as="h2" color="teal"><Icon name="react" color="teal"/>CV-Room</Header></Link>
      <Menu inverted>
        <Menu.Item name='home'>
          <NavLink to='/home'>Home</NavLink>
        </Menu.Item>

        <Menu.Item name='mypage'>
          <NavLink to='/my-page'>My Page</NavLink>
        </Menu.Item>

        <Menu.Item name='signout' onClick={handleSignout}>
          Signout
        </Menu.Item>
      </Menu>
    </Container>
  );
};
