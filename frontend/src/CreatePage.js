import React from 'react';
import './CreatePage.css';
import logo from './logo.jpg';

function Title(){
  return(
    <div className = "titleCard">
      <img src={logo} alt="fireworks title" height={125} width={366}/>
    </div>
  )
}

class CreateAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      FirstName: 'First Name',
      LastName: 'Last Name',
      UserName: 'User Name',
      Password: 'Password',
      Birthday: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event){
    alert('Account Created');
    event.preventDefault();
  }

  render(){
    return(
      <div className="createAccount">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="FirstName">
            <input type="text" id="FirstName" name="FirstName" value={this.state.FirstName} 
            className="floatLeft" onChange={this.handleChange}/>
          </label>
          <label htmlFor="LastName">
            <input type="text" id="LastName" name="LastName" value={this.state.LastName} 
            onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="UserName">
            <input type="text" id="UserName" name="UserName" value={this.state.UserName} 
            onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="Password">
            <input type="text" id="Password" name="Password" value={this.state.Password} 
            onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="Birthday" className="floatLeft" id="birthday">
            <p>Birthday:</p>
            <input type="date" name="Birthday" className="floatLeft" id="birthdayDate" 
            onChange={this.handleChange}/>
            <div className="clear"></div>
          </label>
          <input type="submit" value="Create" className="floatRight"/>
        </form>
      </div>
    )
  }
}

function CreatePage(){
  return(
    <div>
      <Title />
      <CreateAccount />
    </div>
  )
}

export default CreatePage;
