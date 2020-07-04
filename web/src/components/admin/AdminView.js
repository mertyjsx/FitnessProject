
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import Notifications from '../dashboard/Notifications'
import PendingProfiles from './PendingProfiles'
import SetQuote from './quote/SetQuote'

class AdminView extends Component {
	render() {
		const { users, projects, auth, profile, notifications } = this.props
		return (
			<div className="admin">
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--12">
							<SetQuote />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<Notifications notifications={notifications} />
						</div>
						<div className="col">
							<PendingProfiles users={users} />
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
		projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		notifications: state.firestore.ordered.notifications,
		profile: state.firebase.profile,
		users: state.firestore.ordered.users,
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		// { collection: 'projects', orderBy: ['createdAt', 'desc'] },
		{ collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] },
		{ collection: 'users' }
	])
)(AdminView)