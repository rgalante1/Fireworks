import React from 'react';
import './CreatePostPage.css';
import { Meeting } from './Meeting';

class CreatePost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      desc: '',
      meeting: false,
      date: '',
      time: '',
      loc: '',
      verified: '',
      virtual: '',
      disabled: false
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
    alert('Created Post');
    this.setState({
      title: '',
      desc: '',
      meeting: false,
      date: '',
      time: '',
      loc: '',
      verified: '',
      virtual: '',
      disabled: false
    });
    event.preventDefault();
  }

  

  render(){
    return(
      <div className="container my-5">
        <form onSubmit={this.handleSubmit} className="card container py-4" id="createPost">
          <h1 className="card-title text-center">Create Post</h1>
          <label htmlFor="title" id="title">
            <input type="text" id="title" name="title" value={this.state.title} placeholder="Title"
            onChange={this.handleChange} className="form-control"/>
          </label>
          <label htmlFor="desc" id="desc">
            <textarea rows="15" id="desc" name="desc" value={this.state.desc} placeholder="Your text here"
            onChange={this.handleChange} className="form-control"/>
          </label>
          <label htmlFor="meeting" className="mt-2">
            <input type="checkbox" name="meeting" id="meeting" onChange={this.handleChange}
            checked={this.state.meeting} />
            <span className="font-weight-bold ml-2">Make a Meeting</span>
          </label> {
            this.state.meeting && <Meeting onChange={ (event) => this.handleChange(event) }/>
          }
          <button type="button" id="cancel" className="col btn btn-secondary rounded-pill my-2">Cancel</button>
          <input type="submit" value="Create Post" id="submit" className="col btn btn-success rounded-pill mt-2"/>
        </form>
      </div>
    )
  }
}

function CreatePostPage(){
  return(
    <div>
      <CreatePost />
    </div>
  )
}

export default CreatePostPage;
