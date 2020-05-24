import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/modules/Home'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from "./components/auth/client/SignUp"
import SignUpPro from "./components/auth/pro/SignUpPro"
import CreateProject from "./components/projects/CreateProject"
import FindAPro from "./components/modules/FindAPro"
import './vendor/fontawesome'
import Inbox from "./components/inbox/Inbox"
import Profile from "./components/profile/Profile"
import Footer from "./components/layout/Footer"
import InteractionDetails from "./components/interactions/InteractionDetails"

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/join-as-pro" component={SignUpPro} />
          <Route path="/create-project" component={CreateProject} />
          <Route path="/find-a-pro" component={FindAPro} />
          <Route exact path="/inbox" component={Inbox} />
          <Route path="/inbox/:id" component={InteractionDetails} />
          <Route exact path="/pro/:uid" component={Profile} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
