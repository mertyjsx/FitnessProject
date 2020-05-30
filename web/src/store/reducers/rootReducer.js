import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import interactionReducer from './interactionReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	project: projectReducer,
	interaction: interactionReducer,
	profile: profileReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
})

export default rootReducer