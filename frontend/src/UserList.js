import React, { useEffect, useState } from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import { AccountsRepository } from './api/AccountRepository';
import './UserList.css';

export const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const theSearch = '';
    const params = useParams();

    const accountRepo = new AccountsRepository();

    function imageExists(image_URL) {
        if (image_URL) {
            return (image_URL.match(/\.(jpeg|jpg|gif|png)$/) != null);
        }
        return false;
    }

    useEffect(() => {
        if (users.length === 0) {
            if (!theSearch) {
                accountRepo.getUsers().then(result => {
                    setUsers(result);
                })
            }
        }
    });

    return <>
        <div className="colorBlue pb-5">
            <Link to={"/profile/" + params.username + "/" + params.username} className="btn btn-info float-right mr-3">Profile</Link>
            <Link to={"/dashboard/" + params.username} className="btn btn-info float-right mr-3">Dashboard</Link>
        </div>
        <div className="clear-fix" />
        <div className="dashboardPage">
            <div className="row row-cols-1 row-cols-sm-6 p-5">
                {users && users.map((x,i) =>
                    <div className="col mb-4" key={i}>
                        <div className="card">
                            <div className="imageCard">
                                <img src={imageExists(x.picture) ? x.picture :
                                    "https://retailx.com/wp-content/uploads/2019/12/iStock-476085198.jpg"} alt="ERROR"
                                    className="rounded-circle mx-auto imageInside" />
                            </div>
                            <div className="card-header">
                                <h4 className="text-center">{x.username}</h4>
                                <p className="text-center pb-1 mb-0">{x.firstName + " " + x.lastName}</p>
                            </div>
                            <div className="card-body">
                                <Link to={"/profile/" + params.username + "/" + x.username} className="btn btn-success w-100">Profile</Link>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </>


}

export default UserList;