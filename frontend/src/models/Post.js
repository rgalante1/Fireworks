import { post } from "jquery";

class Post {
    constructor(id, companyId, title, description, date, location, meetingLink, username, postDate, type, virtual ="0") {
        this.id = id;
        this.companyId = companyId;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.meetingLink = meetingLink;
        this.username = username;
        this.postDate = postDate;
        this.type = type;
        this.virtual = virtual;
    }
}

export default Post;