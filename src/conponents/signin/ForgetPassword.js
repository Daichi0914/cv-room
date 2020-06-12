import React, { useState } from 'react';
import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Icon,
  Message,
} from 'semantic-ui-react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [completeShow, setCompleteShow] = useState(false);
  const onsub = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('おくったよ！');
        setLoading(false);
        setCompleteShow(true);
      });
  };

  return completeShow ? (
    <Grid textAlign='center' verticalAlign='middle' style={{marginTop: 150}}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon color='green' textAlign='center'>
          <Icon name='react' color='green' />
          Reset Password
        </Header>
        <Segment stacked>Sent to your Email</Segment>
      </Grid.Column>
      <Message>
            <Link to='/signup'> Signup</Link> /
            <Link to='/signin'> Signin</Link>
          </Message>
    </Grid>
  ) : (
    <Grid textAlign='center' verticalAlign='middle' style={{marginTop: 100}}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' icon color='green' textAlign='center'>
          <Icon name='react' color='green' />
          Reset Password
        </Header>
        <Form onSubmit={onsub} size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='Email Address'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type='email'
            />
            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color='green'
              fluid
              size='large'
            >
              Submit
            </Button>
          </Segment>
        </Form>
          <Message>
            <Link to='/auth'>Return</Link>
          </Message>
      </Grid.Column>
    </Grid>
  );
};

export default ForgetPassword;
