import React, { Component } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import InteractionList from '../interactions/InteractionList'
import { firestoreConnect } from 'react-redux-firebase'

class Bookings extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.getUrlTabIndex = this.getUrlTabIndex.bind(this)
	}

	getUrlTabIndex = (hash) => {
		var initHash = hash
		if (initHash.startsWith('#')) {
			var removeHash = initHash.replace('#', '')
			return parseInt(removeHash)
		}
		return parseInt(initHash)
	}

	render() {
		const { interactions, auth, history, profile } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="bookings">
				{profile.isApproved !== true && profile.isPro ?
					<div className="status status--warning">
						<div className="container">
							<p>Your profile is currently being approved by one our admins. <Link to="/contact">Contact us</Link> if you have any questions.</p>
						</div>
					</div>
					: null}
				<div className="container container--top-bottom-padding container--small">
					<div className="row">
						<div className="col">
							<div className={`bookings__head`}>
								<h1 className={`text--lg text--uppercase`}>Bookings</h1>
							</div>
						</div>
					</div>

					{/* <div className={`divider`}></div> */}

					<div className="row">
						<div className="col">
							<Tabs defaultIndex={this.getUrlTabIndex(history.location.hash)}>
								<TabList>
									<Tab>Active</Tab>
									<Tab>Pending</Tab>
									<Tab>Completed</Tab>
									<Tab>Cancelled</Tab>
								</TabList>
								<TabPanel>
									<InteractionList auth={auth} interactions={interactions} interactionType={'booking'} status={'active'} />
								</TabPanel>
								<TabPanel>
									<InteractionList auth={auth} interactions={interactions} interactionType={'booking'} status={'pending'} />
								</TabPanel>
								<TabPanel>
									<InteractionList auth={auth} interactions={interactions} interactionType={'booking'} status={'completed'} />
								</TabPanel>
								<TabPanel>
									<InteractionList auth={auth} interactions={interactions} interactionType={'booking'} status={'cancelled'} />
								</TabPanel>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		interactions: state.firestore.ordered.interactions,
		auth: state.firebase.auth,
		profile: state.firebase.profile
		// interactionType: interactions.interactionType
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'interactions', orderBy: ['createdAt', 'desc'] }
	])
)(Bookings)