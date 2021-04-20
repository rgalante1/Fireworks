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
      <div className="logIn container my-5 py-4">
        <div className="loginWrapper">
          <form className="loginForm card container py-4" id="logCard">
            <h1 className="titleLogIn text-center text-center">Log In</h1>
            <input type="text" id="inputLogin" name="UserName" placeholder={this.state.UserName} 
            className="form-control" onChange={this.handleChange} />
            <label htmlFor="username" />

            <input type="text" id="inputLogin" name="Password" placeholder={this.state.Password} 
            className="form-control" onChange={this.handleChange} />
            <label htmlFor="password" />

            <input type="submit" id="submitLogin" value="Log In" onClick={this.handleSubmit} 
            className="form-control btn btn-success rounded-pill my-2"/>
            <input type="submit" id="submitCreate" value="Create Account" onClick={this.handleCreate} 
            className="form-control btn btn-primary rounded-pill mt-1" />
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