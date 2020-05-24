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