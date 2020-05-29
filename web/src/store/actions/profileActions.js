export const updateSpecialties = (specialties) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		console.log('update action spec called', specialties);

		// firestore.collection('interactions').add({
		// 	...interaction,
		// 	userFirstName: profile.firstName,
		// 	userLastName: profile.lastName,
		// 	userUID: userID,
		// 	createdAt: new Date()
		// }).then(() => {
		// 	console.log('success');
		// 	dispatch({ type: 'CREATE_INTERACTION', interaction });
		// }).catch((error) => {
		// 	console.log('nah');
		// 	dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		// })
	}
}

export const updateProfile = (profileDetails) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		console.log('update action spec called', profileDetails);

		// firestore.collection('users').doc(userID).update({
		// 	...profileDetails,
		// }).then(() => {
		// 	console.log('success');
		// 	dispatch({ type: 'CREATE_INTERACTION', profileDetails });
		// }).catch((error) => {
		// 	console.log('nah');
		// 	dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		// })
	}
}