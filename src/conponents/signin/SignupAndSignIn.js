import React, { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import { Grid, Header, Menu, Icon,Message } from 'semantic-ui-react';

const SignupAndSignin = (props) => {
  const [activeItem, setActiveItem] = useState('Signin');
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const items = [
    'CodeVillage is one of the most famous programing school!',
    'This great school specializes in JavaScript!',
  ];

  return (
    <Grid>
      <Grid.Column width={8}>
        <Header
          as='h1'
          color='teal'
          textAlign='center'
          style={{ fontSize: 100, marginTop: 100 }}
        >
          <Icon name='react' color='teal' />
          CV-Room
        </Header>
        <Message color="teal" size="huge" style={{width: '80%',margin: 100}}>
          <Message.Header>About</Message.Header>
          <Message.List items={items} />
        </Message>
      </Grid.Column>
      <Grid.Column width={8} textAlign="center" style={{display: 'flex',flexDirection: 'Column',alignItems: "center"}}>
        <Menu color='teal' inverted widths={2} style={{marginTop: 100,width:450}}>
          <Menu.Item
            name='Signin'
            active={activeItem === 'Signin'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Signup'
            active={activeItem === 'Signup'}
            onClick={handleItemClick}
          />
        </Menu>
        {activeItem === 'Signup' ? <Signup /> : <Signin history={props.history}/>}
      </Grid.Column>
    </Grid>
  );
};

export default SignupAndSignin;
