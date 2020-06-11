export const createInteraction = (interaction) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		// console.log(interaction);

		firestore.collection('interactions').add({
			...interaction,
			userFirstName: profile.firstName,
			userLastName: profile.lastName,
			userUID: userID,
			userImage: profile.photoURL,
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

export const closeInquiry = (bookingID) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		// console.log('confirm book book', bookingID);

		firestore.collection('interactions').doc(bookingID).update({
			status: 'archived',
			interactionType: 'inquiry'
		})
			.then(function () {
				// console.log("Booking successfully cancelled!");
				dispatch({ type: 'CLOSE_INQUIRY', bookingID });
			})
			.catch(function (error) {
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
		// console.log('inside action', iid);

		firestore.collection('interactions').doc(iid).update({
			status: 'pending',
			interactionType: 'booking'
		}).then(function () {
			// console.log("Booking successfully cancelled!");
			dispatch({ type: 'SEND_BOOKING_REQ_FROM_INQUIRY', iid });
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
			interactionType: 'booking'
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