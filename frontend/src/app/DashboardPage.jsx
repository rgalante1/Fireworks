import React, { useEffect, useState } from 'react';
import Post from './../models/Post';
import PostDisplay from './PostDisplay';
import {Link, useParams} from "react-router-dom";
import { PostsRepository } from '../api/PostRepository';
import { AccountsRepository } from '../api/AccountRepository';
import { SearchBar } from './SearchBar';

export const DashboardPage = (props) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState(false);
    const params = useParams();
    const postRepo = new PostsRepository();
    const accountRepo = new AccountsRepository();

    useEffect(() => {
        if(posts.length === 0){
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
                                setPosts(posts => posts.concat(new Post(meetDB.hostCompanyID, meetDB.Title, 
                                meetDB.description, meetDB.eventDate, meetDB.location, meetDB.meetingLink, 
                                companyName, "", "meeting")));
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

    const handleSearch = (data) => {
        setSearch(!search);
    }

    if (posts.length === 0) {
        return <>
            <div className="colorBlue pb-5">
                <button className="btn btn-success float-left ml-3" onClick={handleSearch}>Search Posts & Events</button>
            {
                type === "company" ? 
                    <Link to={"/" + params.username + "/createpost"} 
                    className="btn btn-success float-right mr-3">Create Post</Link>
                :
                    <Link to={"/profile/" + params.username + "/" + params.username} 
                    className="btn btn-info float-right mr-3">Profile</Link>

            }
            </div>
            {
                search && <SearchBar onSearch={() => setSearch(false)}/>
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
                <button className="btn btn-success float-left ml-3" onClick={handleSearch}>Search Posts & Events</button>
            {
                type === "company" ? 
                    <Link to={"/" + params.username + "/createpost"} 
                    className="btn btn-success float-right mr-3">Create Post</Link>
                :
                    <Link to={"/profile/" + params.username + "/" + params.username} 
                    className="btn btn-info float-right mr-3">Profile</Link>

            }
            </div>
            {
                search && <SearchBar onSearch={() => setSearch(false)}/>
            }
            <div className="clear-fix" />
            <div className="dashboardPage">
                {posts.map((x, i) => 
                    <PostDisplay post={x} headerLink={true} userName={params.username} key={i}/>
                )}
            </div>
        </>
    }


}

export default DashboardPage;