import axios from 'axios';
import { db } from "../../config/fbConfig";
const twilio = require('twilio');
const twilioConfig = require('../../config/twilio.json')

export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()

		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: 'LOGIN_SUCCESS' })
		}).catch((err) => {
			dispatch({ type: 'LOGIN_ERROR', err })
		})
	};
}

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()
		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' })
		})
	}
}

export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((response) => {
			const currentUser = response.user
			// console.log('current user', currentUser);

			currentUser.sendEmailVerification()
				.then(function () {
					dispatch({ type: 'SIGNUP_SUCCESS' });
					// Email sent.
					return firestore.collection('users').doc(response.user.uid).set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						initials: newUser.firstName[0] + newUser.lastName[0],
						phoneNumber: newUser.phoneNumber,
						isPro: false,
						isProPremium: false,
						emailVerified: false
					})
				}).catch(function (error) {
					// An error happened.
					console.log('error');
				});
		}).catch(err => {
			dispatch({ type: 'SIGNUP_ERROR', err })
		})
	}
}


export const resendEmail = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const currentUser = firebase.auth().currentUser
		// console.log(currentUser)
		// console.log('current user', currentUser);
		currentUser.sendEmailVerification()
			.then(function () {
				dispatch({ type: 'SIGNUP_SUCCESS' });
				// Email sent.
			}).catch(function (error) {
				// An error happened.
				console.log('error');
			});
	}
}

export const signInClientWithFacebook = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const fb = new firebase.auth.FacebookAuthProvider()
		// console.log('su w/ fb', newUser, fb )
		firebase.auth().signInWithPopup(fb)
			.then(async ({ user }) => {

				console.log(user.uid)
				const userExist = await db.collection('users').doc(user.uid).get()

				if (userExist.exists) {

					dispatch({ type: 'LOGIN_SUCCESS' })

				} else {

					user.sendEmailVerification()
						.then(function () {
							dispatch({ type: 'SIGNUP_SUCCESS' });
							return firestore.collection('users').doc(user.uid).set({
								firstName: user.displayName,
								initials: user.displayName[0] + user.displayName[1],
								isPro: false,
								photoURL: user.photoURL,
								isProPremium: false,
								emailVerified: false,
								googleOrFacebook: true
							})
						}).catch(err => {
							dispatch({ type: 'SIGNUP_ERROR', err })
						})


				}

				// console.log('fb', user);

			}).catch(err => {
				dispatch({ type: 'LOGIN_ERROR', err })
			})
	}
}

export const signUpClientWithFacebook = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const fb = new firebase.auth.FacebookAuthProvider()
		// console.log('su w/ fb', newUser, fb )
		firebase.auth().signInWithPopup(fb)
			.then(async ({ user }) => {

				console.log(user.uid)
				const userExist = await db.collection('users').doc(user.uid).get()

				if (userExist.exists) {

					dispatch({ type: 'LOGIN_SUCCESS' })

				} else {

					user.sendEmailVerification()
						.then(function () {
							dispatch({ type: 'SIGNUP_SUCCESS' });
							return firestore.collection('users').doc(user.uid).set({
								firstName: user.displayName,
								initials: user.displayName[0] + user.displayName[1],
								isPro: false,
								photoURL: user.photoURL,
								isProPremium: false,
								emailVerified: false,
								googleOrFacebook: true
							})
						}).catch(err => {
							dispatch({ type: 'SIGNUP_ERROR', err })
						})


				}

				// console.log('fb', user);

			}).catch(err => {
				dispatch({ type: 'LOGIN_ERROR', err })
			})
	}
}

export const signUpClientWithGoogle = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const google = new firebase.auth.GoogleAuthProvider()
		// console.log('su w/ fb', newUser, fb )
		firebase.auth().signInWithPopup(google)
			.then(async (result) => {
				console.log('google', result);
				console.log(result.user.uid)
				const userExist = await db.collection('users').doc(result.user.uid).get()
				// console.log(userExist.exists)
				if (userExist.exists) {
					console.log(userExist)
					dispatch({ type: 'LOGIN_SUCCESS' })
				} else {
					var token = result.credential.accessToken
					var user = result.user
					var user_id = result.user.uid
					var user_first_name = result.additionalUserInfo.profile.given_name
					var user_last_name = result.additionalUserInfo.profile.family_name
					var user_image_url = result.additionalUserInfo.profile.picture
					var user_creation_time = result.user.creationTime

					user.sendEmailVerification()
						.then(function () {
							dispatch({ type: 'SIGNUP_SUCCESS' });
							return firestore.collection('users').doc(user_id).set({
								firstName: user_first_name,
								lastName: user_last_name,
								initials: user_first_name[0] + user_last_name[0],
								isPro: false,
								photoURL: user_image_url,
								isProPremium: false,
								emailVerified: false,
								googleOrFacebook: true
							})
						}).catch(err => {
							dispatch({ type: 'SIGNUP_ERROR', err })
						})
				}
			}).catch(err => {
				dispatch({ type: 'LOGIN_ERROR', err })
			})
	}
}

export const signInClientWithGoogle = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const google = new firebase.auth.GoogleAuthProvider()
		// console.log('su w/ fb', newUser, fb )
		firebase.auth().signInWithPopup(google)
			.then(async (result) => {
				// console.log('google', result);
				// console.log(result.user.uid)
				const userExist = await db.collection('users').doc(result.user.uid).get()
				console.log(userExist.exists)
				if (userExist.exists) {
					// console.log(userExist)
					dispatch({ type: 'LOGIN_SUCCESS' })
				} else {
					var token = result.credential.accessToken
					var user = result.user
					var user_id = result.user.uid
					var user_first_name = result.additionalUserInfo.profile.given_name
					var user_last_name = result.additionalUserInfo.profile.family_name
					var user_image_url = result.additionalUserInfo.profile.picture
					var user_creation_time = result.user.creationTime
					user.sendEmailVerification()
						.then(function () {
							dispatch({ type: 'SIGNUP_SUCCESS' });
							return firestore.collection('users').doc(user_id).set({
								firstName: user_first_name,
								lastName: user_last_name,
								initials: user_first_name[0] + user_last_name[0],
								isPro: false,
								photoURL: user_image_url,
								isProPremium: false,
								emailVerified: false,
								googleOrFacebook: true
							})
						}).catch(err => {
							dispatch({ type: 'SIGNUP_ERROR', err })
						})
				}
			}).catch(err => {
				dispatch({ type: 'LOGIN_ERROR', err })
			})
	}
}

export const ClientToPro = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		// console.log('in action', newUser);
		const userID = getState().firebase.auth.uid
		// console.log(newUser)
		// console.log(userID)
		firestore.collection('users').doc(userID).set({
			phoneNumber: newUser.phoneNumber,
			personalCity: newUser.city,
			personalState: newUser.state,
			personalZip: newUser.zip,
			isPro: true,
			isProPremium: false,
			isApproved: false,
			onboardingCompleted: false,
			proInteractions: [],
			uid: userID,
			professions: {
				chef: newUser.professionChef,
				fitnessTrainer: newUser.professionFitnessTrainer,
				massageTherapist: newUser.professionMassageTherapist,
				nutritionist: newUser.professionNutritionist
			}
		}, { merge: true })
	}
}

export const signUpPro = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		// console.log('in action', newUser);
		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((response) => {
			const currentUser = response.user
			const newUserID = response.user.uid

			// console.log('the response', response);

			currentUser.sendEmailVerification()
				.then(function () {
					return firestore.collection('users').doc(newUserID).set({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						phoneNumber: newUser.phoneNumber,
						initials: newUser.firstName[0] + newUser.lastName[0],
						personalCity: newUser.city,
						personalState: newUser.state,
						personalZip: newUser.zip,
						isPro: true,
						isProPremium: false,
						isApproved: false,
						uid: response.user.uid,
						isOnboardingClientCompleted: true,
						onboardingCompleted: false,
						proInteractions: [],
						professions: {
							chef: newUser.professionChef,
							fitnessTrainer: newUser.professionFitnessTrainer,
							massageTherapist: newUser.professionMassageTherapist,
							nutritionist: newUser.professionNutritionist
						}
					})
				}).catch(function (error) {
					// An error happened.
					console.log('error');
				});
			// dispatch({ type: 'SIGNUP_SUCCESS' })

		}).catch(err => {
			dispatch({ type: 'SIGNUP_ERROR', err })
		})
	}
}

export const completeOnboarding = (newInfo, isDeclined) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const userID = getState().firebase.auth.uid
		const currentUser = firebase.auth().currentUser;


		console.log(isDeclined)
		if (isDeclined) {
			console.log("resubmit")
			//resubmit
			firestore.collection('users').doc(userID).update({
				...newInfo,
				declineMessage: "",
				reSubmit: true,
				declineMessage: "",
				isDeclined: false

			})
				.then(function () {
					// console.log("Booking successfully cancelled!");
					//	currentUser.sendEmailVerification().then(function () {
					// Email sent.
					dispatch({ type: 'CLOSE_INQUIRY', newInfo });
					//}).catch(function (error) {
					// An error happened.
					//		console.log('error');
					//	});
				})
				.catch(function (error) {
					// The document probably doesn't exist.
					// console.error("Error cancelling document: ", error);
					dispatch({ type: 'CLOSE_INQUIRY_ERROR', newInfo })
				})
		} else {
			//firstsubmit
			console.log("first submit")
			firestore.collection('users').doc(userID).update({
				...newInfo,
				declineMessage: ""
			})
				.then(function () {
					// console.log("Booking successfully cancelled!");
					//	currentUser.sendEmailVerification().then(function () {
					// Email sent.
					dispatch({ type: 'CLOSE_INQUIRY', newInfo });
					//}).catch(function (error) {
					// An error happened.
					//		console.log('error');
					//	});
				})
				.catch(function (error) {
					// The document probably doesn't exist.
					// console.error("Error cancelling document: ", error);
					dispatch({ type: 'CLOSE_INQUIRY_ERROR', newInfo })
				})
		}
	}
}

export const completeOnboardingClient = (newInfo) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const userID = getState().firebase.auth.uid
		//firstsubmit
		// console.log("first submit")
		firestore.collection('users').doc(userID).update({
			...newInfo,
			isOnboardingClientCompleted: true
		})
			.then(function () {
				// console.log("Booking successfully cancelled!");
				//	currentUser.sendEmailVerification().then(function () {
				// Email sent.
				dispatch({ type: 'CLOSE_INQUIRY', newInfo });
			})
			.catch(function (error) {
				// The document probably doesn't exist.
				// console.error("Error cancelling document: ", error);
				dispatch({ type: 'CLOSE_INQUIRY_ERROR', newInfo })
			})
	}
}

export const passwordReset = (email) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const currentUser = firebase.auth();
		console.log('action', email);

		currentUser.sendPasswordResetEmail(email).then(function () {
			// Email sent.
			console.log('Reset password sent');

		}).catch(function (error) {
			// An error happened.
			console.log('error', error);

		});
	}
}

export const deleteAccount = (password) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const user = firebase.auth().currentUser
		var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
		user.reauthenticateWithCredential(credential).then(function () {
			// User re-authenticated.
			user.delete().then((response) => {
				// User deleted
				console.log(response);
			}).catch(err => {
				// user error
				dispatch({ type: 'SIGNUP_ERROR', err })
			})
		}).catch(function (error) {
			// An error happened.
		});
	}
}

export const onboardingAgain = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const user = firebase.auth().currentUser
		const firestore = getFirestore()
		// console.log(user);
		firestore.collection('users').doc(user.uid).update({
			onboardingCompleted: false
		})
			.then(function () {
				// console.log("Booking successfully cancelled!");
				//	currentUser.sendEmailVerification().then(function () {
				// Email sent.
				console.log("onboarding : false")
				//}).catch(function (error) {
				// An error happened.
				//		console.log('error');
				//	});
			})
			.catch(function (error) {
				// The document probably doesn't exist.
				// console.error("Error cancelling document: ", error);
				console.log(error)
			})

	}

}



export const upgrade = (upgradeParams) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore()
		const userID = getState().firebase.auth.uid

		console.log('upgrade called', upgradeParams);

		firestore.collection('users').doc(userID).update({
			...upgradeParams,
		}).then(() => {
			console.log('success');
			dispatch({ type: 'CREATE_INTERACTION', upgradeParams });
		}).catch((error) => {
			console.log('nah');
			dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		})
	}
}

export const downgrade = (downgradeParams) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore()
		const userID = getState().firebase.auth.uid

		console.log('downgrade called', downgradeParams);

		firestore.collection('users').doc(userID).update({
			...downgradeParams,
		}).then(() => {
			console.log('success');
			dispatch({ type: 'CREATE_INTERACTION', downgradeParams });
		}).catch((error) => {
			console.log('nah');
			dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		})
	}
}

export const approveProfile = (proUID) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore()
		const userID = proUID
		console.log('approval called', proUID);
		firestore.collection('users').doc(userID).update({
			isApproved: true,
		}).then(async () => {
			const ref = await firestore.collection('users').doc(userID).get()
			let data = ref.data()
			let phoneNumber = `+1${data.phoneNumber}`
			// console.log("phonenumber", phoneNumber)
			let firstName = data.firstName
			// console.log(firstName)
			// change for production release
			let message_body = encodeURI(`${firstName}, your profile has been approved and is now searchable on ChooseToBeYou.com`) // Update the message
			let from_number = encodeURI("+17865749377") // Update from number
			let to_number = encodeURI(phoneNumber) // Pro's number
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


		}).catch((error) => {
			console.log('nah');

		})
	}
}

export const declineProfile = (proUID, message) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore()
		console.log(proUID)
		console.log(message)
		firestore.collection('users').doc(proUID).update({
			isApproved: false,
			declineMessage: message,
			isDeclined: true
		}).then(async () => {
			console.log('success');
			dispatch({ type: 'DECLINE_INTERACTION', proUID });

			// Send Message
			const ref = await firestore.collection('users').doc(proUID).get()
			let data = ref.data()
			let phoneNumber = `+1${data.phoneNumber}`
			let firstName = data.firstName
			let message_body = encodeURI(`${firstName}, your profile has been declined. Visit your profile for details and resubmit.`) // Update the message
			let from_number = encodeURI("+17865749377") // Update from number
			let to_number = encodeURI(phoneNumber) // Pro's number
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
		}).catch((error) => {
			console.log('nah');
			dispatch({ type: 'DECLINE_INTERACTION_ERROR', error })
		})
	}
}

