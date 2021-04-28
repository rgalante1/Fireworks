import './ProfilePage.css';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountRepository'
import { friendRequest } from '../models/friendRequest'

export default class ProfilePage extends React.Component {
    accountRepo = new AccountsRepository();

    constructor(props) {
        super(props);
        this.state = {
            UserName: 'initialVALUE',
            UserID: '',

            FirstName: '',
            LastName: '',

            UserNameLooking: '',
            UserLookingID: '',

            CompanyName: '',
            AboutMe: '',
            JobTitle: '',
            Location: '',
            PhoneNumber: '',
            EmailAddress: '',
            ProfilePhotoURL: 'https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg',
            friendRequests: [],
            tempUser: 'error',
            friendsAlready: false,
            currentFriends: []
        }
        this.baseState = this.state;

        this.handleChange = this.handleChange.bind(this);
        this.buttonEdit = this.buttonEdit.bind(this);
        this.imageExists = this.imageExists.bind(this);
        this.buttonFriendsList = this.buttonFriendsList.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.postFriendRequest = this.postFriendRequest.bind(this);
        this.initializeProfile = this.initializeProfile.bind(this);
        this.toggleRequests = this.toggleRequests.bind(this);
        this.deleteRequests = this.deleteRequests.bind(this);
        this.deleteRequestsAndButton = this.deleteRequestsAndButton.bind(this);
        this.setFriendsTrue = this.setFriendsTrue.bind(this);
    }

    setFriendsTrue(){
        this.setState({ friendsAlready: true })
    }

    toggleRequests(inviteID, friendRequestAcc, index) {
        var btn = document.getElementById('buttonAccept' + index);
        var btnDecline = document.getElementById('buttonDecline' + index);
        this.accountRepo.updateRequest(inviteID).then(
            btn.disabled = true,
            btnDecline.hidden = true,
            btn.innerText = 'Accepted!',
            
            this.setState(prevState => ({
                currentFriends: prevState.currentFriends.concat(friendRequestAcc),
            })),
        )
    }

    deleteRequestsAndButton(inviteID, index) {
        var btn = document.getElementById('buttonAccept' + index);
        var btnDecline = document.getElementById('buttonDecline' + index);
        this.accountRepo.deleteRequest(inviteID).then(
            btn.hidden = true,
            btnDecline.disabled = true,
            btnDecline.innerText = 'Declined.',
        );
    }

    deleteRequests(inviteID, index) {
        var btn = document.getElementById('buttonDelete' + index);
        this.accountRepo.deleteRequest(inviteID).then(
            btn.disabled = true,
            btn.innerText = 'Removed!'
        )
    }

    postFriendRequest() {
        this.accountRepo.createFriendInvite(this.state.UserID, this.state.UserLookingID, (new Date()).toISOString());
    }

    saveChanges(event) {
        this.accountRepo.updateProfile(this.state.UserName, this.state.FirstName,
            this.state.LastName, this.state.AboutMe, this.state.JobTitle,
            this.state.Location, this.state.PhoneNumber, this.state.EmailAddress,
            this.state.ProfilePhotoURL, this.state.CompanyName);
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
        if (image_URL) {
            return (image_URL.match(/\.(jpeg|jpg|gif|png)$/) != null);
        }
        return false;
    }

    buttonEdit(props) {
        if (this.state.UserName === this.state.UserNameLooking) {
            return (
                <div className="wrapper">
                    <button type="button" className="btn btn-secondary btn-lg buttonEdit px-4" data-toggle="modal" data-target="#changeInfoModal">Edit   Info</button>

                    <div className="modal fade" id="changeInfoModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Make any changes:</h5>
                                </div>
                                <div className="modal-body overflow-auto">
                                    <form className="changeForm">
                                        <div className="form-group">
                                            <label htmlFor="FirstName" className="labels">First Name:</label><br />
                                            <input type="form-control" className="form-control border border-secondary" id="FirstName" name="FirstName" value={this.state.FirstName} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="LastName" className="labels">Last Name:</label><br />
                                            <input type="form-control" className="form-control border border-secondary" id="LastName" name="LastName" value={this.state.LastName} onChange={this.handleChange} />
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
                                            <small id="ProfilePhotoURL" className="form-text text-muted">Please use a link, such as an IMGUR link.</small>
                                        </div>

                                        <img src={this.imageExists(this.state.ProfilePhotoURL) ? this.state.ProfilePhotoURL : "https://www.civhc.org/wp-content/uploads/2018/10/question-mark.png"} alt="ERROR" className="center-block rounded-circle" height="100" width="100" />

                                        <div className="form-group">
                                            <label htmlFor="Location" className="labels">Location:</label><br />
                                            <input type="form-control" className="form-control border border-secondary" id="Location" name="Location" value={this.state.Location} onChange={this.handleChange} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="PhoneNumber" className="labels">Phone Number:</label><br />
                                            <input type="tel" className="form-control border border-secondary" id="PhoneNumber" name="PhoneNumber" value={this.state.PhoneNumber} onChange={this.handleChange} />
                                            <small id="PhoneNumber" className="form-text text-muted">Format: 123-456-7890</small>
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
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.saveChanges}>Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
        else {
            if (!this.state.friendsAlready) {
                return (
                    <div className="wrapper">
                        <button type="button" className="btn btn-success btn-lg buttonEdit" id="invitebutton" data-toggle="modal" data-target="#exampleModal" onClick={this.postFriendRequest}>Friend Invite</button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="exampleModalLabel">Friend invite sent!</h3>
                                    </div>
                                    <div className="modal-body">
                                        <p className="modal-title" id="exampleModalLabel">Check back later to see if they accept or decline.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.setFriendsTrue}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="wrapper">
                        <button type="button" className="btn btn-success btn-lg buttonEdit" id="invitebutton" data-toggle="modal" data-target="#exampleModal">Friend Invite</button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-sm" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="modal-title" id="exampleModalLabel">Uh oh!</h3>
                                    </div>
                                    <div className="modal-body">
                                        <p className="modal-title" id="exampleModalLabel">You and this user are already friends, or are pending friendship.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    buttonFriendsList(props) {
        if (this.state.UserName === this.state.UserNameLooking) {
            return (
                <div className="wrapper">
                    <button type="button" className="btn btn-info btn-lg buttonEdit" data-toggle="modal" data-target="#friendsListModal">Friend Invites</button>

                    <div className="modal fade" id="friendsListModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Current Pending Friend Invites:</h5>
                                </div>
                                <div className="modal-body bg-light overflow-auto">
                                    {
                                        (this.state.friendRequests.length === 0) && <p>You have no pending friend invites!</p>
                                    }
                                    {
                                        this.state.friendRequests && this.state.friendRequests.map((x, i) =>
                                            <div className="card m-3" key={i}>
                                                <div className="card-body">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <div className="well"><img src={this.imageExists(x.profilePhotoURL) ? x.profilePhotoURL :
                                                                    "https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg"} alt="ERROR"
                                                                    className="rounded-circle w-50 h-50" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="well"><h4 className="pt-3 pb-2 text-center">{x.senderName}</h4></div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="well"><button type="button" id={"buttonAccept" + i} className="btn btn-success w-50 float-right mb-3" onClick={() => this.toggleRequests(x.inviteID, x, i)}>Accept</button></div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="well"><h5 className="pt-2 text-secondary text-center">{x.senderUsername}</h5></div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="well"><button type="button" id={"buttonDecline" + i} className="btn btn-danger w-50 float-right" onClick={() => this.deleteRequestsAndButton(x.inviteID, i)}>Decline</button></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="clearfix" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
        else {
            return (
                <button type="button" className="btn btn-info btn-lg buttonEdit" data-toggle="modal" disabled data-target="#changeInfoModal">Friend Invites</button>
            )
        }
    }

    render() {
        if (!window.userName) {
            return <Redirect to="/login" />
        }

        return <>
            <div className="pb-5">
                <div className="titleStuff">
                    <div className="profilePic">
                        <img src={this.imageExists(this.state.ProfilePhotoURL) ? this.state.ProfilePhotoURL :
                            "https://www.civhc.org/wp-content/uploads/2018/10/question-mark.png"} alt="ERROR"
                            className="rounded-circle" height="200" width="200" />
                    </div>
                    <h2 className="usernameLabel font-weight-bold text-capitalize">{this.state.UserName}</h2>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="m-2">
                            <Link to="/dashboard" className="btn btn-primary btn-lg buttonLink">Return to Dash</Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="m-2">
                            {this.buttonEdit()}
                        </div>
                    </div>
                </div>

                {
                    (this.state.UserName === this.state.UserNameLooking) && (
                        <div className="row">
                            <div className="col">
                                <div className="m-2">

                                    <Link to="/deleteaccount" className="btn btn-danger btn-lg buttonLink">Delete Account</Link>
                                </div>
                            </div>
                            <div className="col">
                                <div className="m-2">
                                    {
                                        (this.state.UserName === this.state.UserNameLooking) && this.buttonFriendsList()
                                    }
                                </div>
                            </div>
                        </div>)
                }


                <div className="clearfix" />

                <div className="row no-gutters">
                    <div className="col ">
                        <div className="bundleText BTLeft profilePage">
                            <p className="titles"><b>About Me:</b></p>
                            <p className="info pb-3">{this.state.AboutMe}</p>
                        </div>
                    </div>
                    <div className="col">

                        <div className="bundleText BTRight profilePage">
                            <p className="titles"><b >Name:</b> {this.state.FirstName + " " + this.state.LastName}</p>
                            <p className="titles"><b >Company:</b> {this.state.CompanyName}</p>
                            <p className="titles"><b >Job Title:</b> {this.state.JobTitle}</p>
                            <p className="titles"><b >Location:</b> {this.state.Location}</p>
                            <p className="titles"><b >Phone:</b> {this.state.PhoneNumber}</p>
                            <p className="titles"><b >Email:</b> {this.state.EmailAddress}</p>
                        </div>
                    </div>
                </div>
                <div className="w-75 mx-auto mt-3">
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            Friends List:
                            </div>
                        <div className="card-body bg-light">
                            {
                                (this.state.currentFriends.length === 0) && (this.state.UserName === this.state.UserNameLooking) && <p>You have no friends.</p>
                            }
                            {
                                (this.state.currentFriends.length === 0) && (this.state.UserName !== this.state.UserNameLooking) && <p>This user has no friends.</p>
                            }
                            {
                                this.state.currentFriends && this.state.currentFriends.map((x, i) =>
                                    <div className="card m-3" key={i}>
                                        <div className="card-body">
                                            <div className="container">
                                                <div className="row mx-auto">
                                                    <div className="col mx-auto">
                                                        <div className="well mx-auto"><h4 className="mb-0 pb-0 mt-2 text-center">{x.senderName}</h4></div>
                                                    </div>
                                                    <div className="col mx-auto">
                                                        {
                                                            (this.state.UserName === this.state.UserNameLooking) && <div className="well mx-auto"><button type="button" id={"buttonDelete" + i} className="btn btn-danger w-75 mx-auto" onClick={() => this.deleteRequests(x.inviteID, i)}>Remove Friend</button></div>
                                                        }
                                                    </div>
                                                    <div className="col mx-auto">
                                                        <div className="well mx-auto"><Link to={"/profile/" + x.senderUsername} type="button" className="btn btn-success w-75 mx-auto" >View Profile</Link></div>
                                                    </div>
                                                </div>
                                                <div className="clearfix" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    initializeProfile(userNameLookParam, userNamePassParam) {
        let userLook = userNameLookParam;
        if (userLook) {
            this.setState({ UserNameLooking: userLook });

            this.accountRepo.getUserInfo(userLook).then(account => {
                let accArray = account[0];
                if (accArray) {
                    if (accArray.userID)
                        this.setState({ UserLookingID: accArray.userID });
                }
            })
        }

        let userPass = userNamePassParam;

        if (userPass) {
            this.setState({ UserName: userPass });

            this.accountRepo.getUserInfo(userPass).then(account => {
                let accArray = account[0];
                if (accArray) {
                    if (accArray.userID)
                        this.setState({ UserID: accArray.userID });

                    if (accArray.firstName)
                        this.setState({ FirstName: accArray.firstName });

                    if (accArray.lastName)
                        this.setState({ LastName: accArray.lastName });

                    if (accArray.bio)
                        this.setState({ AboutMe: accArray.bio });

                    if (accArray.title)
                        this.setState({ JobTitle: accArray.title });

                    if (accArray.phone)
                        this.setState({ PhoneNumber: accArray.phone });

                    if (accArray.mail)
                        this.setState({ EmailAddress: accArray.mail });

                    if (accArray.picture)
                        this.setState({ ProfilePhotoURL: accArray.picture });

                    if (accArray.location)
                        this.setState({ Location: accArray.location });

                    if (accArray.companyName)
                        this.setState({ CompanyName: accArray.companyName });
                    
                }
            })


            if (userPass === userLook) {
                this.accountRepo.getFriendRequests(userPass).then(invites => {
                    let inviteList = invites.data;

                    if (invites.data) {
                        let tempArray = [];
                        for (var index = 0; index < inviteList.length; index++)
                            tempArray.push(new friendRequest(inviteList[index].accepted,
                                inviteList[index].addresseeID, inviteList[index].dateSent,
                                inviteList[index].inviteID,
                                (inviteList[index].firstName + " " + inviteList[index].lastName),
                                inviteList[index].username, inviteList[index].picture));

                        this.setState({ friendRequests: tempArray })
                    }
                }
                )
            }

            this.accountRepo.getAcceptedAddressee(userPass).then(req => {
                let friendList = req.data;
                if (friendList) {
                    let tempArray = [];
                    for (var index = 0; index < friendList.length; index++)
                        tempArray.push(new friendRequest(friendList[index].accepted,
                            friendList[index].addresseeID, friendList[index].dateSent,
                            friendList[index].inviteID,
                            (friendList[index].firstName + " " + friendList[index].lastName),
                            friendList[index].username, friendList[index].picture));

                    this.setState(prevState => ({
                        currentFriends: prevState.currentFriends.concat(tempArray)
                    }));
                }
            })

            this.accountRepo.getAcceptedSender(userPass).then(req => {
                let friendList = req.data;
                if (friendList) {
                    let tempArray = [];
                    for (var index = 0; index < friendList.length; index++)
                        tempArray.push(new friendRequest(friendList[index].accepted,
                            friendList[index].addresseeID, friendList[index].dateSent,
                            friendList[index].inviteID,
                            (friendList[index].firstName + " " + friendList[index].lastName),
                            friendList[index].username, friendList[index].picture));

                    this.setState(prevState => ({
                        currentFriends: prevState.currentFriends.concat(tempArray)
                    }));
                }
            })
        }

        if (userPass !== userLook) {
            this.accountRepo.getFriendRequestExistance(userPass, userLook).then(invite => {
                if (invite && invite.length !== 0) {
                    this.setState({ friendsAlready: true });
                }
            })

            this.accountRepo.getFriendRequestExistance(userLook, userPass).then(invite => {
                if (invite && invite.length !== 0) {
                    this.setState({ friendsAlready: true });
                }
            })
        }
    }

    componentDidMount() {
        this.initializeProfile(window.userName, this.props.match.params.usernamePassed);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.usernamePassed !== this.props.match.params.usernamePassed) {
            this.setState(this.baseState);
            this.setState({ friendsAlready: false });
            this.initializeProfile(window.userName, this.props.match.params.usernamePassed);
        }
    }
}