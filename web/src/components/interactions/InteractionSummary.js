import moment from 'moment'
import React from 'react'
import { renderProfileImage } from '../helpers/HelpersProfile'

const InteractionSummary = ({ interaction, auth, isNew }) => {
	// console.log(interaction, auth);

	if (interaction.proUID === auth.uid) {
		// is pro
		return (
			<div className={`interaction ${interaction.interactionType ? `interaction--` + interaction.interactionType : null} ${isNew ? `interaction--unread` : null}`}>
				<div className="interaction__user">
					{isNew && <div className="new">New Updates</div>}
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
			<div className={`interaction interaction--${interaction.interactionType} ${isNew ? `interaction--unread` : null}`}>
				<div className="interaction__user">
					{isNew && <div className="new">New Updates</div>}
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