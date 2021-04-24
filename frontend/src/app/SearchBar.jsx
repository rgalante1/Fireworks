import React from 'react';

export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postType: '',
            eventType: '',
            eventDate: ''
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
        alert("Searching");
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
                            name="postType">
                                <option></option>
                                <option>Posts</option>
                                <option>Events</option>
                            </select>
                        </span>
                    </ul>
                    {this.state.postType == "Events" && <>
                        <ul className="row">
                            <span className="col-1">Event Type:</span>
                            <span className="mr-2">
                                <select id="eventType" className="form-control col" name="eventType"
                                onChange={this.handleChange} >
                                    <option></option>
                                    <option>Virtual</option>
                                    <option>In Person</option>
                                </select>
                            </span>
                            <span className="col-1">Event Date: </span>
                            <span>
                                <label htmlFor="eventDate" id="eventDate">
                                    <input type="date" name="eventDate" id="eventDate" className="form-control" 
                                    onChange={this.handleChange} value={this.state.eventDate} />
                                </label>
                            </span>
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