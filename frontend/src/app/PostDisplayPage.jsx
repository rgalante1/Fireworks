import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostsRepository } from '../api/PostRepository';
import Post from '../models/Post';
import PostDisplay from './PostDisplay';
import './RatingDisplay.css';

export const RatingDisplay = (props) => {
    return (
        <span className="stars">
            {
                [1,2,3,4,5].map(x => (<i key={x} className={(x > props.value ? 'empty-star' : 'full-star')}></i>))
            }
        </span>
    );
}

export const PostDisplayPage = (props) => {
    let { postId } = useParams();
    const [ post, setPost ] = useState(undefined);
    const [ ratings, setRatings ] = useState([]);

    useEffect(() => {
        const postRepo = new PostsRepository();

        postRepo.getMeeting(postId).then(result => {
            setPost(new Post(result.meetingID, result.companyID, result.title, result.description, result.eventDate, result.location, result.meetingLink, result.companyName, "", "meeting", result.meetingType))
        });

        postRepo.getRatings(postId).then(result => {
            setRatings(result.map(x => {
                return { id: x.ratingID, meetingID: x.meeting, username: x.name, description: x.description, rating: x.rating };
            }));
        });
    }, [ postId ]);

    if (post) {
        return (
            <div id="postDisplayPage">
                <PostDisplay post={post} userName={"lawrimore"} />
                {
                    ratings.map(x => {
                        return (
                            <div key={x.id}>
                                <div className="card" style={{width: "70%", marginLeft: "15%"}}>
                                    <div className="card-header">
                                        <RatingDisplay value={x.rating} />
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text" style={{color: "#b2bbc3", float: "left"}}>{x.username}</p>
                                        <p className="card-text" style={{clear: "both"}}>{x.description}</p>
                                    </div>
                                </div>
                                <br />
                            </div>
                        );
                    })
                }
            </div>
        );
    } else {
        return <div id="postDisplayPage" />
    }
}

export default PostDisplayPage;