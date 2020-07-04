export const updateQuote = (quote) => {
     return (dispatch, getState, { getFirebase, getFirestore }) => {
          // Make async call to db

          const firestore = getFirestore()
          const profile = getState().firebase.profile
          // const authorId = getState().firebase.auth.uid

          console.log('update quote', quote);

          // firestore.collection('reviews').doc(review.ratingID).set({
          // 	...review,
          // 	reviewerImage: profile.photoURL,
          // 	reviewerFirstName: profile.firstName,
          // 	reviewerLastName: profile.lastName,

          // }).then(() => {
          // 	firestore.collection('interactions').doc(review.ratingID).update({
          // 		ratingCompleted: true
          // 	})
          // 	dispatch({ type: 'UPDATE_QUOTE', quote });
          // }).catch((error) => {
          // 	dispatch({ type: 'UPDATE_QUOTE_ERROR', error })
          // })
     }
}