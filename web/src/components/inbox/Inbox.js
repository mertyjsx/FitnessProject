import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import InteractionList from '../interactions/InteractionList'
import { firestoreConnect } from 'react-redux-firebase'

class Inbox extends Component {

	render() {
		// console.log(this.props)
		const { interactions, auth, profile, notifications } = this.props
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
							<InteractionList auth={auth} interactions={interactions} />
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
		{ collection: 'interactions', orderBy: ['createdAt', 'desc'] }
	])
)(Inbox)