import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import authReducer from './authReducer'
import interactionReducer from './interactionReducer'
import profileReducer from './profileReducer'
import projectReducer from './projectReducer'
import reviewReducer from './reviewReducer'
import settingsReducer from './settingsReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	interaction: interactionReducer,
	profile: profileReducer,
	project: projectReducer,
	review: reviewReducer,
	settings: settingsReducer
})

export default rootReducer