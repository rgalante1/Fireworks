import React, { useEffect, useState } from 'react';
import Post from './../models/Post';
import PostDisplay from './PostDisplay';
import {EditPostDisplay} from './EditPostDisplay';
import {Link, useParams} from "react-router-dom";
import { PostsRepository } from '../api/PostRepository';
import { AccountsRepository } from '../api/AccountRepository';
import { SearchBar } from './SearchBar';

export const DashboardPage = (props) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState(false);
    const [myPosts, setMyPosts] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const params = useParams();
    const postRepo = new PostsRepository();
    const accountRepo = new AccountsRepository();

    useEffect(() => {
        if(refresh && search === false && myPosts === false){
            if(refresh){
                setRefresh(false);
                setMyPosts(false);
                setSearch(false);
                setPosts([]);
            }
            postRepo.getPosts().then((x) => {
                x.forEach(postDB => {
                    accountRepo.getCompanyByID(postDB.companyID).then( account =>
                        {
                            let companyName = account[0].companyName;
                            setPosts(posts => posts.concat(new Post(postDB.companyID, postDB.title, 
                                postDB.description, "", "", "", companyName, postDB.date, "post")));
                        }
                    )
                });
            });
            postRepo.getMeetings().then((x) =>{
                x.forEach(meetDB => {
                    accountRepo.getCompanyByID(meetDB.hostCompanyID).then( account =>
                        {
                            if(account.length !== 0){
                                let companyName = account[0].companyName;
                                setPosts(posts => posts.concat(new Post(meetDB.hostCompanyID, meetDB.title, 
                                meetDB.description, meetDB.eventDate, meetDB.location, meetDB.meetingLink, 
                                companyName, "", "meeting", meetDB.meetingType, meetDB.meetingID)));
                            }
                        }
                    )
                });
            })
        }
    });

    const [type, setType] = useState();
    useEffect(() =>{
        if(!type)
            accountRepo.getCompany(params.username).then(data =>{
            if(data.length !== 0){
                setType("company");
            }
            else{
                setType("user");
            }
        });
    });

    const handleSearch = (x, post) => {
        if(post){
            setPosts([]);
            x.forEach(postDB => {
                accountRepo.getCompanyByID(postDB.companyID).then( account =>
                    {
                        let companyName = account[0].companyName;
                        setPosts(posts => posts.concat(new Post(postDB.companyID, postDB.title, 
                            postDB.description, "", "", "", companyName, postDB.date, "post")));
                    }
                )
            });
        }
        else{
            setPosts([]);
            x.forEach(meetDB => {
                accountRepo.getCompanyByID(meetDB.hostCompanyID).then( account =>
                    {
                        if(account.length !== 0){
                            let companyName = account[0].companyName;
                            setPosts(posts => posts.concat(new Post(meetDB.hostCompanyID, meetDB.title, 
                            meetDB.description, meetDB.eventDate, meetDB.location, meetDB.meetingLink, 
                            companyName, "", "meeting", meetDB.meetingType, meetDB.meetingID)));
                        }
                    }
                )
            });
        }
    }

    const handleViewMine = () => {
        setMyPosts(true);
        setPosts([]);
        postRepo.getMyPosts(params.username).then((x) => {
            x.forEach(postDB => {
                accountRepo.getCompanyByID(postDB.companyID).then( account =>
                    {
                        let companyName = account[0].companyName;
                        setPosts(posts => posts.concat(new Post(postDB.companyID, postDB.title, 
                            postDB.description, "", "", "", companyName, postDB.date, "post")));
                    }
                )
            });
        });
        postRepo.getMyMeetings(params.username).then((x) =>{
            x.forEach(meetDB => {
                accountRepo.getCompanyByID(meetDB.hostCompanyID).then( account =>
                    {
                        if(account.length !== 0){
                            let companyName = account[0].companyName;
                            setPosts(posts => posts.concat(new Post(meetDB.hostCompanyID, meetDB.title, 
                            meetDB.description, meetDB.eventDate, meetDB.location, meetDB.meetingLink, 
                            companyName, "", "meeting", meetDB.meetingType, meetDB.meetingID)));
                        }
                    }
                )
            });
        })
    }

    if (posts.length === 0) {
        return <>
            <div className="colorBlue pb-5">
                <button className="btn btn-success float-left ml-3" onClick={() => setSearch(!search)}>Search Posts & Events</button>
                <Link to={"/users/" + params.username} className="btn btn-info float-left ml-3">Connect With Others</Link>
            {
                type === "company" ? <>
                    <Link to={"/" + params.username + "/createpost"} 
                    className="btn btn-success float-right mr-3">Create Post</Link>
                    <button className="btn btn-info float-right mr-3" onClick={() => handleViewMine()}>My Posts</button>
                    </>
                :
                    <Link to={"/profile/" + params.username + "/" + params.username} 
                    className="btn btn-info float-right mr-3">Profile</Link>

            }
            </div>
            {
               search && <SearchBar onSearch={(data, post) => handleSearch(data, post)}/>
            }
            {
                (search || myPosts) && 
                <div className="clearfix">
                    <button className="btn btn-secondary float-left mr-3 rounded-pill mt-2 ml-2"
                    onClick={() => {setSearch(false); setMyPosts(false); setRefresh(true)}}>Return to Dash</button>
                </div>
            }
            <div className="clear-fix" />
            <div className="dashboardPage">
                <br></br>
                <center><h4>No posts to display.</h4></center>
            </div>
        </>
    } else {
        return <>
            <div className="colorBlue pb-5">
                <button className="btn btn-success float-left ml-3" onClick={() => setSearch(!search)}>Search Posts & Events</button>
                <Link to={"/users/" + params.username} className="btn btn-info float-left ml-3">Connect With Others</Link>
            {
                type === "company" ? <>
                    <Link to={"/" + params.username + "/createpost"} 
                    className="btn btn-success float-right mr-3">Create Post</Link>
                    <button className="btn btn-info float-right mr-3" onClick={() => handleViewMine()}>My Posts</button>
                    </>
                :
                    <Link to={"/profile/" + params.username + "/" + params.username} 
                    className="btn btn-info float-right mr-3">Profile</Link>

            }
            </div>
            {
                search && <SearchBar onSearch={(data, post) => handleSearch(data, post)}/>
            }
            {
                (search || myPosts) && 
                <div className="clearfix">
                    <button className="btn btn-secondary float-left mr-3 rounded-pill mt-2 ml-2"
                    onClick={() => {setSearch(false); setMyPosts(false); setRefresh(true)}}>Return to Dash</button>
                </div>
            }
            <div className="clear-fix" />
            {
                !myPosts &&
                <div className="dashboardPage">
                {posts.map((x, i) => 
                    <PostDisplay post={x} headerLink={true} userName={params.username} key={i}/>
                )}
                </div>
            }
            {
                myPosts &&
                <div className="dashboardPage">
                {posts.map((x, i) => 
                    <EditPostDisplay post={x} headerLink={true} userName={params.username} key={i}/>
                )}
                </div>
            }
        </>
    }


}

export default DashboardPage;