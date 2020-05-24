import React from 'react'
import { Link } from 'react-router-dom'
import InteractionSummary from './InteractionSummary'

const InteractionList = ({ interactions, auth }) => {
	// console.log('int', auth);

	return (
		<div className="project-list">

			{interactions && interactions.map(interaction => {
				return (
					<Link to={'/inbox/' + interaction.id} key={interaction.id}>
						<InteractionSummary auth={auth} interaction={interaction} />
					</Link>
				)
			})}

		</div>
	)
}

export default InteractionList