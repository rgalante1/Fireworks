import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
<<<<<<< HEAD
  Link,
  useParams
=======
  Link
>>>>>>> 2a91e6e6482e55dd0841d2c0368129161c0f720a
} from "react-router-dom";
import './App.css';
import logoFWB from './logo.jpg';
import LoginPage from './LoginPage.js';
import { DeletePage } from './DeletePage.js';
import { CreatePostPage } from './CreatePostPage.js';
import ProfilePage from './ProfilePage.js';
import CreatePage from './CreatePage.js';
import DashboardPage from './app/DashboardPage';
import { MeetingRating } from './MeetingRating';

function Title() {
  return (
    <div className="titleCard">
      <Link to="/"><img src={logoFWB} alt="fireworks title" height={125} width={366} /></Link>
    </div>
  )
}

// React functional component
function App() {
  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  //const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  //const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  //const url = ec2 ? ec2_url : 'localhost'


  return (
    <Router>
      <Title />
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/:userName/deleteaccount" component={DeletePage} />
        <Route path="/createaccount">
          <CreatePage />
        </Route>
        <Route path="/:userName/createpost" component={CreatePostPage} />
        <Route exact path="/profile/:usernameLooking/:usernamePassed" component={ProfilePage} />
        {/* <Route path="/post/:postId" exact component={PostDisplay} /> */}
        <Route path="/dashboard/:username" component={DashboardPage} />

        <Route path="/post/:meetingId/rating/:userName" component={MeetingRating} />
        <Route path="/" exact>
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;