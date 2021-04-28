import axios from "axios";

axios.defaults.withCredentials = true;

export class PostsRepository {

    // url = 'http://ec2-3-128-160-107.us-east-2.compute.amazonaws.com:8000';
    url = 'http://localhost:8000';

    config = {
        withCredentials: true
    };

    getPosts() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/post`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    createPost(companyID, title, description, date){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/createpost`, {
                "companyID": companyID,
                "title": title,
                "description": description,
                "date": ""
            }, this.config)
            .then(x => resolve(x.data))
            .catch(error => {
                alert("Error creating post");
                reject(error);
            });
        })
    }
    
    createMeeting(description, time, meetingLink, hostCompanyID, location, meetingType, eventDate, title) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/createmeeting`, {
                "description": description,
                "startTime": time,
                "endTime": time,
                "meetingLink": '',
                "hostCompanyID": hostCompanyID,
                "location": location,
                "meetingType": meetingType,
                "eventDate": eventDate,
                "title": title
            }, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error creating meeting!");
                    reject(error);
                });
        });
    }

    getMeetings(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/meetings`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getMeeting(meetingId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/meetingsById/` + meetingId, this.config)
                .then(x => resolve(x.data && x.data.length === 1 ? x.data[0] : undefined))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getRatings(meetingId){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/ratingsByMeeting/` + meetingId, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    postRating(meetingId, username, description, rating) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/meeting/` + meetingId + `/rating`, { meetingID: meetingId, rating: rating, ratingDescription: description, Name: username }, this.config)
                .then(x => resolve())
                .catch(error => reject(error))
        })
    }

    getMeetingRSVP(meetingId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/meeting/` + meetingId + `/rsvp`, this.config)
                .then(x => resolve(x.data))
                .catch(error => reject(error));
        });
    }

    isRSVPMeeting(meetingId, userId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/meeting/` + meetingId + `/rsvp/` + userId, this.config)
                .then(x => resolve(x.data && x.data[0].rsvpExists))
                .catch(error => reject(error));
        });
    }

    putMeetingRSVP(meetingId, userId) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/meeting/` + meetingId + `/rsvp/` + userId, undefined, this.config)
                .then(x => resolve())
                .catch(error => reject(error));
        });
    }

    deleteMeetingRSVP(meetingId, userId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/meeting/` + meetingId + `/rsvp/` + userId, undefined, this.config)
                .then(x => resolve())
                .catch(error => reject(error));
        });
    }

    filterPosts(filteropt, searchopt){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/dashboard/filter`, {params: {filteropt, searchopt}}, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getMyMeetings(companyName){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/meetings/${companyName}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    getMyPosts(companyName){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/posts/${companyName}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    reject(error);
                });
        })
    }

    updateMeeting(meetingID, description, time, meetingLink, location, meetingType, eventDate, title) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/meeting/update`, {
                "description": description,
                "startTime": time,
                "meetingLink": meetingLink,
                "location": location,
                "meetingType": meetingType,
                "eventDate": eventDate,
                "title": title,
                "meetingID": meetingID
            }, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error creating meeting!");
                    reject(error);
                });
        });
    }

    updatePost(postID, title, description) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/post/update`, {
                "description": description,
                "title": title,
                "postID": postID
            }, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error creating meeting!");
                    reject(error);
                });
        });
    }

    deleteMeeting(meetingID){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/meeting/${meetingID}/delete`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error deleting meeting!");
                    reject(error);
                });
        });
    }

    deletePost(postID){
        return new Promise((resolve, reject) => {
            axios.delete(`${this.url}/post/${postID}/delete`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert("Error deleting post!");
                    reject(error);
                });
        });
    }
}