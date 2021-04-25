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
            this.postRepo.getPosts().then(data =>{
                this.props.onSearch(data, 1);
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
                this.postRepo.filterPosts("3", this.state.eventType === "Virtual" ? 0 : 1).then(data =>{
                    this.props.onSearch(data, 0);
                });
            }
            else if(this.state.searchBy === "Date"){
                this.postRepo.filterPosts("2", this.state.eventDate).then(data =>{
                    this.props.onSearch(data, 0);
                });
            }
            else{
                this.postRepo.filterPosts("1", "0").then(data =>{
                    this.props.onSearch(data, 0);
                });
            }
        }
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