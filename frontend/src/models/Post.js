class Post {
    constructor(id, title, description, date, location, meetingLink, username, postDate, type) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.meetingLink = meetingLink;
        this.username = username;
        this.postDate = postDate;
        this.type = type;
    }
}

export default Post;