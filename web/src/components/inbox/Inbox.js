import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link, Redirect } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { compose } from 'redux'
import InteractionList from '../interactions/InteractionList'

class Inbox extends Component {

	render() {
		// console.log(this.props)
		const { interactions, auth, profile } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="inbox">
				{profile.isApproved !== true && profile.isPro ?
					<div className="status status--warning">
						<div className="container">
							<p>Your profile is currently being reviewed by one our admins. <Link to="/contact">Contact us</Link> if you have any questions.</p>
						</div>
					</div>
					: null}
				<div className="container container--top-bottom-padding container--small">
					<div className="row">
						<div className="col">
							<div className={`inbox__head`}>
								<h1 className={`text--lg text--uppercase`}>Inbox</h1>
							</div>
						</div>
					</div>

					{/* <div className={`divider`}></div> */}

					<div className="row">
						<div className="col">
							<Tabs>
								<TabList>
									<Tab>Inquiry</Tab>
									<Tab>Archived</Tab>
								</TabList>
								<TabPanel>
									<InteractionList auth={auth} interactions={interactions} interactionType={'inquiry'} status={'pending'} />
								</TabPanel>
								<TabPanel>
									<InteractionList auth={auth} interactions={interactions} interactionType={'inquiry'} status={'archived'} />
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
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'interactions' }
	])
)(Inbox)