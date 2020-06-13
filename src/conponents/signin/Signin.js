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

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  let displayErrors = () =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setErrors([]);
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedInUser) => {
          console.log(signedInUser);
          props.history.push('/home')
        })
        .catch((err) => {
          console.error(err);
          setErrors(errors.concat(err));
          setLoading(false);
        });
    }
  };

  const isFormValid = () => email && password;

  const handleInputError = (inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? 'error'
      : '';
  };

  return (
    <Grid textAlign='center' verticalAlign='middle' style={{marginTop: 100}}>
      <Grid.Column style={{ width: 450 }}>
        <Header as='h2' icon color='teal' textAlign='center'>
          Signin to CV-Room
        </Header>
        <Form onSubmit={handleSubmit} size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              name='email'
              icon='mail'
              iconPosition='left'
              placeholder='Email Address'
              onChange={emailChange}
              value={email}
              className={handleInputError('email')}
              type='email'
            />
            <Form.Input
              fluid
              name='password'
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              onChange={passwordChange}
              value={password}
              className={handleInputError('password')}
              type='password'
            />

            <Button
              disabled={loading}
              className={loading ? 'loading' : ''}
              color='teal'
              fluid
              size='large'
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayErrors()}
          </Message>
        )}
        <Message>
          <Link to='/forget'>Forget password?</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
