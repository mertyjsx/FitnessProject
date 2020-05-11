import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'


class Dashboard extends Component {
	render() {
		// console.log(this.props)
		const { projects } = this.props

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
							<Notifications />
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
		projects: state.firestore.ordered.projects
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'projects' }
	])
)(Dashboard)