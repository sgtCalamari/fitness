import React from 'react';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRetypeChange = this.handleRetypeChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.state = {
      username: '',
      password: '',
      retype: '',
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
    this.setState((state) => ({isRegister: !state.isRegister}));
  }

  render() {
    const username = this.state.username;
    const password = this.state.password;
    const retype = this.state.retype;
    const isRegister = this.state.isRegister;
    const loginButtonText = isRegister ? 'Register' : 'Login';
    const registerButtonText = isRegister ? 'Go to Login' : 'New User?';
    return (
      <form method='post' href='/login'>
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
          <button type='submit' className='btn btn-primary me-1'>
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
