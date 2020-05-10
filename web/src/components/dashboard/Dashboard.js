import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'

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
	return {
		projects: state.project.projects
	}
}

export default connect(mapStateToProps)(Dashboard)