import React, { Component } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import InteractionList from '../interactions/InteractionList'
import { firestoreConnect } from 'react-redux-firebase'

class Bookings extends Component {
	render() {
		const { interactions, auth } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="bookings">
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
							<Tabs>
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
		// interactionType: interactions.interactionType
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'interactions', orderBy: ['createdAt', 'desc'] }
	])
)(Bookings)