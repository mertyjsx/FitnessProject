export const completeReview = (review, iid) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		console.log('inside review', review, iid);

		// const firestore = getFirestore()
		// const profile = getState().firebase.profile
		// const authorId = getState().firebase.auth.uid

		// firestore.collection('users').add({
		// 	...user
		// }).then(() => {
		// 	dispatch({ type: 'CREATE_REVIEW', user });
		// }).catch((error) => {
		// 	dispatch({ type: 'CREATE_REVIEW_ERROR', error })
		// })
	}
}