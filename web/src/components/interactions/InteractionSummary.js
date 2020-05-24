
import React from 'react'

const InteractionSummary = ({ interaction, auth }) => {
	console.log(interaction, auth);

	if (interaction.proUID === auth.uid) {
		// is pro
		return (
			<div className="interaction">
				<div className="interaction__user">
					{interaction.userFirstName}
				</div>
				<div className="interaction__snippet">
					{interaction.profession}
				</div>
				<div className="interaction__type">
					content
				</div>
			</div>
		)
	} else {
		// not pro
		return (
			<div className="interaction">
				<div className="interaction__user">
					{interaction.proFirstName}
				</div>
				<div className="interaction__snippet">
					{interaction.profession}
				</div>
				<div className="interaction__type">
					{interaction.interactionType}
				</div>
			</div>
		)
	}
}

export default InteractionSummary