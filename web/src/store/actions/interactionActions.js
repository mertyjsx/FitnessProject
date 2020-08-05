import axios from 'axios';
const twilio = require('twilio');
const twilioConfig = require('../../config/twilio.json')

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
			// Send message
			firestore.collection('users').doc(interaction.proUID).get().then(snap => {
				let pro = snap.data()
				let baseUri = 'choosetobeyou.com' // change for production release
				let message_body = encodeURI(`New pending booking, http://${baseUri}/session/${docRef.id}`) // Update the message
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

		if (!interaction.proBusinessName) {
			interaction.proBusinessName = '';
		}
		// console.log(interaction)

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
			// Send message
			firestore.collection('users').doc(interaction.proUID).get().then(snap => {
				let pro = snap.data()
				let baseUri = 'choosetobeyou.com' // change for production release
				let message_body = encodeURI(`New inquiry, http://${baseUri}/session/${docRef.id}`) // Update the message
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

export const cancelBookingInteraction = (bookingID) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		console.log('cancel book', bookingID);

		firestore.collection('interactions').doc(bookingID).update({
			status: 'cancelled',
			interactionType: 'booking'
		})
			.then(function () {
				console.log("Booking successfully cancelled!");
				dispatch({ type: 'CANCEL_INTERACTION', bookingID });
				// Send Message to Pro
				firestore.collection('users').doc(bookingID.proUID).get().then(snap => {
					let pro = snap.data()
					let baseUri = 'choosetobeyou.com' // change for production release
					let message_body = encodeURI(`Your booking with ${bookingID.userFirstName} has been cancelled`) // Update the message
					let from_number = encodeURI("+17865749377") // Update from number
					let to_number = encodeURI(bookingID.proPhoneNumber) // I can't find the number from the interaction or the pro user
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
			.then(function () {
				console.log("Booking successfully cancelled!");
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
			// Send message
			firestore.collection('interactions').doc(interactionID).get().then(snap => {
				let int = snap.data()
				let baseUri = 'choosetobeyou.com' // change for production release
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`Inquiry with ${first_name(int.proFirstName)} has been closed. Interaction ID: ${interactionID}`) // Update the message
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

export const sendBookingRequestFromInquiry = (iid) => {
	return (dispatch, getState, { getFirestore }) => {
		// console.log('inside action', bookingID, interaction);
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		let interactionID = iid;
		// console.log('inside action', iid);
		firestore.collection('interactions').doc(iid).update({
			status: 'pending',
			interactionType: 'booking',
			createdAt: new Date(),
		}).then(function () {
			// console.log("Booking successfully cancelled!");
			dispatch({ type: 'SEND_BOOKING_REQ_FROM_INQUIRY', iid });
			firestore.collection('interactions').doc(interactionID).get().then(snap => {
				let int = snap.data()
				let baseUri = 'choosetobeyou.com' // change for production release
				let first_name = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
				let message_body = encodeURI(`${first_name(int.proFirstName)} has sent you a request for booking. http://${baseUri}/session/${interactionID}`) // Update the message
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
		}).catch(function (error) {
			// The document probably doesn't exist.
			// console.error("Error cancelling document: ", error);
			dispatch({ type: 'COMPLETED_ERROR', error })
		})
		// }
	}
}

export const updateSeen = (iid) => {
	return (dispatch, getState, { getFirestore }) => {
		console.log('Update Seen by user');

		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('inside action', iid);

		firestore.collection('interactions').doc(iid).update({
			update: false,

		}).then(function () {

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