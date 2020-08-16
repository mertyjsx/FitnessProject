import axios from 'axios';
const twilio = require('twilio');
const twilioConfig = require('../../config/twilio.json')

//* URLS
// let baseUri = 'localhost:3000' // testing
let baseUri = 'https://ctbystaging.firebaseapp.com/' // staging
// let baseUri = 'https://choosetobeyou.com' //production


const sendMessage = (message, to) => {
	let message_body = encodeURI(message) // Update the message
	let from_number = encodeURI("+17865749377") // Update from number
	let to_number = encodeURI(to) // I can't find the number from the interaction or the pro user

	return axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
		`Body=${message_body}&From=${from_number}&To=${to_number}`,
		{
			auth: {
				username: twilioConfig.account_sid,
				password: twilioConfig.auth_token
			},
			headers: {
				accept: "application/json"
			}
		}).then(response => {
			console.log(response)
		}).catch(e => console.log(e))
}

export const createInteraction = (interaction) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		if (!interaction.proBusinessName) {
			interaction.proBusinessName = '';
		}
		console.log('inside create int', interaction)

		firestore.collection('interactions').add({
			...interaction,

			userFirstName: profile.firstName ? profile.firstName : '',
			userLastName: profile.lastName ? profile.lastName : '',
			userUID: userID,
			userImage: profile.photoURL ? profile.photoURL : '',
			createdAt: new Date(),
			ratingCompleted: false
		}).then((docRef) => {
			// console.log('success', docRef.id);
			dispatch({ type: 'CREATE_INTERACTION', interaction });
			// if it's a pro, add interaction
			firestore.collection('users').doc(interaction.proUID).update({
				proInteractions: firestore.FieldValue.arrayUnion(docRef.id)
			})
			// if it's a user, add interaction
			firestore.collection('users').doc(userID).update({
				userInteractions: firestore.FieldValue.arrayUnion(docRef.id)
			})
			// Send Message Client
			firestore.collection('users').doc(userID).get().then(snap => {
				let client = snap.data()
				let message_body = encodeURI(`New pending booking, ${baseUri}/session/${docRef.id}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(client.phoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
			// Send message
			firestore.collection('users').doc(interaction.proUID).get().then(snap => {
				let pro = snap.data()
				let message_body = encodeURI(`New pending booking, ${baseUri}/session/${docRef.id}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(pro.phoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
		}).catch((error) => {
			// console.log('nah');
			dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		})
	}
}

export const createInteractionInquiry = (interaction) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('info past form form', interaction)
		firestore.collection('interactions').add({
			...interaction,
			userFirstName: profile.firstName ? profile.firstName : '',
			userLastName: profile.lastName ? profile.lastName : '',
			userUID: userID,
			userImage: profile.photoURL ? profile.photoURL : '',
			inquiryCreatedAt: new Date(),
			ratingCompleted: false
		}).then((docRef) => {
			// console.log('success', docRef.id);
			dispatch({ type: 'CREATE_INTERACTION_INQUIRY', interaction });
			// if it's a pro, add interaction
			firestore.collection('users').doc(interaction.proUID).update({
				proInteractions: firestore.FieldValue.arrayUnion(docRef.id)
			})
			// if it's a user, add interaction
			firestore.collection('users').doc(userID).update({
				userInteractions: firestore.FieldValue.arrayUnion(docRef.id)
			})
			// Send message Client
			firestore.collection('users').doc(userID).get().then(snap => {
				let client = snap.data()
				let message_body = encodeURI(`New inquiry, ${baseUri}/session/${docRef.id}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(client.phoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
			// Send message
			firestore.collection('users').doc(interaction.proUID).get().then(snap => {
				let pro = snap.data()
				let message_body = encodeURI(`New inquiry, ${baseUri}/session/${docRef.id}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(pro.phoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
		}).catch((error) => {
			// console.log('nah');
			dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		})
	}
}

export const cancelBookingInteraction = (iid, interaction) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		// console.log('cancel book', bookingID);

		firestore.collection('interactions').doc(iid).update({
			status: 'cancelled',
			interactionType: 'booking'
		})
			.then(function () {
				// console.log("Booking successfully cancelled!", interaction);
				dispatch({ type: 'CANCEL_INTERACTION', interaction });
				// Send Message to Client
				firestore.collection('users').doc(interaction.userUID).get().then(snap => {
					let client = snap.data()
					let message_body = encodeURI(`Your booking with ${interaction.proFirstName} has been cancelled, ${baseUri}/session/${iid}`) // Update the message
					let from_number = encodeURI("+17865749377") // Update from number
					let to_number = encodeURI(interaction.clientPhoneNumber) // I can't find the number from the interaction or the pro user
					axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
						`Body=${message_body}&From=${from_number}&To=${to_number}`,
						{
							auth: {
								username: twilioConfig.account_sid,
								password: twilioConfig.auth_token
							},
							headers: {
								accept: "application/json"
							}
						}).then(response => {
							console.log(response)
						})
				});
				// Send Message to Pro
				firestore.collection('users').doc(interaction.proUID).get().then(snap => {
					let pro = snap.data()
					let message_body = encodeURI(`Your booking with ${interaction.userFirstName} has been cancelled, ${baseUri}/session/${iid}`) // Update the message
					let from_number = encodeURI("+17865749377") // Update from number
					let to_number = encodeURI(interaction.proPhoneNumber) // I can't find the number from the interaction or the pro user
					axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
						`Body=${message_body}&From=${from_number}&To=${to_number}`,
						{
							auth: {
								username: twilioConfig.account_sid,
								password: twilioConfig.auth_token
							},
							headers: {
								accept: "application/json"
							}
						}).then(response => {
							console.log(response)
						})
				});
			})
			.catch(function (error) {
				// The document probably doesn't exist.
				console.error("Error cancelling document: ", error);
				dispatch({ type: 'CANCEL_INTERACTION_ERROR', error })
			})
	}
}

export const confirmBookingInteraction = (bookingID) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('confirm book book', bookingID);
		firestore.collection('interactions').doc(bookingID).update({
			status: 'active',
			interactionType: 'booking'
		})
			.then(function (e) {
				firestore.collection('interactions').doc(bookingID).get().then(async snap => {
					let data = snap.data()
					let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
					await sendMessage(`Your booking with ${first_name(data.proFirstName)} has been confirmed, ${baseUri}/session/${bookingID}`, data.clientPhoneNumber)
					// await sendMessage(`Your booking with ${first_name(data.userFirstName)} has been confirmed, ${baseUri}/session/${bookingID}`, data.proPhoneNumber)
				})
				// console.log("Booking successfully confirmed!");
				dispatch({ type: 'CONFIRM_BOOKING', bookingID });
			})
			.catch(function (error) {
				// The document probably doesn't exist.
				console.error("Error cancelling document: ", error);
				dispatch({ type: 'CONFIRM_BOOKING_ERROR', error })
			})
	}
}

export const closeInquiry = (interaction) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		let interactionID = interaction;

		firestore.collection('interactions').doc(interactionID).update({
			status: 'archived',
			interactionType: 'inquiry'
		}).then(() => {
			console.log("inqiury successfully cancelled!", interactionID);
			// dispatch({ type: 'CLOSE_INQUIRY', interactionID });
			// Send message Client
			firestore.collection('interactions').doc(interactionID).get().then(snap => {
				let int = snap.data()
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`Inquiry with ${first_name(int.proFirstName)} has been closed, ${baseUri}/session/${interactionID}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(int.clientPhoneNumber)
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
			// Send message Pro
			firestore.collection('interactions').doc(interactionID).get().then(snap => {
				let int = snap.data()
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`Inquiry with ${first_name(int.clientFirstName)} has been closed, ${baseUri}/session/${interactionID}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(int.proPhoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
		}).catch(function (error) {
			// The document probably doesn't exist.
			// console.error("Error cancelling document: ", error);
			dispatch({ type: 'CLOSE_INQUIRY_ERROR', error })
		})
	}
}

export const updateInteractionToBooked = (interaction) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		console.log('update interaction activated');
	}
}

export const sendBookingRequestFromInquiry = (iid, details) => {
	return (dispatch, getState, { getFirestore }) => {
		// console.log('inside action', bookingID, interaction);
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		let interactionID = iid;
		// console.log('inside action', iid, details);
		firestore.collection('interactions').doc(iid).update({
			paypal: {
				timeCreated: details.create_time,
				id: details.id,
				email: details.payer.email_address,
				firstName: details.payer.name.given_name,
				lastName: details.payer.name.surname,
				payerID: details.payer.payer_id,
				status: details.status
			},
			status: 'pending',
			interactionType: 'booking',
			createdAt: new Date(),
			proUpdate: true,
			userUpdate: true
		}).then(function () {
			// console.log("Booking successfully cancelled!");
			dispatch({ type: 'SEND_BOOKING_REQ_FROM_INQUIRY', iid });
			firestore.collection('interactions').doc(interactionID).get().then(snap => {
				let int = snap.data()
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`${first_name(int.proFirstName)} has sent you a request for booking, ${baseUri}/session/${interactionID}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(int.proPhoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
		}).catch(function (error) {
			// The document probably doesn't exist.
			// console.error("Error cancelling document: ", error);
			dispatch({ type: 'SEND_BOOKING_REQ_FROM_INQUIRY_ERROR', error })
		})
	}
}

export const completeInteraction = (iid) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log('complete session');

		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('inside action', iid);

		firestore.collection('interactions').doc(iid).update({
			status: 'completed',
			interactionType: 'booking',
			endTime: new Date().getTime()
		}).then(function () {
			// console.log("Booking successfully cancelled!");
			dispatch({ type: 'COMPLETED', iid });
			// Send Msg to Client
			firestore.collection('interactions').doc(iid).get().then(snap => {
				let int = snap.data()
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`Your session with ${first_name(int.proFirstName)} has been completed! Leave a review about your experience at ${baseUri}/session/${iid}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(int.clientPhoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
		}).catch(function (error) {
			// The document probably doesn't exist.
			// console.error("Error cancelling document: ", error);
			dispatch({ type: 'COMPLETED_ERROR', error })
		})
	}
}

export const getInteractionsForCron = () => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		let interactionPromise = firestore.collection('interactions').where('status', '==', 'completed').get()
		return interactionPromise
	}
}

export const getProForPayout = (uid) => {
	return (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		return firestore.collection('users').doc(uid).get()
	}
}

export const completeInteractionPayout = (iid) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log('complete session payout');
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		console.log('inside action', iid);

		firestore.collection('interactions').doc(iid).update({
			status: 'payoutcompleted',
			interactionType: 'booking'
		}).then(function () {
			// console.log("Booking successfully cancelled!");
			dispatch({ type: 'PAYOUT_COMPLETED', iid });
			// Send Message to Pro
			firestore.collection('interactions').doc(iid).get().then(snap => {
				let int = snap.data()
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`Your payout with ${first_name(int.clientFirstName)} has been completed! ${baseUri}/session/${iid}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(int.proPhoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
		}).catch(function (error) {
			// The document probably doesn't exist.
			// console.error("Error cancelling document: ", error);
			dispatch({ type: 'COMPLETED_ERROR', error })
		})
	}
}

export const sendTip = (tip, iid) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log('complete tip');
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		console.log('inside action', iid);
		// if (iid) {
		console.log('inside id', iid);
		firestore.collection('interactions').doc(iid).update({
			...tip
		}).then(function () {
			// console.log("Booking successfully cancelled!");
			dispatch({ type: 'PAYOUT_COMPLETED', iid });
			// Send Message to Pro
			firestore.collection('interactions').doc(iid).get().then(snap => {
				let int = snap.data()
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`${first_name(int.clientFirstName)} has sent you a tip! ${baseUri}/session/${iid}`) // Update the message
				let from_number = encodeURI("+17865749377") // Update from number
				let to_number = encodeURI(int.proPhoneNumber) // I can't find the number from the interaction or the pro user
				axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
					`Body=${message_body}&From=${from_number}&To=${to_number}`,
					{
						auth: {
							username: twilioConfig.account_sid,
							password: twilioConfig.auth_token
						},
						headers: {
							accept: "application/json"
						}
					}).then(response => {
						console.log(response)
					})
			});
		}).catch(function (error) {
			// The document probably doesn't exist.
			// console.error("Error cancelling document: ", error);
			dispatch({ type: 'COMPLETED_ERROR', error })
		})
		// }
	}
}

export const updateSeen = (iid, isPro) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log('Update Seen by user');

		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('inside action', iid);

		let updateObject = {}
		if (isPro) updateObject.proUpdate = false
		else updateObject.userUpdate = false

		console.log(updateObject)
		firestore.collection('interactions').doc(iid).update(updateObject)
			.then(function () {

				console.log('Update Seen by user');
				// console.log("Booking successfully cancelled!");
				dispatch({ type: 'UPDATE_SEEN', iid });
			}).catch(function (error) {
				// The document probably doesn't exist.
				// console.error("Error cancelling document: ", error);
				dispatch({ type: 'COMPLETED_ERROR', error })
			})
	}
}

export const Calling = (iid, payload) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log('Update Seen by user');

		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('inside action', iid);
		console.log(iid)
		console.log(payload)
		firestore.collection('users').doc(iid).update({
			Calling: payload,
		}).then(function () {

			console.log('Calling');
			// console.log("Booking successfully cancelled!");
			dispatch({ type: 'UPDATE_SEEN', iid });
		}).catch(function (error) {
			// The document probably doesn't exist.
			// console.error("Error cancelling document: ", error);
			dispatch({ type: 'COMPLETED_ERROR', error })
		})
	}
}