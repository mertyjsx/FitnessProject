import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import interactionReducer from './interactionReducer'

const rootReducer = combineReducers({
	auth: authReducer,
	project: projectReducer,
	interaction: interactionReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
})

export default rootReducer