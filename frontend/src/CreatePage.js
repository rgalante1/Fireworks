import React from 'react';
import { Company } from './Company';
import './CreatePage.css';

class CreateAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      UserName: '',
      Password: '',
      Birthday: '',
      Company: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event){
    alert('Account Created');
    console.log(this.state);
    var bday = document.querySelector("#birthdayDate");
    bday.value = "";
    this.setState({
      FirstName: '',
      LastName: '',
      UserName: '',
      Password: '',
      Birthday: '',
      Company: false,
      CompanyName: '',
      CompanyDesc: ''
    });
    event.preventDefault();
  }

  render(){
    return(
      <div className="createAccount">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <label htmlFor="FirstName" className="col-6">
              <input type="text" id="FirstName" name="FirstName" value={this.state.FirstName} 
              placeholder="First Name" onChange={this.handleChange}/>
            </label>
            <label htmlFor="LastName" className="col-6 ml-n3">
              <input type="text" id="LastName" name="LastName" value={this.state.LastName} 
              placeholder="Last Name" onChange={this.handleChange}/>
            </label>
          </div>
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
          <label htmlFor="Company">
            <input type="checkbox" name="Company" id="Company" onChange={this.handleChange}/>
            <span className="font-weight-bold ml-2">Company Account</span>
          </label> <br />
          {
            this.state.Company && <Company onChange={ (event) => this.handleChange(event) }/>
          }
          <input type="submit" value="Create"/>
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
