import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import DeleteAccount from '../auth/DeleteAccount'
import UpgradeProPremium from '../auth/UpgradeProPremium'

class Settings extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="settings">
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<div className={`dashboard__head`}>
								<h1 className={`text--lg text--uppercase`}>Settings</h1>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col" style={{ marginBottom: '50px' }}>
							<UpgradeProPremium auth={this.props.auth} />
						</div>
					</div>

					<div className="row">
						<div className="col" style={{ marginBottom: '50px' }}>
							<DeleteAccount auth={this.props.auth} />
						</div>
					</div>

					<div className="row">
						<div className="col" style={{ marginBottom: '50px' }}>
							<div>
								<h2>File a Claim</h2>
								<Link to="/file-claim" className="button button--primary">Start Process</Link>
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
)(Settings)