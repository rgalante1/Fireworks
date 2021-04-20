import React from 'react';
import './CreatePostPage.css';

class CreatePost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      desc: '',
      date: '',
      time: '',
      loc: '',
      verified: '',
      virtual: '',
      disabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVirtual = this.handleVirtual.bind(this);
  }
  
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event){
    alert('Created Post');
    var date = document.querySelector("#date");
    date.value = "";
    this.setState({
      title: '',
      desc: '',
      date: '',
      time: '',
      loc: '',
      verified: '',
      virtual: '',
      disabled: false
    });
    event.preventDefault();
  }

  handleVirtual(event){
    if(!this.state.disabled){
      this.setState({
        disabled: true,
        loc: 'Virtual'
      });
    }
    else{
      this.setState({
        disabled: false,
        loc: ''
      });
    }
    this.handleChange(event);
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
          <label htmlFor="loc" id="loc">
            <input type="text" id="loc" name="loc" value={this.state.loc} placeholder="Location"
            disabled={(this.state.disabled) ? "disabled" : ""} onChange={this.handleChange} className="form-control"/>
          </label>
          <label htmlFor="date">
            <input type="date" id="date" name="date" value={this.state.date} 
            onChange={this.handleChange} className="form-control"/>
          </label>
          <label htmlFor="time">
            <input type="time" id="time" name="time" value={this.state.time} 
            onChange={this.handleChange} className="form-control"/>
          </label>
          <label htmlFor="virtual" className="form-check">
            <input type="checkbox" id="virtual" name="virtual" value={this.state.verified} 
            onChange={this.handleVirtual} className="form-check-input"/>
            <span className="checkboxText">Virtual</span>
          </label>
          <label htmlFor="verified" className="form-check">
            <input type="checkbox" id="verified" name="verified" value={this.state.verified} 
            onChange={this.handleChange} className="form-check-input"/>
            <span className="checkboxText">Verified Users Only</span>
          </label>
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
