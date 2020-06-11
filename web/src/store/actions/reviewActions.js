export const completeReview = (review) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db

		const firestore = getFirestore()
		const profile = getState().firebase.profile
		// const authorId = getState().firebase.auth.uid

		console.log('inside review', review, profile);

		firestore.collection('reviews').doc(review.ratingID).set({
			...review,
			reviewerImage: profile.photoURL,
			reviewerFirstName: profile.firstName,
			reviewerLastName: profile.lastName,

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