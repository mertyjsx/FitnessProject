import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateSeen } from '../../store/actions/interactionActions'
import InteractionSummary from './InteractionSummary'

const InteractionList = ({ update, interactions, auth, interactionType, status }) => {

	console.log('here', interactions, interactionType, status)

	return (
		<div className="interaction-list">

			{interactions && interactions.map(interaction => {
				// console.log(interaction, auth);
				if (interaction.proUID !== auth.uid && interaction.userUID !== auth.uid) return null

				if (interaction.interactionType === interactionType && interaction.status === status) {
					return (
						<Link onClick={() => update(interaction.id)} to={'/session/' + interaction.id} iid={interaction.id} key={interaction.id} className={'row'} style={{ marginBottom: 25 }}>
							<InteractionSummary iid={interaction.id} auth={auth} interaction={interaction} isNew={interaction.update} />
						</Link>
					)
				}
			})}

		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		update: (creds) => dispatch(updateSeen(creds))
	}
}

export default connect(null, mapDispatchToProps)(InteractionList)