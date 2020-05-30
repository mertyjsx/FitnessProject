import React from 'react'
import { Link } from 'react-router-dom'
import InteractionSummary from './InteractionSummary'

const InteractionList = ({ interactions, auth, interactionType, status }) => {
	// if (interactionType !== '') {
	return (
		<div className="interaction-list">

			{interactions && interactions.map(interaction => {
				// console.log(interaction, auth);
				if (interaction.proUID !== auth.uid && interaction.userUID !== auth.uid) return null
				if (interaction.interactionType === interactionType && interaction.status === status) {

					return (
						<Link to={'/session/' + interaction.id} iid={interaction.id} key={interaction.id} className={'row'} style={{ marginBottom: 25 }}>
							<InteractionSummary iid={interaction.id} auth={auth} interaction={interaction} />
						</Link>
					)
				}
			})}

		</div>
	)
	// } else {
	// 	return (
	// 		<div className="interaction-list">

	// 			{interactions && interactions.map(interaction => {
	// 				return (
	// 					<Link to={'/session/' + interaction.id} iid={interaction.id} key={interaction.id} className={'row'} style={{ marginBottom: 25 }}>
	// 						<InteractionSummary iid={interaction.id} auth={auth} interaction={interaction} />
	// 					</Link>
	// 				)
	// 			})}

	// 		</div>
	// 	)
	// }

}

export default InteractionList