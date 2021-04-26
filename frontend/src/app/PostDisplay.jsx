import React from 'react';
import { Link } from 'react-router-dom';
import './PostDisplay.css';

export const PostDisplay = (props) => {
    let format = (dateSent)=>{
        let dateYear = dateSent.substring(0, 4);
        let dateMonth = dateSent.substring(5, 7);
        let dateDay = dateSent.substring(8, 10);
        return dateMonth + "/" + dateDay + "/" + dateYear;
    }
    return (
        <div className="postDisplay container mt-1 mb-1 py-4" key={props.id}>
            <div className="card container py-4" id="post">
                {props.post.title ? 
                <h1 className="titleLogIn text-center text-center">{props.post.title}</h1>
                : props.headerLink ?
                <Link to={"/post/" + props.post.id}><h1 className="titleLogIn text-center text-center">Meeting by {props.post.username}</h1></Link>
                : <h1 className="titleLogIn text-center text-center">Meeting by {props.post.username}</h1>}
                <p className="text-secondary">By {props.post.username}</p>
                <p >{props.post.description}</p>
                {
                    props.post.location && <p>Meeting Location: {props.post.location}</p>
                }
                { 
                    props.post.meetingLink && <p>Meeting Link: <a href={props.post.meetingLink}>
                        {props.post.meetingLink}</a></p>
                }
                {   
                    props.post.date && <p>Meeting Date: {format(props.post.date)}</p>
                }
                {
                    props.post.postDate && <p className="text-secondary">{props.post.postDate}</p>
                }
                {
                    props.post.type === "meeting" && <>
                    <button type="button" id="rsvp" onClick={() => alert('RSVP to Post ' + props.post.id)}
                        className="form-control btn btn-success rounded-pill mt-1">RSVP</button>
                    <Link to={"/post/" + props.post.id + "/rating/" + props.userName} 
                        className="form-control btn btn-secondary rounded-pill mt-1">Rate This Meeting</Link></>
                }
            </div>
        </div>
    );
}

export default PostDisplay;