import React from 'react';
import axios from 'axios';
import moment from 'moment';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRetypeChange = this.handleRetypeChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.state = {
      username: '',
      password: '',
      retype: '',
      errorMsg: '',
      successMsg: '',
      submitText: 'Login',
      toggleText: 'New User?',
      hrefValue: 'https://fitness.joemart.in/api/login',
      isRegister: false
    };
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleRetypeChange(e) {
    this.setState({retype: e.target.value});
  }

  handleRegisterClick(e) {
    e.preventDefault();
    this.setState((state) => {
      const isRegister = !state.isRegister;
      const urlBase = 'https://fitness.joemart.in/api/';
      return {
        isRegister,
        submitText: isRegister ? 'Register' : 'Login',
        toggleText: isRegister ? 'Go to Login' : 'New User?',
        hrefValue: isRegister ? urlBase + 'register' : urlBase + 'login'
      }
    });
    this.forceUpdate();
  }

  handleSubmit(e) {
    e.preventDefault();
    const href = this.state.hrefValue;
    const username = this.state.username;
    const password = this.state.password;
    const retype = this.state.retype;
    const isRegister = this.state.isRegister;
    if (isRegister && password !== retype) {
      this.setState({errorMsg: 'Passwords do not match'});
      return;
    }
    console.log(href);
    axios.post(href, {username, password})
      .then(res => {
        if (res.status !== 200) {console.log(res);return;}
        if (res.data.success) {
          if (href.indexOf('login') === -1) {
            console.log(`successfully registered ${res.data.user.username}`);
            alert('User registration successful. Please login.')
          } else {
            const expiresIn = res.data.expiresIn;
            const expiresAt = moment().add(expiresIn[0], expiresIn[1]).format();
            const token = res.data.token;
            const auth = {
              success: true,
              expiresAt,
              token
            };
            localStorage.setItem('auth', JSON.stringify(auth));
            localStorage.setItem('username', username);
            console.log('token set to local storage');
          }
          window.location = '/';
        }
      })
      .catch(e => {
        console.log(e);
        try {this.setState({
          errorMsg: isRegister
            ? 'Username already exists. Please choose a different username'
            : 'Invalid user credentials'
          })}
        catch (err) { console.log(err) }
      });
  }

  render() {
    const username = this.state.username;
    const password = this.state.password;
    const retype = this.state.retype;
    const isRegister = this.state.isRegister;
    const loginButtonText = this.state.submitText;
    const registerButtonText = this.state.toggleText;
    const hrefValue = this.state.hrefValue;
    const errorMsg = this.state.errorMsg;
    const successMsg = this.state.successMsg;
    return (
      <div>
        <form method='post' href={hrefValue}>
          <FormComponent
            name='Username'
            autocomplete='username email'
            value={username}
            onChange={this.handleUsernameChange}
          />
          <FormComponent
            name='Password'
            type='password'
            autocomplete='current-password'
            value={password}
            onChange={this.handlePasswordChange}
          />
          {isRegister &&
            <><input type='text' autoComplete='username' style={{display: 'none'}} disabled />
              <FormComponent
                name='Retype password'
                type='password'
                autocomplete='new-password'
                value={retype}
                onChange={this.handleRetypeChange}
              />
            </>}
          <div className='mb-2'>
            <button
              type='submit'
              className='btn btn-primary me-1'
              onClick={this.handleSubmit}
            >
              {loginButtonText}
            </button>
            <button
              className='btn btn-secondary'
              onClick={this.handleRegisterClick}
            >
              {registerButtonText}
            </button>
          </div>
        </form>
        {errorMsg.length > 0 &&
          <div className='alert alert-warning'>
            {errorMsg}
          </div>}
        {successMsg.length > 0 &&
          <div className='alert alert-success'>
            {successMsg}
          </div>}
      </div>
    );
  }
}

const FormComponent = (props) => {
  return (
    <div className='mb-2'>
      <label className='form-label'>{props.name}</label>
      <input
        type={props.type || 'text'}
        name={props.name}
        className='form-control'
        value={props.value}
        onChange={props.onChange}
        autoComplete={props.autocomplete}
      />
    </div>
  );
};

export default UserLogin;
