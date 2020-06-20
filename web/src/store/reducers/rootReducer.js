import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import interactionReducer from './interactionReducer'
import profileReducer from './profileReducer'
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