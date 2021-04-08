import React from 'react';
import './CreatePage.css';

class CreateAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Name: '',
      UserName: '',
      Password: '',
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
    var bday = document.querySelector("#birthdayDate");
    bday.value = "";
    this.setState({
      Name: '',
      UserName: '',
      Password: '',
      Birthday: ''
    });
    event.preventDefault();
  }

  render(){
    return(
      <div className="createAccount">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="Name">
            <input type="text" id="Name" name="Name" value={this.state.Name} 
            placeholder="Full Name" onChange={this.handleChange}/>
          </label>
          <label htmlFor="UserName">
            <input type="text" id="UserName" name="UserName" value={this.state.UserName} 
            placeholder="User Name" onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="Password">
            <input type="text" id="Password" name="Password" value={this.state.Password} 
            placeholder="Password" onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="Birthday" id="birthday">
            <p>Birthday:</p>
            <input type="date" name="Birthday" id="birthdayDate" 
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
      <CreateAccount />
    </div>
  )
}

export default CreatePage;
