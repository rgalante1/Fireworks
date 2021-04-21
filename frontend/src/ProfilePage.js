import './ProfilePage.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            RealName: 'Rani Rogan',
            UserNameLooking: 'error',
            CompanyName: 'rugby realty',
            AboutMe: 'Tenebrae descendunt super terras. Media nox mox aderit. Bestiae correpunt qui cruorem appetant ut tuam vicinitatem perterreant. Et quicumque videbitur habere nullum animum qui motet, debet consistere ut canibus infernalibus obviet ne intra tegumen cadaveris conputresceret.',
            JobTitle: 'Power Broker',
            Location: 'Dallas, Texas',
            PhoneNumber: '412-996-7269',
            EmailAddress: 'srwalsh@smu.edu',
            ProfilePhotoURL: 'https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg',
            MessageText: 'Hello! I\'d love to schedule a meeting with you if possible. Let me know!',

        }
        this.handleChange = this.handleChange.bind(this);
        this.buttonEdit = this.buttonEdit.bind(this);
        this.buttonInvite = this.buttonInvite.bind(this);
        this.imageExists = this.imageExists.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value })
        if (name === "UserName" && this.state.UserName === this.state.UserNameLooking)
            this.setState({ UserNameLooking: value })
    }

    imageExists(image_URL) {
        var http = new XMLHttpRequest();

        http.open('HEAD', image_URL, false);
        http.send();

        return http.status != 404;
    }

    buttonInvite(event) {
        if (this.state.UserName !== this.state.UserNameLooking) {
            return (
                <div className="wrapper">
                    <button type="button" className="btn btn-success buttonInvite" id="invitebutton" data-toggle="modal" data-target="#exampleModal">Invite</button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Please enter in your custom message to this user:</h5>
                                </div>
                                <div className="modal-body">
                                    <form className="changeForm">
                                        <label htmlFor="MessageText" className="labels">Message:</label><br />
                                        <textarea className="form-control ml-0" id="MessageText" name="MessageText" rows="4" cols="78" maxLength="300" placeholder={this.state.MessageText} onChange={this.handleChange} />
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">Send message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <button type="button" className="btn btn-success buttonInvite" id="invitebutton" data-toggle="modal" data-target="#exampleModal" disabled>Invite</button>
            )
        }

    }

    buttonEdit(props) {
        if (this.state.UserName === this.state.UserNameLooking) {
            return (
                <div className="wrapper">
                    <button type="button" className="btn btn-secondary buttonEdit" data-toggle="modal" data-target="#changeInfoModal">Edit Information</button>

                    <div className="modal fade" id="changeInfoModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Make any changes:</h5>
                                </div>
                                <div className="modal-body overflow-auto">
                                    <form className="changeForm">
                                            <div className="form-group">
                                                <label htmlFor="UserName" className="labels">Username:</label><br />
                                                <input type="form-control"  className="form-control border border-secondary" id="UserName" name="UserName" value={this.state.UserName} onChange={this.handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="RealName" className="labels">Name:</label><br />
                                                <input type="form-control" className="form-control border border-secondary" id="RealName" name="RealName" value={this.state.RealName} onChange={this.handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="CompanyName" className="labels">Company Name:</label><br />
                                                <input type="form-control" className="form-control border border-secondary" id="CompanyName" name="CompanyName" value={this.state.CompanyName} onChange={this.handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="JobTitle" className="labels">Job Title:</label><br />
                                                <input type="form-control" className="form-control border border-secondary" id="JobTitle" name="JobTitle" value={this.state.JobTitle} onChange={this.handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="ProfilePhotoURL" className="labels">Profile Photo URL:</label><br />
                                                <input type="form-control" className="form-control border border-secondary" id="ProfilePhotoURL" name="ProfilePhotoURL" value={this.state.ProfilePhotoURL} onChange={this.handleChange} />
                                                <small id="ProfilePhotoURL" class="form-text text-muted">Please use a link, such as an IMGUR link.</small>
                                            </div>

                                            <img src={this.imageExists(this.state.ProfilePhotoURL) ? this.state.ProfilePhotoURL : "https://www.civhc.org/wp-content/uploads/2018/10/question-mark.png"} alt="ERROR" className="center-block rounded-circle" height="100" width="100" />

                                            <div className="form-group">
                                                <label htmlFor="Location" className="labels">Location:</label><br />
                                                <input type="form-control" className="form-control border border-secondary" id="Location" name="Location" value={this.state.Location} onChange={this.handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="PhoneNumber" className="labels">Phone Number:</label><br />
                                                <input type="tel" className="form-control border border-secondary" id="PhoneNumber" name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange} />
                                                <small id="PhoneNumber" class="form-text text-muted">Format: 123-456-7890</small>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="EmailAddress" className="labels">Email Address:</label><br />
                                                <input type="email" className="form-control border border-secondary" id="EmailAddress" name="EmailAddress" value={this.state.EmailAddress} onChange={this.handleChange} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="AboutMe" className="labels">About Me:</label><br />
                                                <textarea className="form-control ml-0 border border-secondary" id="AboutMe" name="AboutMe" rows="5" value={this.state.AboutMe} onChange={this.handleChange} />
                                            </div>
                                    </form>
                                </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-success" data-dismiss="modal">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )

        }
        else {
            return (
                    <button type="button" className="btn btn-secondary buttonEdit" disabled>Edit Information</button>
            )
        }
    }

    render() {
        if (this.state.UserName === "") {
            return <>
                        <h3 className="text-center mt-5">Loading...</h3>
                    </>
        }
        else if(this.state.UserName === "usrnotfounderror") {
            return <>
                        <h3 className="text-center mt-5">We are recording an error finding the user. Please go back and try again.</h3>
                    </>
        }
        else {
            return <>
                        <div className="profilePage mb-5">
                            <div className="titleStuff">
                                <div className="profilePic">
                                    <img src={this.imageExists(this.state.ProfilePhotoURL) ? this.state.ProfilePhotoURL : "https://www.civhc.org/wp-content/uploads/2018/10/question-mark.png"} alt="ERROR" className="rounded-circle" height="200" width="200" />
                                </div>
                                <h2 className="usernameLabel font-weight-bold text-capitalize">{this.state.UserName}</h2>
                                <h4 className="companyName text-capitalize">{this.state.CompanyName}</h4>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="buttonStuff">
                                        {this.buttonInvite()}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="buttonStuff">
                                        {this.buttonEdit()}
                                    </div>
                                </div>
                            </div>



                            <div className="row no-gutters">
                                <div className="col">
                                    <div className="bundleText BTLeft">
                                        <p className="titles"><b>About Me:</b></p>
                                        <p className="info">{this.state.AboutMe}</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="bundleText BTRight">
                                        <p className="titles"><b >Name:</b> {this.state.RealName}</p>
                                        <p className="titles"><b >Job Title:</b> {this.state.JobTitle}</p>
                                        <p className="titles"><b >Location:</b> {this.state.Location}</p>
                                        <p className="titles"><b >Phone:</b> {this.state.PhoneNumber}</p>
                                        <p className="titles"><b >Email:</b> {this.state.EmailAddress}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
        }
    }

    componentDidMount() {
                        let userLook = this.props.match.params.usernameLooking;
        if (userLook) {
                        this.setState({ UserNameLooking: userLook });
        }

        let userPass = this.props.match.params.usernamePassed;
        if (userPass) {
                        this.setState({ UserName: userPass });
        }
    }
}