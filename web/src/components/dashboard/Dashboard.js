import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'


class Dashboard extends Component {
	render() {
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
							<ProjectList />
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

export default Dashboard