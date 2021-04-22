import React, { useEffect, useState } from 'react';
import LoginPage from '../LoginPage';
import Post from './../models/Post';
import PostDisplay from './PostDisplay';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";

export const DashboardPage = (props) => {
    const [posts, setPosts] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (props.loggedIn) {
            // Load posts
        }

        const interval = setInterval(() => {
            // Load more posts
            setPosts(posts => posts.concat(new Post(posts.length, "Post " + (posts.length + 1), "Random new post", new Date(), undefined, "https://smu.edu/live", "medusa")));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    let postDisplays = [];

    for (let i in posts) {
        postDisplays.push(
            <div key={i}>
                <br></br>
                <PostDisplay post={posts[i]} headerLink={true} userName={params.username}/>
            </div>
        );
    }

    postDisplays.reverse();

    if (posts.length === 0) {
        return <>
            <div className="colorBlue pb-5">
                <Link to={"/profile/" + params.username + "/" + params.username} className="btn btn-info float-right mr-3">Profile</Link>
                <Link to={"/" + params.username + "/createpost"} className="btn btn-success float-right mr-3">Create Post</Link>
            </div>
            <div className="clear-fix" />
            <div className="dashboardPage">
                <br></br>
                <center><h4>No posts to display.</h4></center>
            </div>
        </>
    } else {
        return <>
            <div className="colorBlue pb-5">
                <Link to={"/profile/" + params.username + "/" + params.username} className="btn btn-info float-right mr-3">Profile</Link>
                <Link to={"/" + params.username + "/createpost"} className="btn btn-success float-right mr-3">Create Post</Link>
            </div>
            <div className="clear-fix" />
            <div className="dashboardPage">
                {postDisplays}
            </div>
        </>
    }


}

export default DashboardPage;