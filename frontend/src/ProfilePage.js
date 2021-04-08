import './ProfilePage.css';
import React from 'react';

class ShowProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: this.props.usernamePassed,
            UserNameLooking: this.props.usernameLooking,
            CompanyName: 'fireWork benefits',
            AboutMe: 'Tenebrae descendunt super terras. Media nox mox aderit. Bestiae correpunt qui cruorem appetant ut tuam vicinitatem perterreant. Et quicumque videbitur habere nullum animum qui motet, debet consistere ut canibus infernalibus obviet ne intra tegumen cadaveris conputresceret. In aere pendet foedissimus, foetor quadraginta milia annum, et horribiles lemures ex omnibus sepulchris includunt ut fatum perficiant.',
            JobTitle: 'Website Wizard',
            Location: 'Dallas, Texas',
            PhoneNumber: '412-996-7269',
            EmailAddress: 'srwalsh@smu.edu',
            ProfilePhotoURL: 'https://i.imgur.com/OgKeRBk.png',
            /*https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg*/
        }
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

    buttonEdit(event) {

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
                            <button type="button" className="btn btn-success buttonInvite" id="invitebutton" onClick={() => this.buttonInvite()}>Invite</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="buttonStuff">
                            <button type="button" className="btn btn-secondary buttonEdit" data-toggle="modal" data-target="#exampleModal">Edit Information</button>

                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Uh oh!</h5>
                                        </div>
                                        <div className="modal-body">
                                            According to our records, this is not your account. You can only edit the data on your own account!
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <p className="titles"><b >Name:</b> {this.state.UserName}</p>
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