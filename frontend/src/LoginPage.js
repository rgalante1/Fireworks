import './LoginPage.css';
import React from 'react';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: 'Username',
      Password: 'Password'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    console.log('Logging In - Username: ' + this.state.UserName + ', Password: ' + this.state.Password);
    event.preventDefault();
  }

  handleCreate(event) {
    console.log('Create Account');
    event.preventDefault();
  }

  render() {
    return (
      <div className="logIn">
        <div className="loginWrapper">
          <h1 className="titleLogIn">Log In</h1>
          <form className="loginForm">
            <input type="text" id="inputLogin" name="UserName" placeholder={this.state.UserName} className="floatLeft" onChange={this.handleChange} />
            <label htmlFor="username" />
            <br />

            <input type="text" id="inputLogin" name="Password" placeholder={this.state.Password} className="floatLeft" onChange={this.handleChange} />
            <label htmlFor="password" />
            <br />

            <input type="submit" id="submitLogin" value="Log In" onClick={this.handleSubmit} />
            <br />

            <input type="submit" id="submitCreate" value="Create Account" onClick={this.handleCreate} />
          </form>
        </div>
      </div>
    )
  }
}

function LoginPage() {
  return (
    <div>
      <CreateAccount />
    </div>
  )
}

export default LoginPage;