import React from 'react';
import {
    Link
} from "react-router-dom";
import { AccountsRepository } from '../api/AccountRepository';
import './UserList.css';

export default class UserList extends React.Component {
    accountRepo = new AccountsRepository();

    constructor(props) {
        super(props);
        this.state = {
            users: '',
            theSearch: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.imageExists = this.imageExists.bind(this);
        this.initializeUsers = this.initializeUsers.bind(this);
        this.searchUpdate = this.searchUpdate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    imageExists(image_URL) {
        if (image_URL) {
            return (image_URL.match(/\.(jpeg|jpg|gif|png)$/) != null);
        }
        return false;
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        this.setState({ theSearch: value });
    }

    searchUpdate(){
        if (!this.state.theSearch) {
            this.accountRepo.getUsers().then(result => {
                this.setState({ users: result });
            })
        } else if (this.state.theSearch) {
            this.accountRepo.searchUsers(this.state.theSearch).then(result => {
                this.setState({ users: result.data });
            })
        }
    }

    handleKeyPress(target) {
        if(target.charCode===13){
            if (!this.state.theSearch) {
                this.accountRepo.getUsers().then(result => {
                    this.setState({ users: result });
                })
            } else if (this.state.theSearch) {
                this.accountRepo.searchUsers(this.state.theSearch).then(result => {
                    this.setState({ users: result.data });
                })
            }
        }
    }

    render() {
        return <>
            <div className="colorBlue">
                <Link to={"/profile/" + this.props.match.params.username + "/" + this.props.match.params.username} className="btn btn-info float-right mr-3">Profile</Link>
                <Link to={"/dashboard/" + this.props.match.params.username} className="btn btn-info float-right mr-3">Dashboard</Link>
                <div className="row w-50">
                    <div className="col-8">
                        <input type="text" className="form-control" id="searchbar" value={this.state.theSearch} placeholder="Search..." onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-success" onClick={this.searchUpdate}>Search</button>
                    </div>
                </div>
            </div>
            <div className="clear-fix" />
            <div className="dashboardPage">
                <div className="row row-cols-1 row-cols-sm-6 p-3">
                    {this.state.users && this.state.users.map((x, i) =>
                        <div className="col mb-4" key={i}>
                            <div className="card">
                                <div className="imageCard">
                                    <img src={this.imageExists(x.picture) ? x.picture :
                                        "https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg"} alt="ERROR"
                                        className="rounded-circle mx-auto imageInside" />
                                </div>
                                <div className="card-header">
                                    <h4 className="text-center">{x.username}</h4>
                                    <p className="text-center pb-1 mb-0">{x.firstName + " " + x.lastName}</p>
                                </div>
                                <div className="card-body">
                                    <Link to={"/profile/" + this.props.match.params.username + "/" + x.username} className="btn btn-success w-100">Profile</Link>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    }

    initializeUsers() {
        if (this.state.users.length === 0) {
            if (!this.state.theSearch) {
                this.accountRepo.getUsers().then(result => {
                    this.setState({ users: result });
                })
            } else if (this.state.theSearch) {
                this.accountRepo.searchUsers(this.state.theSearch).then(result => {
                    this.setState({ users: result.data });
                })
            }
        }
    }

    componentDidMount() {
        this.initializeUsers();
    }
}