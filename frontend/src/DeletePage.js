import React from 'react';
import './DeletePage.css';
import logo from './logo.jpg';

function Title(){
  return(
    <div className = "titleCard">
      <img src={logo} alt="fireworks title" height={125} width={366}/>
    </div>
  )
}

class DeleteAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      UserName: '',
      Password: '',
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
    alert('Account Deleted');
    event.preventDefault();
  }

  render(){
    return(
      <div className="deleteAccount">
        <h1>Delete Account</h1>
        <p>Warning: this action is permanent</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="UserName">
            <input type="text" id="UserName" name="UserName" value={this.state.UserName} 
            placeholder="User Name" onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="Password">
            <input type="text" id="Password" name="Password" value={this.state.Password} 
            placeholder="Password" onChange={this.handleChange}/><br/>
          </label>
          <button type="button" className="floatLeft" onClick={() => alert('Cancel')}>Cancel</button>
          <input type="submit" value="Delete" className="floatRight"/>
        </form>
      </div>
    )
  }
}

function DeletePage(){
  return(
    <div>
      <Title />
      <DeleteAccount />
    </div>
  )
}

export default DeleteAccount;
