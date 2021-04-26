import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountsRepository } from '../api/AccountRepository';
import { PostsRepository } from '../api/PostRepository';
import './PostDisplay.css';

export const PostDisplay = (props) => {
    let format = (dateSent)=>{
        let dateYear = dateSent.substring(0, 4);
        let dateMonth = dateSent.substring(5, 7);
        let dateDay = dateSent.substring(8, 10);
        return dateMonth + "/" + dateDay + "/" + dateYear;
    }

    const [rsvpStatus, setRsvpStatus] = useState(false);
    const [rsvpTotal, setRsvpTotal] = useState(0);

    useEffect(() => {
        if (props.post.type === "meeting") {
            const repo = new PostsRepository();
            const users = new AccountsRepository();
            users.getUserInfo(props.userName).then(user => {
                if (user && user[0]) {
                    const userId = user[0].userID;
                    repo.isRSVPMeeting(props.post.id, userId).then(x => setRsvpStatus(x));
                }
            });
            repo.getMeetingRSVP(props.post.id).then(x => setRsvpTotal(x.length));
        }
    }, [props]);

    return (
        <div className="postDisplay container mt-1 mb-1 py-4" key={props.id}>
            <div className="card container py-4" id="post">
                {props.post.title ? 
                props.headerLink ?
                <Link to={"/post/" + props.post.id + "/" + props.userName}><h1 className="titleLogIn text-center text-center">{props.post.title}</h1></Link>
                : <h1 className="titleLogIn text-center text-center">{props.post.title}</h1>
                : props.headerLink ?
                <Link to={"/post/" + props.post.id + "/" + props.userName}><h1 className="titleLogIn text-center text-center">Meeting by {props.post.username}</h1></Link>
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
                    props.post.type === "meeting" ? 
                    <>
                    <p>Total RSVPs: {rsvpTotal}</p>
                    <button type="button" id="rsvp" onClick={() => {
                        const repo = new PostsRepository();
                        const users = new AccountsRepository();
                        users.getUserInfo(props.userName).then(user => {
                            if (user && user[0]) {
                                const userId = user[0].userID;
                                if (rsvpStatus) {
                                    repo.deleteMeetingRSVP(props.post.id, userId).then(() => {
                                        setRsvpStatus(false);
                                        setRsvpTotal(total => total - 1);
                                    });
                                } else {
                                    repo.putMeetingRSVP(props.post.id, userId).then(() => {
                                        setRsvpStatus(true);
                                        setRsvpTotal(total => total + 1);
                                    });
                                }
                            }
                        });
                    }} className={"form-control btn rounded-pill mt-1 " + (rsvpStatus ? "btn-danger" : "btn-success")}>{rsvpStatus ? "Revoke RSVP" : "RSVP"}</button>
                    <Link to={"/post/" + props.post.id + "/rating/" + props.userName} 
                        className="form-control btn btn-secondary rounded-pill mt-1">Rate This Meeting</Link></>
                    :
                    <>
                    <p className="text-secondary">Posted {props.post.postDate}</p>
                    </>
                }
            </div>
        </div>
    );
}

export default PostDisplay;