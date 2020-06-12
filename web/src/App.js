import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { loadReCaptcha } from 'react-recaptcha-google'
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
import Social from "./components/landing/Social"
import NotFound from './components/modules/NotFound'
import ScrollToTop from 'react-router-scroll-top'
import HowItWorks from './components/modules/HowItWorks'
import ThankYouConvertKit from "./components/promo/ThankYouConvertKit"
import Settings from "./components/dashboard/Settings"
import UserTest from './components/beta/UserTest'
import HowProWorks from "./components/modules/HowProWorks"
import CalenderView from "./components/calendar/CalenderView"
import AdminView from "./components/admin/AdminView"
import FAQPro from "./components/modules/FAQPro"
import FAQClient from "./components/modules/FAQClient"

class App extends Component {

  constructor() {
    super();
    this.state = {
      splash: false
    }
  }

  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <div className="App">
          <Navbar splash={this.state.splash} />

          <Switch>
            <Route exact path="/" component={() => <Home splash={this.state.splash} />} />
            <Route exact path="/social" component={Social} />
            <Route path="/thank-you-for-subscribing" component={ThankYouConvertKit} />
            <Route exact path="/admin" component={AdminView} />
            {this.state.splash === false ?
              <>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/project/:id" component={ProjectDetails} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/join-as-pro" component={SignUpPro} />
                <Route exact path="/create-project" component={CreateProject} />
                <Route exact path="/find-a-pro" component={FindAPro} />
                <Route exact path="/inbox" component={Inbox} />
                <Route exact path="/session/:id" component={InteractionDetails} />
                <Route exact path="/bookings" component={Bookings} />
                <Route exact path="/pro/:uid" component={Profile} />
                <Route exact path="/profile-edit" component={ProfileEdit} />
                <Route exact path="/about" component={About} />
                <Route exact path="/terms-of-use" component={Terms} />
                <Route exact path="/privacy-policy" component={Privacy} />
                <Route exact path="/onboarding" component={Onboarding} />
                <Route exact path="/social" component={Social} />
                <Route exact path="/how-it-works" component={HowItWorks} />
                <Route exact path="/how-ctby-works-for-pros" component={HowProWorks} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/calendar" component={CalenderView} />
                <Route exact path="/pro-faq" component={FAQPro} />
                <Route exact path="/client-faq" component={FAQClient} />
                {/* <Route path="*" component={NotFound} /> */}
              </> :
              <>
                {/* <Route path="*" component={NotFound} /> */}
              </>
            }
          </Switch>

          <Footer splash={this.state.splash} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
