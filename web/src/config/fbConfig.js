import firebase, { firestore, storage } from 'firebase/app'
import * as firebaseRoot from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = require('./firebase.json');

const settings = {

}

firebase.initializeApp(firebaseConfig)
firestore().settings(settings)

// const db = firebase.firestore();

export default firebase
export const db = firebase.firestore();
export const auth = firebase.auth;
export const rtdb = firebaseRoot.database();
export const fileStorage = firebase.storage()
