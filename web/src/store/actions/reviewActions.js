export const completeReview = (review) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db
		console.log('inside review', review);

		const firestore = getFirestore()
		// const profile = getState().firebase.profile
		// const authorId = getState().firebase.auth.uid

		firestore.collection('reviews').doc(review.ratingID).set({
			...review
		}).then(() => {
			firestore.collection('interactions').doc(review.ratingID).update({
				ratingCompleted: true
			})
			dispatch({ type: 'CREATE_REVIEW', review });
		}).catch((error) => {
			dispatch({ type: 'CREATE_REVIEW_ERROR', error })
		})
	}
}