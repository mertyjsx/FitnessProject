export const updateSpecialties = (specialties) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('update action spec called', specialties);
		firestore.collection('users').doc(userID).update({
			...specialties,
		}).then(() => {
			dispatch({ type: 'UPDATE_SPECIALTIES', specialties });
		}).catch((error) => {
			dispatch({ type: 'UPDATE_SPECIALTIES_ERROR', error })
		})
	}
}

export const updateGoals = (goals) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('update action spec called', specialties);
		firestore.collection('users').doc(userID).update({
			...goals,
		}).then(() => {
			dispatch({ type: 'UPDATE_GOALS', goals });
		}).catch((error) => {
			dispatch({ type: 'UPDATE_GOALS_ERROR', error })
		})
	}
}

export const updateProfile = (profileDetails) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid
		// console.log('update action spec called', profileDetails, userID);
		firestore.collection('users').doc(userID).update({
			...profileDetails,
		}).then(() => {
			console.log('success');
			dispatch({ type: 'CREATE_INTERACTION', profileDetails });
		}).catch((error) => {
			console.log('nah');
			dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		})
	}
}

export const updateCalendar = (cal) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const userID = getState().firebase.auth.uid

		console.log('update cal spec called', cal, userID);
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