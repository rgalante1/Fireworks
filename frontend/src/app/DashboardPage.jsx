import React, { useEffect, useState } from 'react';
import LoginPage from '../LoginPage';
import Post from './../models/Post';
import PostDisplay from './PostDisplay';

export const DashboardPage = (props) => {
    console.log(props)
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.loggedIn) {
            // Load posts
        }

        const interval = setInterval(() => {
            if (!props.loggedIn) {
                return;
            }
            // Load more posts
            setPosts(posts => posts.concat(new Post(posts.length, "Post " + (posts.length + 1), "Random new post", new Date(), undefined, "https://smu.edu/live")));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    if (!props.loggedIn) {
        return (
            <LoginPage history={props.history}></LoginPage>
        );
    }

    let postDisplays = [];

    for (let i in posts) {
        postDisplays.push(
            <div key={i}>
                <br></br>
                <PostDisplay post={posts[i]} headerLink={true}></PostDisplay>
            </div>
        );
    }

    postDisplays.reverse();

    if (posts.length === 0) {
        return (
            <div className="dashboardPage">
                <br></br>
                <center><h4>No posts to display.</h4></center>
            </div>
        );
    } else {
        return (
            <div className="dashboardPage">
                {postDisplays}
            </div>
        );
    }
}

export default DashboardPage;