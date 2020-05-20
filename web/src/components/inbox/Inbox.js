import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Inbox extends Component {

	render() {
		// console.log(this.props)
		const { projects, auth, profile, notifications } = this.props
		if (!auth.uid) return <Redirect to='/signin' />

		return (
			<div className="inbox">
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<div className={`inbox__head`}>
								<h1 className={`text--lg text--uppercase`}>Inbox</h1>
							</div>
						</div>
					</div>

					<div className={`divider`}></div>

					<div className="row">
						<div className="col">
							<div className={`inbox__group`}>
								Inbox
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
)(Inbox)