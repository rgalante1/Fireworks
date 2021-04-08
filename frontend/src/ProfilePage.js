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
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.chooseOption = this.chooseOption.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value })
    }

    buttonInvite(event) {
        alert("Button has been clicked.");
        { document.getElementById("invitebutton").disabled = true; };
    }

    chooseOption(props) {
        if (this.state.UserName === this.state.UserNameLooking) {
            return (
                <div className="wrapper">
                    <button type="button" className="btn btn-secondary buttonEdit" data-toggle="modal" data-target="#changeInfoModal">Edit Information</button>

                    <div className="modal fade" id="changeInfoModal" tabindex="-1" role="dialog">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Make any changes:</h5>
                                </div>
                                <div className="modal-body">
                                    <form className="changeForm">
                                        <div className="form-group">
                                            <label htmlFor="UserName" className="labels">Username:</label><br />
                                            <input type="text" className="inputs" id="UserName" name="UserName" value={this.state.UserName} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="RealName" className="labels">Name:</label><br />
                                            <input type="text" className="inputs" id="RealName" name="RealName" value={this.state.RealName} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="JobTitle" className="labels">Job Title:</label><br />
                                            <input type="text" className="inputs" id="JobTitle" name="JobTitle" value={this.state.JobTitle} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="Location" className="labels">Location:</label><br />
                                            <input type="text" className="inputs" id="Location" name="Location" value={this.state.Location} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="PhoneNumber" className="labels">Phone Number:</label><br />
                                            <input type="text" className="inputs" id="PhoneNumber" name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="EmailAddress" className="labels">Email Address:</label><br />
                                            <input type="text" className="inputs" id="EmailAddress" name="EmailAddress" value={this.state.EmailAddress} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="AboutMe" className="labels">About Me (300 Character Limit):</label><br />
                                            <textarea className="inputs AboutMeTxt" id="AboutMe" name="AboutMe" rows="4" cols="78" maxlength="300" value={this.state.AboutMe} onChange={this.handleChange} />
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
                <div className="profilePic">
                    <img src={this.state.ProfilePhotoURL} alt="fireworks login" className="center-cropped rounded-circle" />
                </div>
                <h2 className="usernameLabel font-weight-bold text-capitalize">{this.state.UserName}</h2>
                <h4 className="companyName text-capitalize">{this.state.CompanyName}</h4>

                <div className="row">
                    <div className="col">
                        <div className="buttonStuff">
                            <button type="button" className="btn btn-success buttonInvite" id="invitebutton" >Invite</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="buttonStuff">
                            { this.chooseOption() }
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