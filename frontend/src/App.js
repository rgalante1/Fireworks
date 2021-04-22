import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import './App.css';
import logoFWB from './logo.jpg';
import LoginPage from './LoginPage.js';
import DeletePage from './DeletePage.js';
import CreatePostPage from './CreatePostPage.js';
import ProfilePage from './ProfilePage.js';
import CreatePage from './CreatePage.js';
import PostDisplay from './app/PostDisplay'
import Post from './models/Post'
import axios from 'axios';
import DashboardPage from './app/DashboardPage';

function Title() {
  return (
    <div className="titleCard">
      <Link to="/"><img src={logoFWB} alt="fireworks title" height={125} width={366} /></Link>
    </div>
  )
}

function UserProfileRoute() {
  const { usernamePassed } = useParams();
  return ProfilePage({usernameLooking: "Kryptsm", usernamePassed: usernamePassed});
}

function UserPostRouter() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:postId`}>
        <UserPostRoute></UserPostRoute>
      </Route>
      <Route path={match.path}>
        <h3>Please select a post to view it.</h3>
      </Route>
    </Switch>
  );
}

function UserPostRoute() {
  const { postId } = useParams();
  return (
    <PostDisplay post={new Post(postId, "Specific Post", "This is a specific post.", new Date("2020-04-01"), "Junkins 303", postId % 2 === 0 ? "https://smu.edu/live" : undefined)}></PostDisplay>
  );
}

// React functional component
function App () {
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'


  return (
    <Router>
      <Title />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/deleteaccount">
          <DeletePage />
        </Route>
        <Route path="/createaccount">
          <CreatePage />
        </Route>
        <Route path="/createpost">
          <CreatePostPage />
        </Route>
        <Route path="/profile/:usernameLooking/:usernamePassed" component={ProfilePage}/>
        <Route path="/post">
          <UserPostRouter />
        </Route>
        <Route path="/dashboard">
          {
          //<PostDisplay post={new Post(1, "Example Meeting", "This is an example of a meeting", new Date(), "Caruth 224", "https://www.google.com/meet")}></PostDisplay>
          }
          <DashboardPage loggedIn={false}></DashboardPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;