import React from 'react';
import { Company } from './Company';
import './CreatePage.css';
import { Redirect } from 'react-router-dom';

class CreateAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      UserName: '',
      Password: '',
      Birthday: '',
      Company: false,
      login: false
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
    
    this.setState({
      login: true
    });
    event.preventDefault();
  }

  render(){
    const login = this.state.login;
    if(login){
      return <Redirect  to={{pathname: "/dashboard/" + this.state.UserName}} />
    }
    return(
      <div className="container my-5 py-4">
        <form onSubmit={this.handleSubmit} className="card container py-4" id="signup">
          <h1 className="card-title text-center">Sign Up</h1>
          <div className="row">
            <label htmlFor="FirstName" className="col">
              <input type="text" id="FirstName" name="FirstName" value={this.state.FirstName} 
              placeholder="First Name" onChange={this.handleChange} className="form-control" required/>
            </label>
            <label htmlFor="LastName" className="col">
              <input type="text" id="LastName" name="LastName" value={this.state.LastName} 
              placeholder="Last Name" onChange={this.handleChange} className="form-control" required/>
            </label>
          </div>
          <label htmlFor="UserName">
            <input type="text" id="UserName" name="UserName" value={this.state.UserName} 
            placeholder="User Name" onChange={this.handleChange} className="form-control" required/>
          </label>
          <label htmlFor="Password">
            <input type="password" id="Password" name="Password" value={this.state.Password} 
            placeholder="Password" onChange={this.handleChange} className="form-control" required/>
          </label>
          <label htmlFor="Birthday" id="birthday">
            <p>Birthday:</p>
            <input type="date" name="Birthday" id="birthdayDate" className="form-control"
            onChange={this.handleChange} required/>
            <div className="clear"></div>
          </label>
          <label htmlFor="Company" className="mt-2">
            <input type="checkbox" name="Company" id="Company" onChange={this.handleChange}
            checked={this.state.Company} />
            <span className="font-weight-bold ml-2">Company Account</span>
          </label> 
          {
            this.state.Company && <Company onChange={ (event) => this.handleChange(event) }/>
          }
          <input type="submit" value="Create" className="btn btn-success mt-2 rounded-pill" required/>
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
