import axios from "axios";

axios.defaults.withCredentials = true;

export class PostsRepository {

    url = 'http://localhost:8000';

    config = {
        withCredentials: true
    };

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
    
}