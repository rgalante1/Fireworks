import './LoginPage.css';
import logoFWB from './logo.jpg';
import logoFWBLogin from './logoLogin.jpg';
import React from 'react';

function Title() {
  return (
    <div className="titleCard">
      <img src={logoFWB} alt="fireworks title" height={125} width={366} />
    </div>
  )
}

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
        <div className="leftImage">
          <img src={logoFWBLogin} alt="fireworks login" height={300} width={315} />
        </div>
        <div className="rightForm">
          <form>
            <input type="text" id="inputLogin" name="UserName" value={this.state.UserName} className="floatLeft" onChange={this.handleChange} />
            <label for="username"/>
            <br />

            
            <input type="text" id="inputLogin" name="Password" value={this.state.Password} className="floatLeft" onChange={this.handleChange} />
            <label for="password"/>
            <br />

            <input type="submit" id="submitLogin" value="Log In" className="floatLeft" onClick={this.handleSubmit}/>
            <br />

            <input type="submit" id="submitCreate" value="Create Account" className="floatLeft" onClick={this.handleCreate}/>
          </form>
        </div>
      </div>
    )
  }
}

function LoginPage() {
  return (
    <div>
      <Title />
      <CreateAccount />
    </div>
  )
}

export default LoginPage;
