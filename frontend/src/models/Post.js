import { post } from "jquery";

class Post {
    constructor(id, title, description, date, location, meetingLink, username, postDate, type, virtual ="0", postID = "0") {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.meetingLink = meetingLink;
        this.username = username;
        this.postDate = postDate;
        this.type = type;
        this.virtual = virtual;
        this.postID = postID;
    }
}

export default Post;