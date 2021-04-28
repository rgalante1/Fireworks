import React, { useEffect, useState } from 'react';
import Post from './../models/Post';
import PostDisplay from './PostDisplay';
import {EditPostDisplay} from './EditPostDisplay';
import {Link, Redirect} from "react-router-dom";
import { PostsRepository } from '../api/PostRepository';
import { AccountsRepository } from '../api/AccountRepository';
import { SearchBar } from './SearchBar';

export const DashboardPage = (props) => {
    const [posts, setPosts] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [search, setSearch] = useState(false);
    const [myPosts, setMyPosts] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const postRepo = new PostsRepository();
    const accountRepo = new AccountsRepository();

    useEffect(() => {
        if(refresh && !search && !myPosts){
            if(refresh){
                setRefresh(false);
                setMyPosts(false);
                setSearch(false);
                setPosts([]);
                setMeetings([]);
            }
            postRepo.getPosts().then((x) => {
                x.forEach(postDB => {
                    accountRepo.getCompanyByID(postDB.companyID).then( account =>
                        {
                            let companyName = account[0].companyName;
                            setPosts(posts => posts.concat(new Post(postDB.postID, postDB.companyID, postDB.title, 
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
                                setMeetings(meetings => meetings.concat(new Post(meetDB.meetingID, meetDB.hostCompanyID, meetDB.title, 
                                meetDB.description, meetDB.eventDate, meetDB.location, meetDB.meetingLink, 
                                companyName, "", "meeting", meetDB.meetingType, meetDB.meetingID)));
                            }
                        }
                    )
                });
            })
        }
    }, [refresh, search, myPosts, postRepo, accountRepo]);

    const [type, setType] = useState();
    useEffect(() =>{
        if(!type)
            accountRepo.getCompany(window.userName).then(data =>{
            if(data.length !== 0){
                setType("company");
            }
            else{
                setType("user");
            }
        });
    });

    if (!window.userName) {
        return <Redirect to="/login" />
    }

    const handleSearch = (x, post) => {
        setSearch(true);
        setPosts([]);
        setMeetings([]);
        if(post){
            x.forEach(postDB => {
                accountRepo.getCompanyByID(postDB.companyID).then( account =>
                    {
                        let companyName = account[0].companyName;
                        setPosts(posts => posts.concat(new Post(postDB.postID, postDB.companyID, postDB.title, 
                            postDB.description, "", "", "", companyName, postDB.date, "post")));
                    }
                )
            });
        }
        else{
            x.forEach(meetDB => {
                accountRepo.getCompanyByID(meetDB.hostCompanyID).then( account =>
                    {
                        if(account.length !== 0){
                            let companyName = account[0].companyName;
                            setMeetings(meetings => meetings.concat(new Post(meetDB.meetingID, meetDB.hostCompanyID, meetDB.title, 
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
        setMeetings([]);
        postRepo.getMyPosts(window.userName).then((x) => {
            x.forEach(postDB => {
                accountRepo.getCompanyByID(postDB.companyID).then( account =>
                    {
                        let companyName = account[0].companyName;
                        setPosts(posts => posts.concat(new Post(postDB.postID, postDB.companyID, postDB.title, 
                            postDB.description, "", "", "", companyName, postDB.date, "post")));
                    }
                )
            });
        });
        postRepo.getMyMeetings(window.userName).then((x) =>{
            x.forEach(meetDB => {
                accountRepo.getCompanyByID(meetDB.hostCompanyID).then( account =>
                    {
                        if(account.length !== 0){
                            let companyName = account[0].companyName;
                            setMeetings(meetings => meetings.concat(new Post(meetDB.meetingID, meetDB.hostCompanyID, meetDB.title, 
                            meetDB.description, meetDB.eventDate, meetDB.location, meetDB.meetingLink, 
                            companyName, "", "meeting", meetDB.meetingType, meetDB.meetingID)));
                        }
                    }
                )
            });
        })
    }

    return (<>
        <div className="colorBlue pb-5">
        {
            type === "company" ? <>
                <Link to="/createpost" 
                className="btn btn-success float-right mr-3">Create Post</Link>
                <button className="btn btn-info float-right mr-3" onClick={() => handleViewMine()}>My Posts</button>
                </>
            : <>
                <button className="btn btn-success float-left ml-3" onClick={() => setSearch(true)}>Search Posts & Events</button>
                <Link to="/users" className="btn btn-info float-left ml-3">Connect With Others</Link>
                <Link to={"/profile/" + window.userName} 
                className="btn btn-info float-right mr-3">Profile</Link>
                </>
        }
            <Link to="/"><button className="btn btn-danger float-right mr-3" onClick={() => window.userName = undefined}>Logout</button></Link>
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
        <div className="row">
        {
            (!myPosts && !search) && <>
            <div className="col">
            { posts.length === 0 ? 
                <div className="dashboardPage">
                    <br></br>
                    <center><h4>No posts to display.</h4></center>
                </div> 
                : posts.map((x, i) => 
                    <PostDisplay post={x} headerLink={x.type === "meeting" && type !== "company"} hideButtons={type === "company"} userName={window.userName} key={i}/>)
            }
            </div>
            <div className="col">
            {   meetings.length === 0 ? 
                <div className="dashboardPage">
                    <br></br>
                    <center><h4>No meetings to display.</h4></center>
                </div> 
                : meetings.map((x, i) => 
                    <PostDisplay post={x} headerLink={x.type === "meeting" && type !== "company"} hideButtons={type === "company"} userName={window.userName} key={i}/>)
            }
            </div>
            </>
        }
        </div>
        <div className="row">
            { myPosts &&
                <>
                <div className="col">
                { posts.length === 0 ? 
                    <div className="dashboardPage">
                        <br></br>
                        <center><h4>No posts to display.</h4></center>
                    </div> 
                    : posts.map((x, i) => 
                    <EditPostDisplay post={x} userName={window.userName} key={i}/>)
                }
                </div>
                <div className="col">
                {   meetings.length === 0 ? 
                    <div className="dashboardPage">
                        <br></br>
                        <center><h4>No meetings to display.</h4></center>
                    </div> 
                    : meetings.map((x, i) => 
                        <EditPostDisplay post={x} userName={window.userName} key={i}/>)
                }
                </div>
                </>
            }
        </div>
        <div>
        {
            search && <>
            {
                (posts.length === 0 && meetings.length === 0) &&
                <div className="dashboardPage">
                    <br></br>
                    <center><h4>No search results.</h4></center>
                </div> 
            }
            {   posts.length !== 0 &&
                posts.map((x, i) => 
                    <PostDisplay post={x} headerLink={x.type === "meeting" && type !== "company"} hideButtons={type === "company"} userName={window.userName} key={i}/>)
            }
            {   meetings.length !== 0 && 
                meetings.map((x, i) => 
                    <PostDisplay post={x} headerLink={x.type === "meeting" && type !== "company"} hideButtons={type === "company"} userName={window.userName} key={i}/>)
            }
            </>
        }
        </div>
    </>);
}

export default DashboardPage;