export const createSearch = (user) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		const firestore = getFirestore()
		const profile = getState().firebase.profile
		const authorId = getState().firebase.auth.uid

		firestore.collection('users').add({
			...user
		}).then(() => {
			dispatch({ type: 'CREATE_SEARCH', user });
		}).catch((error) => {
			dispatch({ type: 'CREATE_SEARCH_ERROR', error })
		})
	}
}