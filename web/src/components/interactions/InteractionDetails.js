import React from 'react'
import { connect } from 'react-redux'
import { firestore, firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const InteractionDetails = (props) => {
	const { interaction, auth } = props;
	if (!auth.uid) return <Redirect to='/signin' />

	if (interaction) {
		return (
			<div className="interaction-details">
				<div className="container  container--top-bottom-padding">
					<div className="row">
						<div className="col">
							<h1>{interaction.interactionType}</h1>
						</div>
					</div>
					<div className={`divider`}></div>
					<div className="row">
						<div className="col col--8">
							<h2>{'msgs'}</h2>
						</div>
						<div className="col col--4">
							<h2>{'deets'}</h2>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className={'container'}>
				..Loading
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	// console.log(state);
	const id = ownProps.match.params.id
	const interactions = state.firestore.data.interactions
	const interaction = interactions ? interactions[id] : null
	console.log(interactions);

	return {
		interaction: interaction,
		auth: state.firebase.auth
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'interactions' }
	])
)(InteractionDetails)