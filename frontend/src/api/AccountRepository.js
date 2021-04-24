import axios from "axios";

axios.defaults.withCredentials = true;

export class AccountsRepository {

    url = 'http://localhost:8000';

    config = {
        withCredentials: true
    };

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
                    alert("Error getting specific user!");
                    reject(error);
                });
        });
    }

    getUserPass(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/login`, {username, password}, this.config)
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

    updateProfile(username, firstName, lastName, bio, title, location, phoneNumber, emailAddress, profilePhotoURL){
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/profile/${username}/changeinfo`, {username, firstName, lastName, bio, title, location, phoneNumber, emailAddress, profilePhotoURL}, this.config)
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
                    alert("Error getting company id");
                    reject(error);
                })
        })
    }

    getCompanyByID(companyID){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/company/${companyID}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting company from id");
                    reject(error);
                })
        })
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
}
