import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

class Dashboard extends Component {

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
		const { projects, auth, profile, notifications } = this.props
		if (!auth.uid) return <Redirect to='/signin' />
		if (!profile.onboardingCompleted) return <Redirect to='/onboarding' />

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
				{profile.isApproved !== true ?
					<div className="status status--warning">
						<div className="container">
							<p>Your profile is currently being approved by one our admins. <Link to="/contact">Contact us</Link> if you have any questions.</p>
						</div>
					</div>
					: null}
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<div className={`dashboard__head`}>
								<h1 className={`text--lg text--uppercase`}>Dashboard</h1>
								{this.renderFirstName(profile.firstName)}
							</div>
						</div>
					</div>

					<div className={`divider`}></div>

					<div className="row">
						<div className="col">
							<div className={`dashboard__head mb--double`}>
								<h2 className={`text--md text--uppercase`}>At a glance</h2>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col col--3">
							{/* <ProjectList projects={projects} /> */}
							<div className={`dashboard__glance`}>
								<div className={`dashboard__glance-messages`}>
									<div className={`dashboard__glance--standout`}>1</div>
									Unread Messages
								</div>
							</div>
						</div>
						<div className="col col--3">
							<div className={`dashboard__glance`}>
								<div className={`dashboard__glance-requests`}>
									<div className={`dashboard__glance--standout`}>1</div>
									Unread Booking Requests
								</div>
							</div>
						</div>
						<div className="col col--3">
							<div className={`dashboard__glance`}>
								<div className={`dashboard__glance-bookings`}>
									<div className={`dashboard__glance--standout`}>2</div>
									Approved Bookings
								</div>
							</div>
						</div>
						<div className="col col--3">
							<div className={`dashboard__glance`}>
								<div className={`dashboard__glance-rating`}>
									<div className={`dashboard__glance--standout dashboard__glance--rating`}>4</div>
									Current Rating
								</div>
							</div>
						</div>
					</div>

					<div className={`divider`}></div>

					<div className="row">
						<div className="col">
							{/* <Notifications notifications={notifications} /> */}
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
		// notifications: state.firestore.ordered.notifications,
		profile: state.firebase.profile
	}
}

export default compose(
	connect(mapStateToProps),
	// firestoreConnect([
	// 	{ collection: 'projects', orderBy: ['createdAt', 'desc'] },
	// 	{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
	// ])
)(Dashboard)