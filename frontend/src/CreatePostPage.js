import React from 'react';
import './CreatePostPage.css';
import { Meeting } from './Meeting';
import { Link, Redirect } from 'react-router-dom';
import { PostsRepository } from './api/PostRepository'
import { AccountsRepository } from './api/AccountRepository';

export class CreatePostPage extends React.Component{
  postRepo = new PostsRepository();
  accountRepo = new AccountsRepository();

  constructor(props){
    super(props);
    this.state = {
      title: '',
      desc: '',
      meeting: false,
      date: '',
      time: '',
      loc: '',
      virtual: '',
      disabled: false,
      submit: false,
      user: '',
      company: '',
      link: ''
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
      this.postRepo.createPost(this.state.company, this.state.title, this.state.desc, new Date()).then( x=>{ 
        this.setState({submit: true})
      });
    }
    else{
      this.postRepo.createMeeting(this.state.desc, this.state.time, this.state.link, this.state.company, 
      this.state.loc, this.state.virtual ? 0 : 1, this.state.date, this.state.title).then(x=>{
        this.setState({submit: true});
      })
    }
    event.preventDefault();
  }

  render() {
    const submitted = this.state.submit;
    if(submitted){
      return <Redirect to={"/dashboard/" + this.state.user} />
    }
    return (<>
      <div className="container my-5">
        <form onSubmit={this.handleSubmit} className="card container py-4" id="createPost">
          <h1 className="card-title text-center">Create Post</h1>
          <label htmlFor="title" id="title">
            <input type="text" id="title" name="title" value={this.state.title} placeholder="Title"
            onChange={this.handleChange} className="form-control" required/>
          </label>
          <label htmlFor="desc" id="desc">
            <textarea rows="15" id="desc" name="desc" value={this.state.desc} placeholder="Your text here"
            onChange={this.handleChange} className="form-control" required/>
          </label>
          <label htmlFor="meeting" className="mt-2">
            <input type="checkbox" name="meeting" id="meeting" onChange={this.handleChange}
            checked={this.state.meeting} />
            <span className="font-weight-bold ml-2">Make a Meeting</span>
          </label> {
            this.state.meeting && <Meeting onChange={ (event) => this.handleChange(event) }/>
          }
          <Link to={"/dashboard/" + this.state.user} id="cancel" className="col btn btn-secondary rounded-pill my-2">Cancel</Link>
          <input type="submit" value="Create Post" id="submit" className="col btn btn-success rounded-pill mt-2"/>
        </form>
      </div>
      </>
    )
  }
  componentDidMount() {
    let userName = this.props.match.params.userName;
    if(userName){
      this.setState({user: userName});
    }
    this.accountRepo.getCompany(userName).then(company => {
      let compData = company[0];
      console.log(compData);
      this.setState({company: compData.companyID})
    });
  }
}