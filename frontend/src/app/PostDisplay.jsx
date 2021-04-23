import React from 'react';
import { Link } from 'react-router-dom';
import './PostDisplay.css';

export const PostDisplay = (props) => {
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Chicago' };
    let postHeader = <h1>{props.post.title}</h1>;

    return (
        <div className="postDisplay container mt-1 mb-1 py-4">
            <div className="card container py-4" id="post">
                <h1 className="titleLogIn text-center text-center">{props.post.title}</h1>
                <Link to={"/profile/" + props.userName + "/" + props.post.username}>By {props.post.username}</Link>
                <p >{props.post.description}</p>
                
                {(() => {
                    if (props.post.location) {
                        return <p className="postLocation">{props.post.location}</p>
                    }
                })()}
                {
                    props.post.location && <p>{props.post.location}</p>
                }
                {(() => {
                    if (props.post.meetingLink) {
                        return <p><a href={props.post.meetingLink} className="postMeetingLink" target="_blank" rel="noopener noreferrer">{props.post.meetingLink}</a></p>
                    }
                })()}
                {   props.post.date &&
                    <p className="postTimeDate text-secondary">
                    {new Intl.DateTimeFormat('en-US', dateOptions).format(props.post.date)}</p>
                }
                <button type="button" id="rsvp" onClick={() => alert('RSVP to Post ' + props.post.id)}
                className="form-control btn btn-success rounded-pill mt-1">RSVP</button>
                <Link to={"/post/" + props.post.id + "/rating/" + props.userName} className="form-control btn btn-secondary rounded-pill mt-1">Rate This Meeting</Link>
            </div>
        </div>
    );
}

export default PostDisplay;