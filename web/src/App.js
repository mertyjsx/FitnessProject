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
import Onboarding from "./components/onboarding/index"
import './vendor/fontawesome'
import Inbox from "./components/inbox/Inbox"
import Profile from "./components/profile/Profile"
import Footer from "./components/layout/Footer"
import InteractionDetails from "./components/interactions/InteractionDetails"
import Bookings from "./components/modules/Bookings"
import ProfileEdit from "./components/modules/ProfileEdit"
import About from "./components/modules/About"
import Terms from "./components/modules/Terms"
import Privacy from "./components/modules/Privacy"

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
          <Route path="/session/:id" component={InteractionDetails} />
          <Route exact path="/bookings" component={Bookings} />
          <Route exact path="/pro/:uid" component={Profile} />
          <Route exact path="/profile-edit" component={ProfileEdit} />
          <Route exact path="/about" component={About} />
          <Route exact path="/terms-of-use" component={Terms} />
          <Route exact path="/privacy-policy" component={Privacy} />
          <Route exact path="/onboarding" component={Onboarding} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
