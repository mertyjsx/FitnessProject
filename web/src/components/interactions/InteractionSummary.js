import React from 'react'
import { renderProfileImage } from '../helpers/HelpersProfile'
import moment from 'moment'

const InteractionSummary = ({ interaction, auth }) => {
	// console.log(interaction, auth);

	if (interaction.proUID === auth.uid) {
		// is pro
		return (
			<div className={`interaction ${interaction.interactionType ? `intreaction--` + interaction.interactionType : null}`}>
				<div className="interaction__user">
					<div className="interaction__user-img">
						{renderProfileImage(interaction.proImage)}
					</div>
					<div className="interaction__user-name text--capitalize">
						{interaction.userFirstName + ' ' + interaction.userLastName[0] + '.'}
					</div>
				</div>
				<div className="interaction__snippet">
					<div className="interaction__snippet-content">
						<p><span className="text--capitalize text--bold">{interaction.profession}</span> - <span>{moment.unix(interaction.startDate.seconds).format("MMMM Do YYYY")}</span></p>
					</div>
				</div>
				<div className="interaction__type">
					<div className={`text--right`}>
						<p className="text--no-margin">{interaction.interactionType === 'booking' ? 'Booked' : interaction.interactionType}</p>
						<small>{interaction.status}</small>
					</div>
				</div>
			</div>
		)
	} else {
		// not pro
		return (
			<div className={`interaction interaction--${interaction.interactionType}`}>
				<div className="interaction__user">
					<div className="interaction__user-img">
						{renderProfileImage(interaction.proImage)}
					</div>
					<div className="interaction__user-name text--capitalize">
						{interaction.proFirstName + ' ' + interaction.proLastName[0] + '.'}
					</div>
				</div>
				<div className="interaction__snippet">
					<div className="interaction__snippet-content">
						<p><span className="text--capitalize text--bold">{interaction.profession}</span> - <span>{moment.unix(interaction.startDate.seconds).format("MMMM Do YYYY")}</span></p>
					</div>
				</div>
				<div className={`interaction__type`}>
					<div className={`text--right`}>
						<p className="text--no-margin">{interaction.interactionType === 'booking' ? 'Booked' : interaction.interactionType}</p>
						<small>{interaction.status}</small>
					</div>
				</div>
			</div>
		)
	}
}

export default InteractionSummary