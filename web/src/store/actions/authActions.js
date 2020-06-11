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
			return firestore.collection('users').doc(response.user.uid).set({
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				initials: newUser.firstName[0] + newUser.lastName[0],
				isPro: false,
				isProPremium: false,
				emailVerified: false
			})
		}).then(() => {
			dispatch({ type: 'SIGNUP_SUCCESS' })
			// return firebase.doSendEmailVerification()
		}).catch(err => {
			dispatch({ type: 'SIGNUP_ERROR', err })
		})
	}
}

export const signUpPro = (newUser, props) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		// console.log(newUser);
		firebase.auth().createUserWithEmailAndPassword(
			newUser.email, newUser.password
		).then((response) => {
			// console.log('chef', newUser, newUser.professionChef);
			return firestore.collection('users').doc(response.user.uid).set({
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				initials: newUser.firstName[0] + newUser.lastName[0],
				city: newUser.city,
				state: newUser.state,
				zip: newUser.zip,
				isPro: true,
				isProPremium: false,
				isApproved: false,
				uid: response.user.uid,
				onboardingCompleted: false,
				proInteractions: [],
				professions: {
					chef: newUser.professionChef,
					fitnessTrainer: newUser.professionFitnessTrainer,
					massageTherapist: newUser.professionMassageTherapist,
					nutritionist: newUser.professionNutritionist
				}
			})
		}).then(() => {
			dispatch({ type: 'SIGNUP_SUCCESS' })
		}).catch(err => {
			dispatch({ type: 'SIGNUP_ERROR', err })
		})
	}
}

export const completeOnboarding = (newInfo) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const userID = getState().firebase.auth.uid

		console.log(newInfo);
		firestore.collection('users').doc(userID).update({
			...newInfo,
		})
			.then(function () {
				// console.log("Booking successfully cancelled!");
				dispatch({ type: 'CLOSE_INQUIRY', newInfo });
			})
			.catch(function (error) {
				// The document probably doesn't exist.
				// console.error("Error cancelling document: ", error);
				dispatch({ type: 'CLOSE_INQUIRY_ERROR', newInfo })
			})
	}
}

export const deleteAccount = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const user = firebase.auth().currentUser
		// console.log(user);
		user.delete().then((response) => {
			// User deleted
			console.log(response);
		}).catch(err => {
			// user error
			dispatch({ type: 'SIGNUP_ERROR', err })
		})
	}
}

export const upgrade = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const user = firebase.auth().currentUser
		console.log('upgrade called');
		// user.delete().then((response) => {
		// 	// User deleted
		// 	console.log(response);
		// }).catch(err => {
		// 	// user error
		// 	dispatch({ type: 'SIGNUP_ERROR', err })
		// })
	}
}

