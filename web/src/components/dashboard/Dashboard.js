import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
	render() {
		// console.log(this.props)
		const { projects, auth, notifications } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col">
							<h1>Dashboard</h1>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<ProjectList projects={projects} />
						</div>
					</div>
					<div className="row">
						<div className="col">
							<Notifications notifications={notifications} />
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
		notifications: state.firestore.ordered.notifications
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'projects', orderBy: ['createdAt', 'desc'] },
		{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
	])
)(Dashboard)