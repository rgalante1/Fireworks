import React from 'react';
import './DeletePage.css';

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
          <button type="button" id="cancel"  onClick={() => alert('Cancel')}>Cancel</button>
          <input type="submit" id="delete" value="Delete"/>
        </form>
      </div>
    )
  }
}

function DeletePage(){
  return(
    <div>
      <DeleteAccount />
    </div>
  )
}

export default DeletePage;
