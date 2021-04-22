import React from 'react';
import './DeletePage.css';
import { Link, Redirect } from 'react-router-dom';

export class DeletePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      UserName: '',
      Password: '',
      user: '',
      deleted: false
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
    this.setState({deleted: true});
    event.preventDefault();
  }

  render(){
    const deleted = this.state.deleted;
    if(deleted){
      return <Redirect to="/login"/>
    }
    return(
      <div className="container my-5">
        <form onSubmit={this.handleSubmit} className="container card py-4" id="deletePage">
          <h1 className="card-title text-center">Delete Account</h1>
          <p className="text-center">Warning: this action is permanent</p>
          <label htmlFor="UserName">
            <input type="text" id="UserName" name="UserName" value={this.state.UserName} 
            placeholder="User Name" onChange={this.handleChange} className="form-control" required/>
          </label>
          <label htmlFor="Password">
            <input type="text" id="Password" name="Password" value={this.state.Password} 
            placeholder="Password" onChange={this.handleChange} className="form-control" required/>
          </label>
          <Link to={"/dashboard/" + this.state.user} type="button" id="cancel" 
          className="form-control btn btn-secondary rounded-pill mt-2">Cancel</Link>
          <input type="submit" id="delete" value="Delete" className="form-control btn btn-danger rounded-pill mt-2"/>
        </form>
      </div>
    )
  }

  componentDidMount() {
    let userName = this.props.match.params.userName;
    if (userName) {
      this.setState({ user: userName });
    }
  }
}
