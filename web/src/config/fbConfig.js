import firebase, { firestore, storage } from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyCKrYOJtO13QZpDQxU1TRKA01N966mDKnU",
	authDomain: "choose-to-be-fit.firebaseapp.com",
	databaseURL: "https://choose-to-be-fit.firebaseio.com",
	projectId: "choose-to-be-fit",
	storageBucket: "choose-to-be-fit.appspot.com",
	messagingSenderId: "840888064186",
	appId: "1:840888064186:web:24f708ed9b37dc3f23ca83",
	measurementId: "G-G3ZPHNCRZH"
}

const settings = {
	// timestampsInSnapshots: true
}


firebase.initializeApp(firebaseConfig)
firestore().settings(settings)

export default firebase