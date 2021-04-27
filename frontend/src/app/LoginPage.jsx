import './LoginPage.css';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountRepository'

class LoginAccount extends React.Component {
  accountRepo = new AccountsRepository();

  constructor(props) {
    super(props);
    this.state = {
      UserName: 'Username',
      Password: 'Password',
      LoggedStatus: true,
      LinkStatus: false,
      Company: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    if (this.state.UserName && this.state.Password) {
      this.accountRepo.getUserPass(this.state.UserName, this.state.Password, this.state.Company)
        .then(result => {
          if (result.data) {
            window.userName = this.state.UserName;
            this.setState({ LinkStatus: true });
          }
          else {
            this.setState({ LoggedStatus: false });
          }
        });
    }else{
      this.setState({ LoggedStatus: false });
    }
    event.preventDefault();
  }

  render() {
    if (window.userName) {
      return <><Redirect to={"/dashboard/" + window.userName} /></>
    } else if (this.state.LoggedStatus && !this.state.LinkStatus) {
      return <>
        <div className="logIn container my-5 py-4">
          <div className="loginWrapper">
            <form className="loginForm card container py-4" id="logCard">
              <h1 className="titleLogIn text-center text-center">Log In</h1>
              <input type="text" id="inputLoginName" name="UserName" placeholder={this.state.UserName}
                className="form-control" onChange={this.handleChange} />
              <label htmlFor="username" />

              <input type="password" id="inputLoginPassword" name="Password" placeholder={this.state.Password}
                className="form-control" onChange={this.handleChange} />
              <label htmlFor="password" />
              <label htmlFor="Company" className="mt-2">
                <input type="checkbox" name="Company" id="Company" onChange={this.handleChange} checked={this.state.Company} />
                <span className="font-weight-bold ml-2">Company Account</span>
              </label> 
              <input type="submit" id="submitLogin" value="Log In" onClick={this.handleSubmit}
                className="form-control btn btn-success rounded-pill my-2" />
              <Link to="/createaccount"><input type="button" id="submitCreate" value="Create Account"
                className="form-control btn btn-primary rounded-pill mt-1" /></Link>
            </form>
          </div>
        </div>
      </>
    } else if (!this.state.LoggedStatus && !this.state.LinkStatus) {
      return <>
        <div className="logIn container my-5 py-4">
          <div className="loginWrapper">
            <form className="loginForm card container py-4" id="logCard">
              <h1 className="titleLogIn text-center text-center">Log In</h1>
              <div className="alert alert-danger" role="alert">
                Login Failed! Enter information again.
              </div>
              <input type="text" id="inputLoginName" name="UserName" placeholder={this.state.UserName}
                className="form-control" onChange={this.handleChange} />
              <label htmlFor="username" />

              <input type="password" id="inputLoginPassword" name="Password" placeholder={this.state.Password}
                className="form-control" onChange={this.handleChange} />
              <label htmlFor="password" />
              <label htmlFor="Company" className="mt-2">
                <input type="checkbox" name="Company" id="Company" onChange={this.handleChange} checked={this.state.Company} />
                <span className="font-weight-bold ml-2">Company Account</span>
              </label> 
              <input type="submit" id="submitLogin" value="Log In" onClick={this.handleSubmit}
                className="form-control btn btn-success rounded-pill my-2" />
              <Link to="/createaccount"><input type="button" id="submitCreate" value="Create Account"
                className="form-control btn btn-primary rounded-pill mt-1" /></Link>
            </form>
          </div>
        </div>
      </>
    } else if (this.state.LinkStatus) {
      return <>
        <Redirect to={"/dashboard/" + this.state.UserName} />
      </>
    }

  }
}

function LoginPage() {
  return (
    <div>
      <LoginAccount />
    </div>
  )
}

export default LoginPage;