import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import logoFWB from './logo.jpg';
import routes from '../routes';

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
        { routes.map(x => <Route key={x.path} {...x} />) }
      </Switch>
    </Router>
  );
}

export default App;