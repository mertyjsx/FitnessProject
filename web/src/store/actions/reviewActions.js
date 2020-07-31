import axios from 'axios';


export const completeReview = (review, phoneNumber) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// Make async call to db

		const firestore = getFirestore()
		const profile = getState().firebase.profile
		// const authorId = getState().firebase.auth.uid
		const twilio = require('twilio');
		const twilioConfig = require('../../config/twilio.json')

		let phoneNumber0 = `+1${phoneNumber}`
		console.log("phonenumber", phoneNumber)


		firestore.collection('reviews').doc(review.ratingID).set({
			...review,
			reviewerImage: profile.photoURL,
			reviewerFirstName: profile.firstName,
			reviewerLastName: profile.lastName,

		}).then(() => {
			firestore.collection('interactions').doc(review.ratingID).update({
				ratingCompleted: true
			})


			//sending text message

			let message_body = encodeURI(`You got a ${review.rating} star review by ${profile.firstName} on ChooseToBeYou.com`) // Update the message

			let from_number = encodeURI("+17865749377") // Update from number
			let to_number = encodeURI(phoneNumber0) // Pro or Client number

			axios.post(`https://api.twilio.com/2010-04-01/Accounts/${twilioConfig.account_sid}/Messages.json`,
				`Body=${message_body}&From=${from_number}&To=${to_number}`,
				{
					auth: {
						username: twilioConfig.account_sid,
						password: twilioConfig.auth_token
					},
					headers: {
						accept: "application/json"
					}
				}).then(response => {
					console.log(response)
				})





			dispatch({ type: 'CREATE_REVIEW', review });
		}).catch((error) => {
			dispatch({ type: 'CREATE_REVIEW_ERROR', error })
		})
	}
}