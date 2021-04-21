import React from 'react';
import { Link } from 'react-router-dom';
import './PostDisplay.css';

export const PostDisplay = (props) => {
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Chicago' };
    let postHeader = <h1>{props.post.title}</h1>;

    if (props.headerLink) {
        postHeader = <Link to={"/post/" + props.post.id} style={{textDecoration: 'inherit', color: 'inherit'}}>{postHeader}</Link>;
    }

    return (
        <div className="postDisplay">
            {postHeader}
            <p>{props.post.description}</p>
            {(() => {
                if (props.post.location) {
                    return <p className="postLocation">{props.post.location}</p>
                }
            })()}
            <p className="postTimeDate">{new Intl.DateTimeFormat('en-US', dateOptions).format(props.post.date)}</p>
            {(() => {
                if (props.post.meetingLink) {
                    return <p><a href={props.post.meetingLink} className="postMeetingLink" target="_blank" rel="noopener noreferrer">{props.post.meetingLink}</a></p>
                }
            })()}
            <button type="button" id="rsvp" onClick={() => alert('RSVP to Post ' + props.post.id)}>RSVP</button>
        </div>
    );
}

export default PostDisplay;