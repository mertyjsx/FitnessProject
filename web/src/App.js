import React, { Component } from "react"
import { loadReCaptcha } from 'react-recaptcha-google'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import AdminView from "./components/admin/AdminView"
import SignUp from "./components/auth/client/SignUp"
import SignUpPro from "./components/auth/pro/SignUpPro"
import SignIn from './components/auth/SignIn'
import CalenderView from "./components/calendar/CalenderView"
import FileClaim from "./components/claims/FileClaim"
import Dashboard from './components/dashboard/Dashboard'
import Settings from "./components/dashboard/Settings"
import Inbox from "./components/inbox/Inbox"
import InteractionCron from "./components/interactions/interactionCron"
import InteractionDetails from "./components/interactions/InteractionDetails"
import Social from "./components/landing/Social"
import Footer from "./components/layout/Footer"
import Navbar from './components/layout/Navbar'
import About from "./components/modules/About"
import Bookings from "./components/modules/Bookings"
import ContactUs from "./components/modules/ContactUs"
import FAQClient from "./components/modules/FAQClient"
import FAQPro from "./components/modules/FAQPro"
import FindAPro from "./components/modules/FindAPro"
import Home from './components/modules/Home'
import HowItWorks from './components/modules/HowItWorks'
import HowProWorks from "./components/modules/HowProWorks"
import Privacy from "./components/modules/Privacy"
import ProfileEdit from "./components/modules/ProfileEdit"
import Terms from "./components/modules/Terms"
import Onboarding from "./components/onboarding/index"
import Profile from "./components/profile/Profile"
import CreateProject from "./components/projects/CreateProject"
import ProjectDetails from './components/projects/ProjectDetails'
import ThankYouConvertKit from "./components/promo/ThankYouConvertKit"
import './vendor/fontawesome'

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
                <Route exact path="/file-claim" component={FileClaim} />
                <Route exact path="/contact" component={ContactUs} />
                {/* <Route path="*" component={NotFound} /> */}
              </> :
              <>
                {/* <Route path="*" component={NotFound} /> */}
              </>
            }
          </Switch>

          <Footer splash={this.state.splash} />
          <InteractionCron />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
