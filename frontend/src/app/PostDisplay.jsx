import React from 'react';
import './PostDisplay.css';

export const PostDisplay = (props) => {
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'America/Chicago' };
    return (
        <div className="postDisplay">
            <h1>{props.post.title}</h1>
            <p>{props.post.description}</p>
            {(() => {
                if (props.post.location) {
                    return <p className="postLocation">{props.post.location}</p>
                }
            })()}
            <p className="postTimeDate">{new Intl.DateTimeFormat('en-US', dateOptions).format(props.post.date)}</p>
            {(() => {
                if (props.post.meetingLink) {
                    return <p><a href={props.post.meetingLink} className="postMeetingLink">{props.post.meetingLink}</a></p>
                }
            })()}
            <button type="button" id="rsvp" onClick={() => alert('RSVP to Post ' + props.post.id)}>RSVP</button>
        </div>
    );
}

export default PostDisplay;