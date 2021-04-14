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
      <div className="createPost">
        <h1>Create Post</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" id="title">
          <input type="text" id="title" name="title" value={this.state.title} placeholder="Title"
            onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="desc" id="desc">
            <textarea rows="15" id="desc" name="desc" value={this.state.desc} placeholder="Your text here"
            onChange={this.handleChange}/><br/>
          </label>
          <label htmlFor="loc" id="loc">
            <input type="text" id="loc" name="loc" value={this.state.loc} placeholder="Location"
            disabled={(this.state.disabled) ? "disabled" : ""} onChange={this.handleChange}/> <br/>
          </label>
          <label htmlFor="date">
            <input type="date" id="date" name="date" value={this.state.date} 
            onChange={this.handleChange}/>
          </label>
          <label htmlFor="time">
            <input type="time" id="time" name="time" value={this.state.time} 
            onChange={this.handleChange}/><br />
          </label>
          <label htmlFor="virtual">
            <input type="checkbox" id="virtual" name="virtual" value={this.state.verified} 
            onChange={this.handleVirtual}/>
            <span className="checkboxText">Virtual</span>
          </label>
          <label htmlFor="verified">
            <input type="checkbox" id="verified" name="verified" value={this.state.verified} 
            onChange={this.handleChange}/>
            <span className="checkboxText">Verified Users Only</span><br/>
          </label>
          <button type="button" id="cancel" className="floatLeft">Cancel</button>
          <input type="submit" value="Create Post" id="submit" className="floatRight"/>
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
