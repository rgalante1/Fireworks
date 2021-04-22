import axios from "axios";

axios.defaults.withCredentials = true;

export class AccountsRepository {

    url = 'http://localhost:8000';

    config = {
        withCredentials: true
    };


    getUsers(params) {
        if (params) {
            let config = this.config;
            config.params = params;
        }
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users/get`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error getting all users!");
                    reject(error);
                });
        })
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

    createCompanyPost(companyID, title, description) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/createpost`, { companyID, title, description }, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error creating company post!");
                    reject(error);
                });
        });
    }

    createMeeting(description, startTime, endTime, meetingLink, hostCompanyID, location, meetingType, eventDate) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/createmeeting`, { description, startTime, endTime, meetingLink, hostCompanyID, location, meetingType, eventDate }, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error creating meeting!");
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
}
