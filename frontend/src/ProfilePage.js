import './ProfilePage.css';
import React from 'react';

class ShowProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: this.props.usernamePassed,
            RealName: 'Rani Rogan',
            UserNameLooking: this.props.usernameLooking,
            CompanyName: 'rugby realty',
            AboutMe: 'Tenebrae descendunt super terras. Media nox mox aderit. Bestiae correpunt qui cruorem appetant ut tuam vicinitatem perterreant. Et quicumque videbitur habere nullum animum qui motet, debet consistere ut canibus infernalibus obviet ne intra tegumen cadaveris conputresceret.',
            JobTitle: 'Website Wizard',
            Location: 'Dallas, Texas',
            PhoneNumber: '412-996-7269',
            EmailAddress: 'srwalsh@smu.edu',
            ProfilePhotoURL: 'https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg',
            MessageText: 'Hello! I\'d love to schedule a meeting with you if possible. Let me know!',

        }
        this.handleChange = this.handleChange.bind(this);
        this.buttonEdit = this.buttonEdit.bind(this);
        this.buttonInvite = this.buttonInvite.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value })
        if (name === "UserName" && this.state.UserName === this.state.UserNameLooking)
            this.setState({ UserNameLooking: value })
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
                                        <textarea className="inputs AboutMeTxt" id="MessageText" name="MessageText" rows="4" cols="78" maxLength="300" placeholder={this.state.MessageText} onChange={this.handleChange} />
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
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Make any changes (16 character limit unless specified):</h5>
                                </div>
                                <div className="modal-body">
                                    <form className="changeForm">
                                        <div className="form-group">
                                            <label htmlFor="UserName" className="labels">Username:</label><br />
                                            <input type="text" className="inputs" id="UserName" name="UserName" maxLength="16" value={this.state.UserName} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="RealName" className="labels">Name:</label><br />
                                            <input type="text" className="inputs" id="RealName" name="RealName" maxLength="16" value={this.state.RealName} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="JobTitle" className="labels">Job Title:</label><br />
                                            <input type="text" className="inputs" id="JobTitle" name="JobTitle" maxLength="16" value={this.state.JobTitle} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Location" className="labels">Location:</label><br />
                                            <input type="text" className="inputs" id="Location" name="Location" maxLength="16" value={this.state.Location} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="PhoneNumber" className="labels">Phone Number:</label><br />
                                            <input type="text" className="inputs" id="PhoneNumber" name="PhoneNumber" maxLength="16" value={this.state.PhoneNumber} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="EmailAddress" className="labels">Email Address:</label><br />
                                            <input type="text" className="inputs" id="EmailAddress" name="EmailAddress" maxLength="16" value={this.state.EmailAddress} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="AboutMe" className="labels">About Me (300 Character Limit):</label><br />
                                            <textarea className="inputs AboutMeTxt" id="AboutMe" name="AboutMe" rows="4" cols="78" maxLength="300" value={this.state.AboutMe} onChange={this.handleChange} />
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
        return (
            <div className="profilePage">
                <div className="titleStuff">
                    <div className="profilePic">
                        <img src={this.state.ProfilePhotoURL} alt="fireworks login" className="center-cropped rounded-circle" />
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
        )
    }
}

const ProfilePage = ({ usernameLooking, usernamePassed }) => {
    return (
        <div>
            <ShowProfile usernameLooking={usernameLooking} usernamePassed={usernamePassed} />
        </div>
    )
}

export default ProfilePage;