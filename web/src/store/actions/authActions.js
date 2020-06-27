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

export const signUpClientWithFacebook = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase()
		const firestore = getFirestore()
		const google = new firebase.auth.GoogleAuthProvider()
		const fb = new firebase.auth.FacebookAuthProvider()
		// console.log('su w/ fb', newUser, fb )
		firebase.auth().signInWithPopup(fb)
			.then(({ user }) => {
				console.log('fb', user);
				
				// return firestore.collection('users').doc(user.uid).set({
				// 	firstName: newUser.firstName,
				// 	lastName: newUser.lastName,
				// 	initials: newUser.firstName[0] + newUser.lastName[0],
				// 	isPro: false,
				// 	isProPremium: false,
				// 	emailVerified: false
				// })
			}).catch(err => {
				dispatch({ type: 'SIGNUP_ERROR', err})
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
				phoneNumber: newUser.phoneNumber,
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
		const currentUser = firebase.auth().currentUser;

		console.log(newInfo);
		firestore.collection('users').doc(userID).update({
			...newInfo,
		})
			.then(function () {
				// console.log("Booking successfully cancelled!");
				currentUser.sendEmailVerification().then(function () {
					// Email sent.
					dispatch({ type: 'CLOSE_INQUIRY', newInfo });
				}).catch(function (error) {
					// An error happened.
					console.log('error');
				});
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
		}).then(() => {
			console.log('success');
			dispatch({ type: 'CREATE_INTERACTION', proUID });
		}).catch((error) => {
			console.log('nah');
			dispatch({ type: 'CREATE_INTERACTION_ERROR', error })
		})
	}
}

