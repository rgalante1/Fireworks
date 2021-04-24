import React from 'react';
import { PostsRepository } from '../api/PostRepository';

export class SearchBar extends React.Component{
    postRepo = new PostsRepository();
    constructor(props){
        super(props);
        this.state = {
            postType: '',
            eventType: '',
            eventDate: '',
            searchBy: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(){
        if(this.state.postType === ""){
            return;
        }
        else if(this.state.postType === "Posts"){
            alert("searching by post");
            this.postRepo.getPosts().then(data =>{
                console.log(data);
            })
        }
        else{
            if(this.state.searchBy === ""){
                return;
            }
            else if(this.state.searchBy === "Type"){
                if(this.state.eventType === ""){
                    return;
                }
                alert("searching by event type " + this.state.eventType);
                this.postRepo.filterPosts("3", this.state.eventType).then(data =>{
                    console.log(data);
                });
            }
            else if(this.state.searchBy === "Date"){
                alert("searching by event date " + this.state.eventDate);
                this.postRepo.filterPosts("2", this.state.eventDate).then(data =>{
                    console.log(data);
                });
            }
            else{
                alert("searching by event location");
                this.postRepo.filterPosts("1", "0").then(data =>{
                    console.log(data);
                });
            }
        }
        this.props.onSearch();
    }

    render(){
        return(<> 
            <div className="card my-2 mx-2">
                <ul className="card-header"> 
                    <span className="text-secondary ml-1 ">Search Bar</span>
                </ul>
                <span className="card-body">
                    <ul className="row">
                        <span className="col-1">
                            Post Type:
                        </span>
                        <span>
                            <select id="postType" className="form-control col" onChange={this.handleChange}
                            name="postType" required>
                                <option></option>
                                <option>Posts</option>
                                <option>Events</option>
                            </select>
                        </span>
                    </ul>
                    {this.state.postType === "Events" && <>
                        <ul className="row">
                            <span className="col-1">Search By:</span>
                            <span className="mr-2">
                                <select id="searchBy" className="form-control col" name="searchBy"
                                onChange={this.handleChange} required>
                                    <option></option>
                                    <option>Type</option>
                                    <option>Date</option>
                                    <option>Location</option>
                                </select>
                            </span>
                            {
                                this.state.searchBy === "Type" && 
                                <>
                                <span className="col-1">Event Type:</span>
                                <span className="mr-2">
                                    <select id="eventType" className="form-control col" name="eventType"
                                    onChange={this.handleChange} required>
                                        <option></option>
                                        <option>Virtual</option>
                                        <option>In-Person</option>
                                    </select>
                                </span>
                                </>
                            }
                            {
                                this.state.searchBy === "Date" &&
                                <>
                                <span className="col-1">Event Date: </span>
                                <span>
                                    <label htmlFor="eventDate" id="eventDate">
                                        <input type="date" name="eventDate" id="eventDate" className="form-control" 
                                        onChange={this.handleChange} value={this.state.eventDate} required/>
                                    </label>
                                </span>
                                </>
                            }  
                        </ul>
                    </>}
                    <ul className="row">
                        <span className="btn btn-success" onClick={this.handleSubmit}>Search</span>
                    </ul> 
                </span>
            </div>
        </>
    )}
}