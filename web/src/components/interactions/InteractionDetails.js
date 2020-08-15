import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { Button } from 'semantic-ui-react'
import { db } from '../../config/fbConfig'
import PaypalConfig from '../../config/paypal.json'
import {
	cancelBookingInteraction,
	closeInquiry,
	completeInteraction,
	confirmBookingInteraction,
	sendBookingRequestFromInquiry
} from '../../store/actions/interactionActions'
import { renderProfileImage } from '../helpers/HelpersProfile'
import Modal from '../modal/Modal'
import Loading from '../modules/Loading'
import SendTip from '../payments/SendTip'
import GetSingleReview from '../rating/GetSingleReview'
import SetRating from '../rating/SetRating'
import InteractionCall from './InteractionCall'
import InteractionMessages from './InteractionMessages'


const InteractionDetails = (props) => {
	let $this = this;
	let callEnabled = false;
	const { interaction, auth } = props;
	const iid = props.match.params.id
	const [addy, setAddy] = useState('');
	const [paypalDetails, setPaypalDetails] = useState(null)

	if (!auth.uid) return <Redirect to='/signin' />

	const renderName = () => {
		if (auth.uid !== interaction.proUID) {
			return interaction.proFirstName + ' ' + interaction.proLastName
		}
		return interaction.userFirstName + ' ' + interaction.userLastName
	}

	const renderFirstLetter = () => {
		if (auth.uid !== interaction.proUID) {
			return interaction.proFirstName.charAt(0) + ' ' + interaction.proLastName.charAt(0)
		}
		return interaction.userFirstName.charAt(0) + ' ' + interaction.userLastName.charAt(0)
	}

	const calculateTotal = () => {
		// console.log('entered');
		const duration = interaction.duration
		const rate = interaction.rate
		const perMinute = duration / 60
		if (typeof rate === 'undefined' || rate === 0) { return 0 }
		const total = rate * perMinute
		return total
	}

	const getClientAddress = (clientUID) => {
		const $this = this
		var collection = db.collection('users').doc(clientUID).get()
		var content = {
			prop: ''
		}
		collection.then(doc => {
			const data = doc.data();
			if (data.personalAddress) {
				setAddy(data.personalAddress + ' ' + data.personalAddress2 + ' ' + data.personalCity + ', ' + data.personalState + ' ' + data.personalZip)
			} else {
				setAddy('No address listed on profile. Please update your personal address.')
			}
		});
		return addy
	}

	const cancelSession = () => {
		// console.log('cancel btn clicked')
		let paypal_base_uri = `https://api.paypal.com/`;
		if (PaypalConfig.sandbox) paypal_base_uri = `https://api.sandbox.paypal.com/`;
		if (interaction.paypal) {

			axios.post(paypal_base_uri + 'v1/oauth2/token',
				"grant_type=client_credentials",
				{
					"headers": {
						"Accept": "application/json",
						"Accept-Language": "en_US",
						'Access-Control-Allow-Origin': 'localhost:3000'
					},
					// "withCredentials": true,
					"auth": {
						"username": PaypalConfig.client_id,
						"password": PaypalConfig.client_secret
					}
				}).then((response) => {
					let paypal_access_token = response.data.access_token;
					let paypal_token_type = response.data.token_type;
					let paypalid = interaction.paypal.id;
					axios.get(`${paypal_base_uri}v2/checkout/orders/${paypalid}`,
						{
							headers: {
								"Content-Type": "application/json",
								"Authorization": `${paypal_token_type} ${paypal_access_token}`
							},
						}).then(response => {
							response.data.purchase_units.forEach(purchase_unit => {
								purchase_unit.payments.captures.forEach(capture => {
									axios.post(`${paypal_base_uri}v2/payments/captures/${capture.id}/refund`,
										{},
										{
											headers: {
												"Content-Type": "application/json",
												"Authorization": `${paypal_token_type} ${paypal_access_token}`
											},
										}).then(response => {
											console.log(response);
											props.cancelBookingInteraction(iid)
											document.body.style.overflow = 'unset'
										})
								});
							});
						});
				});
		} else {
			props.cancelBookingInteraction(iid)
			document.body.style.overflow = 'unset'
		}
		console.log(interaction);
		// props.cancelBookingInteraction(iid)
		// console.log('session has been cancelled')
	}

	const cancelSessionAsPro = () => {
		// console.log('cancel btn clicked')
		let paypal_base_uri = `https://api.paypal.com/`;
		if (PaypalConfig.sandbox) paypal_base_uri = `https://api.sandbox.paypal.com/`;

		axios.post(paypal_base_uri + 'v1/oauth2/token',
			"grant_type=client_credentials",
			{
				"headers": {
					"Accept": "application/json",
					"Accept-Language": "en_US",
					'Access-Control-Allow-Origin': 'localhost:3000'
				},
				// "withCredentials": true,
				"auth": {
					"username": PaypalConfig.client_id,
					"password": PaypalConfig.client_secret
				}
			}).then((response) => {
				let paypal_access_token = response.data.access_token;
				let paypal_token_type = response.data.token_type;
				let paypalid = interaction.paypal.id;
				axios.get(`${paypal_base_uri}v2/checkout/orders/${paypalid}`,
					{
						headers: {
							"Content-Type": "application/json",
							"Authorization": `${paypal_token_type} ${paypal_access_token}`
						},
					}).then(response => {
						response.data.purchase_units.forEach(purchase_unit => {
							purchase_unit.payments.captures.forEach(capture => {
								axios.post(`${paypal_base_uri}v2/payments/captures/${capture.id}/refund`,
									{},
									{
										headers: {
											"Content-Type": "application/json",
											"Authorization": `${paypal_token_type} ${paypal_access_token}`
										},
									}).then(response => {
										console.log(response);
										props.cancelBookingInteraction(iid)
										document.body.style.overflow = 'unset'
									})
							});
						});
					});
			});
	}

	const confirmSession = () => {
		// console.log('authorize')
		props.confirmBookingInteraction(iid)
		// console.log('session has been cancelled')
	}

	const completeSession = () => {
		// console.log('complete session');
		props.completeInteraction(iid)
	}

	const sendBookingRequestFromInquiryButton = (details) => {
		setTimeout(function () {
			// 	console.log('wait 3 secs', paypalDetails.create_time);
			props.sendBookingRequestFromInquiry(iid, details);
			document.body.style.overflow = 'unset'
			props.history.push('/bookings')
		}, 1000)
		// props.sendBookingRequestFromInquiry(iid)
		// }, 3000)
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
		// console.log(moment.unix(interaction.createdAt.seconds).format("YYYY-MM-DD HH:mm:ss"), moment.unix(interaction.createdAt.seconds).add(1, 'days').format("YYYY-MM-DD HH:mm:ss"))
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
							<InteractionMessages groupID={iid} meta={interaction} name={renderFirstLetter} />
						</div>
						<div className="col col--5">

							{interaction.interactionType === 'booking' && interaction.status === 'active' && (
								<InteractionCall iid={iid} interaction={interaction} auth={auth} />
							)}

							{interaction.ratingCompleted === false && interaction.userUID === auth.uid && interaction.interactionType === 'booking' && interaction.status === 'completed' && (
								<div className="rating">
									<div className="rating__inner">
										<h2 className="text--uppercase text--bold">Leave a review for {interaction.proFirstName} {interaction.proLastName[0]}.</h2>
										<SetRating iid={iid} interaction={interaction} />
									</div>
								</div>
							)}

							{interaction.ratingCompleted === true && (
								<div className="rating">
									<div className="rating__inner">
										<h2 className="text--uppercase text--bold">Rating Completed</h2>
										<GetSingleReview iid={iid} />
									</div>
								</div>
							)}

							{interaction.userUID === auth.uid && interaction.interactionType === 'booking' && interaction.status === 'completed' && !interaction.paypalTip && (
								<div className="tip">
									<div className="tip__inner">
										<h2 className="text--uppercase text--bold">Send a tip to {interaction.proFirstName} {interaction.proLastName[0]}.</h2>
										<SendTip iid={iid} interaction={interaction} />
									</div>
								</div>
							)}

							{interaction.userUID === auth.uid && interaction.interactionType === 'booking' && interaction.status === 'completed' && interaction.paypalTip && (
								<div className="tip">
									<div className="tip__inner">
										<h2 className="text--uppercase text--bold">Thank you for tipping your pro</h2>
										<p>You tipped <span class="text--capitalize">{interaction.proFirstName} {interaction.proLastName[0]}.</span> ${interaction.paypalTip.amount}</p>
									</div>
								</div>
							)}

							{interaction.userUID === auth.uid ?
								<div className="interaction-details__buttons text--center">
									{/* <p>Person Booking</p> */}
									{/* <Link to={'/pro/' + interaction.proUID}>Start a new inquiry</Link> */}
									{interaction.interactionType === 'booking' && interaction.status !== 'cancelled' && interaction.status !== 'completed' ?
										<Modal
											buttonText={`Cancel Booking`}
											buttonStyle={`button button--primary button--full`}
											content={
												<>
													<h2>Confirm Cancellation</h2>
													<p style={{ marginBottom: '10px' }}>If you cancel 24 hours or more after the confirmed date and time, you will recieve a full refund. For more information about our cancellation policy, <Link to="/cancellation-policy">click here</Link>.</p>
													<Button className={'button--secondary button--full'} onClick={cancelSession}>Confirm Cancel Booking</Button>
												</>
											}
										/>
										: null}
									{interaction.interactionType === 'inquiry' && interaction.status === 'pending' ?
										// <Button className={'button--secondary button--full'} onClick={sendBookingRequestFromInquiry}>Send Booking Request</Button>
										<Modal
											buttonText={`Send Booking Request`}
											buttonStyle={`button button--secondary button--full`}
											content={(
												<div style={{ textTransform: 'none' }}>
													<h2>Complete Booking</h2>
													<p>Your total of ${interaction.total} will be processed to book the session with <span className="text--capitalize">{interaction.proFirstName}</span>.</p>
													<p>Please choose your preferred method of payment below.</p>
													<PayPalButton
														options={{
															clientId: PaypalConfig.client_id,
															vault: true
														}}
														// amount={interaction.total}
														amount={1} // testing
														shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
														onSuccess={(details, data) => {
															console.log('in success', details, data)
															// setPaypalDetails(details)
															sendBookingRequestFromInquiryButton(details)
															// props.sendBookingRequestFromInquiry(iid, details)
														}}
													/>
												</div>
											)}
										/>
										: null}
									{interaction.interactionType === 'inquiry' && interaction.status === 'pending' ? <Button className={'button--primary button--full'} onClick={closeInquiry}>Close Inquiry</Button> : null}
								</div>
								:
								<div className="interaction-details__buttons text--center">
									{/* <p>THe Pro</p> */}
									{interaction.interactionType === 'inquiry' && interaction.status === 'pending' ? <Button className={'button--primary button--full'} onClick={closeInquiry}>Close Inquiry</Button> : null}
									{/* {interaction.interactionType === 'booking' && interaction.status === 'active' && moment.unix(interaction.startDate.seconds).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD") ? <Button className={'button--secondary button--full'} onClick={completeSession}>Complete Session</Button> : null} */}
									{interaction.interactionType === 'booking' && interaction.status === 'pending' ? <Button className={'button--secondary button--full'} onClick={confirmSession}>Confirm Booking</Button> : null}
									{interaction.interactionType === 'booking' && interaction.status !== 'cancelled' && interaction.status !== 'completed' ? <Button className={'button--primary button--full'} onClick={cancelSession}>Cancel Booking</Button> : null}

									{/* For DEV - uncomment line 293 */}
									{interaction.interactionType === 'booking' && interaction.status === 'active' ? <Button className={'button--secondary button--full'} onClick={completeSession}>Complete Session</Button> : null}
								</div>
							}

							<div className="interaction-details__summary">
								<h2 className="text--uppercase mn--double">{interaction.interactionType} Details</h2>
								<div className="interaction-details__summary-meta">
									<div className="interaction-details__summary-image">
										{props.auth.uid !== interaction.proUID ?
											renderProfileImage(interaction.proImage)
											:
											interaction.userImage ?
												renderProfileImage(interaction.userImage)
												:
												<div className={'initials'}>
													{interaction.userFirstName[0] + interaction.userLastName[0]}
												</div>
										}
									</div>
									<div className="interaction-details__summary-name">
										<p className="text--capitalize">{renderName()}</p>
									</div>
								</div>
								<div className="interaction-details__location">
									<h3>Location</h3>
									{interaction.bookingType === 'online' ? 'Online' :
										interaction.inPersonType === 'inCall' ?
											<div>
												<p>{interaction.proBusinessName}</p>
												<p>{interaction.proFullAddress}</p>
											</div>
											:
											<div>
												{interaction.googleAddress ? (
													<>
														<p>Requested Location:</p>
														<p>{interaction.googleAddress}</p>
													</>
												) : (
														<>
															<p>Pro will go to:</p>
															<p>{interaction.clientFullAdress}</p>
														</>
													)}
											</div>
									}
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
									<p className="mb--double pb--double"><span className="text--lowercase">${interaction.rate} x {interaction.duration / 60} hours</span> <span>${calculateTotal()}</span></p>
									<p className="field--review-total text--uppercase text--bold"><span>Total</span> <span>${calculateTotal()}</span></p>
								</div>
							</div>

							<div class="interaction-details__time-booked">
								{interaction.inquiryCreatedAt && <p>Inquiry Created: {moment.unix(interaction.inquiryCreatedAt.seconds).format("dddd, MMMM Do YYYY hh:mm A")}</p>}
								{interaction.createdAt && <p>Booking Created: {moment.unix(interaction.createdAt.seconds).format("dddd, MMMM Do YYYY hh:mm A")}</p>}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<Loading />
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
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		cancelBookingInteraction: (interaction) => dispatch(cancelBookingInteraction(interaction)),
		confirmBookingInteraction: (interaction) => dispatch(confirmBookingInteraction(interaction)),
		completeInteraction: (interaction) => dispatch(completeInteraction(interaction)),
		closeInquiry: (interaction) => dispatch(closeInquiry(interaction)),
		sendBookingRequestFromInquiry: (interaction, details) => dispatch(sendBookingRequestFromInquiry(interaction, details))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'interactions' }
	])
)(InteractionDetails)
