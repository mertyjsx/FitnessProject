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
			createdAt: new Date()
		}).then(() => {
			console.log('success');
			dispatch({ type: 'CREATE_INTERACTION', interaction });
		}).catch((error) => {
			console.log('nah');
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
			interactionType: 'booked'
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
			interactionType: 'booked'
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