import React from 'react';
import "./PostDisplay.css";
import { Meeting } from '../Meeting';
import { Link, Redirect } from 'react-router-dom';
import { PostsRepository } from '../api/PostRepository'
import { AccountsRepository } from '../api/AccountRepository';

export class EditPostDisplay extends React.Component{
  postRepo = new PostsRepository();
  accountRepo = new AccountsRepository();

  constructor(props){
    super(props);
    this.state = {
      title: props.post.title,
      desc: props.post.description,
      meeting: props.post.type === "meeting",
      date: props.post.date,
      time: '',
      loc: props.post.location,
      virtual: !props.post.virtual,
      disabled: false,
      submit: false,
      company: props.post.username,
      link: props.post.meetingLink,
      id: props.post.id
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

  handleSubmit(event) {
    if(!this.state.meeting){
    //   this.postRepo.createPost(this.state.company, this.state.title, this.state.desc, new Date()).then( x=>{ 
    //     this.setState({submit: true})
    //   });
    }
    else{
        event.preventDefault();
        this.postRepo.updateMeeting(this.state.id, this.state.desc, this.state.time, this.state.link,  
        this.state.loc, this.state.virtual ? 0 : 1, this.state.date, this.state.title).then( x =>
            {alert("updated");}
        );
    }
  }

  render() {
    return (<>
      <div className="postDisplay container mt-1 mb-1 py-4">
        <form onSubmit={this.handleSubmit} className="card container py-4" id="createPost">
          <label htmlFor="title" id="title">
            <input type="text" id="title" name="title" value={this.state.title} placeholder={this.state.title || 
                "Enter Title"} onChange={this.handleChange} className="form-control" />
          </label>
          <label htmlFor="desc" id="desc">
            <textarea rows="5" id="desc" name="desc" value={this.state.desc} placeholder={this.state.desc || 
            "Your text here"} onChange={this.handleChange} className="form-control" />
          </label>
          { 
          this.state.meeting && <>
            <label htmlFor="loc" id="loc">
                <input type="text" id="loc" name="loc" value={this.state.loc} 
                placeholder={this.state.loc|| "Location"} disabled={(this.state.disabled) ? "disabled" : ""} 
                onChange={this.handleChange} className="form-control" />
              </label>
              <label htmlFor="date">
                <input type="date" id="date" name="date" value={this.state.date} 
                onChange={this.handleChange} className="form-control" />
              </label>
              <label htmlFor="time">
                <input type="time" id="time" name="time" value={this.state.time} 
                onChange={this.handleChange} className="form-control" />
              </label>
              <label htmlFor="virtual" className="form-check">
                <input type="checkbox" id="virtual" name="virtual" value={this.state.verified} 
                onChange={this.handleVirtual} className="form-check-input" />
                <span className="checkboxText">Virtual</span>
              </label>
              {
                this.state.virtual &&
                <label htmlFor="link">
                  <input type="text" id="link" name="link" value={this.state.link} 
                  onChange={this.handleChange} className="form-control" 
                  placeholder={this.state.meetingLink || "Meeting Link"}/>
                </label>
              }
            </>
          }
          <input type="submit" value="Save Changes" id="submit" className="col btn btn-success rounded-pill mt-2"/>
        </form>
      </div>
      </>
    )
  }
}