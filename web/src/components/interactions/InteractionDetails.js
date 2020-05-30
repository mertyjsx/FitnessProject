import React from 'react'
import { connect } from 'react-redux'
import { firestore, firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import {
	updateInteractionToBooked,
	cancelBookingInteraction,
	closeInquiry,
	confirmBookingInteraction
} from '../../store/actions/interactionActions'
import InteractionMessages from './InteractionMessages'
import { renderProfileImage } from '../helpers/HelpersProfile'

const InteractionDetails = (props) => {
	const { interaction, auth } = props;
	const iid = props.match.params.id

	if (!auth.uid) return <Redirect to='/signin' />

	const renderName = () => {
		if (auth.uid !== interaction.proUID) {
			return interaction.proFirstName + ' ' + interaction.proLastName
		}
		return interaction.userFirstName + ' ' + interaction.userLastName
	}

	const calculateTotal = () => {
		// console.log('entered');
		const duration = interaction.duration
		const rate = interaction.rate
		if (typeof rate === 'undefined' || rate === 0) { return 0 }
		const total = rate * duration
		return total
	}

	const cancelSession = () => {
		// console.log('cancel btn clicked')
		props.cancelBookingInteraction(iid)
		// console.log('session has been cancelled')
	}

	const confirmSession = () => {
		console.log('authorize')
		// props.confirmBookingInteraction(iid)
		// console.log('session has been cancelled')
	}

	const closeInquiry = () => {
		// console.log(this, props)
		props.closeInquiry(iid)
		// console.log('session has been cancelled')
	}

	const completeBooking = () => {
		console.log('clicked');
		// charge paypal

		// on charge complete
		// update inquiry to booked
		props.updateInteractionToBooked()
	}

	if (interaction) {
		return (
			<div className="interaction-details">
				<div className="container  container--top-bottom-padding">
					<div className="row">
						<div className="col col--12">
							<h1 className="text--uppercase text--bold">{interaction.interactionType === 'booking' ? 'Booked' : interaction.interactionType}</h1>
						</div>
						<div className="col col--12">
							<h2 className="text--capitalize">{interaction.status}</h2>
						</div>
					</div>
					<div className={`divider`}></div>
					<div className="row">
						<div className="col col--7">
							<InteractionMessages groupID={iid} meta={interaction} />
						</div>
						<div className="col col--5">
							<div className="interaction-details__summary">
								<h2 className="text--uppercase mn--double">{interaction.interactionType} Details</h2>
								<div className="interaction-details__summary-meta">
									<div className="interaction-details__summary-image">
										{renderProfileImage(interaction.proImage)}
									</div>
									<div className="interaction-details__summary-name">
										<p className="text--capitalize">{renderName()}</p>
									</div>
								</div>
								<div className="interaction-details__summary-date">
									<h3>Date &amp; Time</h3>
									<p>{moment.unix(interaction.startDate.seconds).format("dddd, MMMM Do YYYY")}</p>
									<p>{moment.unix(interaction.startTime.seconds + '.' + interaction.startTime.nanoseconds).format("h:mm a")}</p>
								</div>
								<div className="interaction-details__summary-service">
									<h3>Service</h3>
									<p className="text--capitalize">{interaction.profession}</p>
								</div>
								<div className="interaction-details__summary-pricing">
									<h3 className="text--uppercase">Price</h3>
									<p className="mb--double pb--double"><span className="text--lowercase">${interaction.rate} x {interaction.duration} hours</span> <span>${calculateTotal()}</span></p>
									<p className="field--review-total text--uppercase text--bold"><span>Total</span> <span>${calculateTotal()}</span></p>
								</div>
							</div>

							{interaction.userUID === auth.uid ?
								<div className="interaction-details__buttons">
									{interaction.interactionType === 'booking' ? <Button className={'link'} onClick={cancelSession}>Cancel Booking</Button> : null}
									{interaction.interactionType === 'inquiry' ? <Button className={'link'} onClick={closeInquiry}>Close Inquiry</Button> : null}
								</div>
								:
								<div className="interaction-details__buttons">
									{interaction.interactionType === 'booking' && interaction.status === 'pending' ? <Button className={'link'} onClick={confirmSession}>Confirm Booking</Button> : null}
									{interaction.interactionType === 'pending' ? <Button className={'link'}>Add Service</Button> : null}
								</div>
							}
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
	// console.log(interactions);
	return {
		interaction: interaction,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		cancelBookingInteraction: (interaction) => dispatch(cancelBookingInteraction(interaction)),
		confirmBookingInteraction: (interaction) => dispatch(confirmBookingInteraction(interaction)),
		closeInquiry: (interaction) => dispatch(closeInquiry(interaction))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'interactions' }
	])
)(InteractionDetails)
