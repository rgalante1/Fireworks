import axios from "axios";

axios.defaults.withCredentials = true;

export class AccountsRepository {

    // url = 'http://ec2-3-128-160-107.us-east-2.compute.amazonaws.com:8000';
    url = 'http://localhost:8000';

    config = {
        withCredentials: true
    };

    createAccount(firstName, lastName, userName, password, birthDate, companyName, companyDescription) {
        return new Promise((resolve, reject) => {
            let body = {
                FirstName: firstName,
                LastName: lastName,
                UserName: userName,
                PassWord: password,
                BirthDate: birthDate
            };

            if (companyName && companyDescription) {
                body["CompanyData"] = {
                    Name: companyName,
                    Description: companyDescription
                };
            }

            axios.post(`${this.url}/createaccount`, body, this.config)
                .then(x => resolve())
                .catch(error => reject(error));
        })
    }

    deleteAccount(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/login`, {username, password}, this.config)
                .then(x => {
                    if (x.data) {
                        this.getUserInfo(username).then(result => {
                            if (result && result[0]) {
                                axios.delete(`${this.url}/user/delete/` + result[0].userID, this.config)
                                    .then(resolve(true))
                                    .catch(er => reject(er));
                            }
                        }).catch(err => reject(err));
                    } else {
                        resolve(false);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/get`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting all users!");
                    reject(error);
                });
        })
    }

    getPosts() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/post`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting all users!");
                    reject(error);
                });
        })
    }

    getUserByID(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting user by ID!");
                    reject(error);
                });
        });
    }

    getAttendees(meetingID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/meeting/${meetingID}/attendees`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting attendees!");
                    reject(error);
                });
        });
    }

    getUserInfo(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/profile/${username}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        });
    }

    getUserPass(username, password, company) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/login`, {username, password, company}, this.config)
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAllFriendInvites() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/friendInvites`, this.config)
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    getFriendRequests(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/profile/${username}/friendrequests`, this.config)
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAcceptedAddressee(username){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/profile/${username}/acceptedrequestsAddressee`, this.config)
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    getAcceptedSender(username){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/profile/${username}/acceptedrequestsSender`, this.config)
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    searchUsers(query){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/profile/search/${query}`, this.config)
                .then(x => resolve(x))
                .catch(error => {
                    reject(error);
                });
        });
    }

    getFriendRequestExistance(useraddressee, usersender){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/profile/requestcheck/${useraddressee}/${usersender}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting friend request (specific)");
                    reject(error);
                })
        })
    }

    createFriendInvite(addresseeID, senderID, dateSent){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/createFriendInvites`, {addresseeID, senderID, dateSent}, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                alert("Error creating friendRequest");
                reject(error);
            });
        })
    }

    updateAccount(id, account) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/${id}`, account, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error updating account!");
                    reject(error);
                });
        });
    }

    updateRequest(inviteID) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/profile/${inviteID}/togglerequest`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error updating request!");
                    reject(error);
                });
        });
    }

    deleteRequest(inviteID) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/profile/${inviteID}/deleteFR`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error deleting request!");
                    reject(error);
                });
        });
    }

    

    updateProfile(username, firstName, lastName, bio, title, location, phoneNumber, emailAddress, profilePhotoURL, companyName){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/profile/${username}/changeinfo`, {username, firstName, lastName, bio, title, location, phoneNumber, emailAddress, profilePhotoURL, companyName}, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error updating profile!");
                    reject(error);
                });
        });
    }

    deleteMeeting(meetingID) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/meeting/${meetingID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error deleting meeting!");
                    reject(error);
                })
        })
    }

    getCompany(companyName){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/company/byName/${companyName}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                })
        })
    }

    getCompanyByID(companyID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/company/${companyID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                })
        })
    }
}
