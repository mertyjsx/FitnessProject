import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { onboardingAgain } from "../../store/actions/authActions"
import GetQuote from '../admin/quote/GetQuote'
import ResendEmail from "../auth/resendEmailLink"
import Forecast from '../enhancements/CurrentWeather'
import Modal from "../modal/Modal"
import GetRating from '../rating/GetRating'
import ProCard from '../search/ProCard'
class Dashboard extends Component {

	constructor(props) {
		super(props)
		this.state = {
			Booking: 0,
			Inbox: 0
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			if (this.props.interactions) {
				const BookingArray = this.props.interactions.filter(item => item.status === "active" && item.interactionType === "booking" && (item.proUID === this.props.auth.uid || item.userUID === this.props.auth.uid))
				const InboxArray = this.props.interactions.filter(item => item.status === "active" && item.interactionType === "inquiry" && (item.proUID === this.props.auth.uid || item.userUID === this.props.auth.uid))
				this.setState({ Booking: BookingArray.length, Inbox: InboxArray.length })
			}
		}
	}

	renderFirstName = (firstName) => {
		if (typeof firstName === 'undefined' || firstName.length === 0) {
			return null
		}
		return (
			<p className={`text--md text--uppercase mb--0`}>Hi, {firstName}</p>
		)
	}

	render() {
		// console.log(this.props)
		const { users, auth, profile, notifications } = this.props
		if (!auth.uid) return <Redirect to='/signin' />
		if (!profile.onboardingCompleted && profile.isPro) return <Redirect to='/onboarding' />

		const data = [
			{ name: 'Jan', uv: 5, pv: 25, amt: 25 },
			{ name: 'Feb', uv: 10, pv: 25, amt: 25 },
			{ name: 'Mar', uv: 15, pv: 25, amt: 25 },
			{ name: 'Apr', uv: 20, pv: 25, amt: 25 },
			{ name: 'May', uv: 10, pv: 25, amt: 25 },
			{ name: 'Jun', uv: 3, pv: 25, amt: 25 },
			{ name: 'Jul', uv: 7, pv: 25, amt: 25 },
			{ name: 'Aug', uv: 20, pv: 25, amt: 25 },
			{ name: 'Sep', uv: 2, pv: 25, amt: 25 },
			{ name: 'Oct', uv: 13, pv: 25, amt: 25 },
			{ name: 'Nov', uv: 17, pv: 25, amt: 25 },
			{ name: 'Dec', uv: 9, pv: 25, amt: 25 },
		];

		return (
			<div className="dashboard">
				{profile.isApproved !== true && profile.isPro ?
					(
						profile.isDeclined ?
							(
								<div className="status status--danger">
									<div className="container ">
										<p>Your account has been declined. Review the Admin notes and resubmit when completed.</p>
									</div>
								
									<div className="buttons buttons--inline">
									{
										profile.declineMessage&&
										<Modal buttonStyle="button" buttonText={`Review Notes`} content={profile.declineMessage} />
									}
										
										<button className="button" onClick={() => this.props.onboardingAgain()}>Resubmit</button>
									</div>
								</div>
							) :
							(
								<div className="status status--warning">
									<div className="container">
										<p>Your profile is currently being approved by one our admins. <Link to="/contact">Contact us</Link> if you have any questions.</p>
									</div>
								</div>
							)
					)

					: null}
				{auth.emailVerified !== true ?
					<div className="status status--warning">
						<div className="container">
							<p>Please check your inbox and confirm you email. <ResendEmail text="Click here to resend." /></p>
						</div>
					</div>
					: null}
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--12">
							<h1 className={`text--lg text--uppercase`}>Dashboard</h1>
						</div>
						<div className="col col--8">
							<div className={`dashboard__head`}>
								{this.renderFirstName(profile.firstName)}
								<p style={{ paddingBottom: '10px' }}>Be the best version of YOU</p>
							</div>
						</div>
						<div className="col col--4">
							{this.props.profile.personalCity || this.props.profile.businessCity && (
								<Forecast city={this.props.profile.personalCity ? this.props.profile.personalCity : this.props.profile.businessCity} />
							)}
						</div>
					</div>

					<div className="row">
						<div className="col col--12">
							<GetQuote />
						</div>
					</div>

					<div className={`divider`}></div>

					{/* <div className="row">
						<div className="col">
							<div className={`dashboard__head mb--double`}>
								<h2 className={`text--md text--uppercase`}>At a glance</h2>
							</div>
						</div>
					</div> */}
					{/* <ProjectList projects={projects} /> */}

					<div className="row">
						<div className="col">
							<a href={'/inbox'} className={`dashboard__glance`}>
								<div className={`dashboard__glance-messages`}>
									<div className={`dashboard__glance--standout`}>{this.state.Inbox}</div>
									Active Messages
								</div>
							</a>
						</div>
						<div className="col">
							<a href={'/bookings'} className={`dashboard__glance`}>
								<div className={`dashboard__glance-requests`}>
									<div className={`dashboard__glance--standout`}>{this.state.Booking}</div>
									Active Bookings
								</div>
							</a>
						</div>
						{/* <div className="col">
							<a href={'/bookings'} className={`dashboard__glance`}>
								<div className={`dashboard__glance-bookings`}>
									<div className={`dashboard__glance--standout`}>2</div>
									Pending Bookings
								</div>
							</a>
						</div> */}
						{profile.isPro && (
							<div className="col">
								<div className={`dashboard__glance`}>
									<div className={`dashboard__glance-rating`}>
										<div className={`dashboard__glance--standout dashboard__glance--rating`}>
											<GetRating proInteractions={profile.proInteractions} />
										</div>
										Current Rating
									</div>
								</div>
							</div>
						)}
					</div>

					{/* <Notifications notifications={notifications} /> */}


					{/* {profile.isPro && (
						<>
							<div className={`divider`}></div>
							<div className="row">
								<div className="col">
									<div className={`dashboard__bookings-title`}>
										<h2 className={`text--md text--uppercase`}>Bookings</h2>
										<p>Last 12 months</p>
									</div>
								</div>
							</div>

							<div className="row">
								<div className="col">
									<div className={`dashboard__bookings-content`}>
										<LineChart width={600} height={300} data={data}>
											<Line type="monotone" dataKey="uv" stroke="#8884d8" />
											<CartesianGrid stroke="#ccc" />
											<XAxis dataKey="name" />
											<YAxis />
										</LineChart>
									</div>
								</div>
							</div>
						</>
					)} */}
					{profile.interests && (
						<>
							<div className={`divider`}></div>
							<div className={'row'}>
								<div className="col">
									<h2>Discover Pros Based on Your Interests</h2>
								</div>
							</div>
							<div className={'row'}>
								{profile.interests ?
									users && users.map(pro => {

										if (pro.isPro && pro.isApproved) {
											var interests = profile.interests
											var specialties = pro.specialties
											for (const [key, value] of Object.entries(interests)) {
												if (specialties) {
													for (const [key2, value2] of Object.entries(specialties)) {
														if (key === key2 && value === value2) {
															return (
																<Link className={`pro-list__card col col--4`} to={'/pro/' + pro.uid} key={pro.uid}>
																	<ProCard pro={pro} compact={true} />
																</Link>
															)
														}
													}
												}
											}
										}
									})
									:
									<div className="col">
										<p>No pros found. <Link to={'/profile-edit#2'}>Click here</Link> to update your interests to discover pros.</p>
									</div>
								}
							</div>
						</>
					)}

				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		// projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		interactions: state.firestore.ordered.interactions,
		// notifications: state.firestore.ordered.notifications,
		profile: state.firebase.profile,
		users: state.firestore.ordered.users,
	}
}

const DispatchToState = (dispatch) => {

	return {
		// projects: state.firestore.ordered.projects,
		onboardingAgain: () => dispatch(onboardingAgain())
	}
}

export default compose(
	connect(mapStateToProps, DispatchToState),
	firestoreConnect([
		// 	{ collection: 'projects', orderBy: ['createdAt', 'desc'] },
		// 	{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
		{ collection: 'interactions', orderBy: ['createdAt', 'desc'] },
		{ collection: 'users' }
	])
)(Dashboard)