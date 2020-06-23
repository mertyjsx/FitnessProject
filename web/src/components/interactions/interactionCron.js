import React from 'react'
import { connect } from 'react-redux'
import { firestore, firestoreConnect, getFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import SetRating from '../rating/SetRating'
import Loading from '../modules/Loading'
import {
	updateInteractionToBooked,
	cancelBookingInteraction,
	closeInquiry,
	completeInteraction,
	confirmBookingInteraction,
	sendBookingRequestFromInquiry
} from '../../store/actions/interactionActions'
import InteractionMessages from './InteractionMessages'
import { renderProfileImage } from '../helpers/HelpersProfile'
import axios from 'axios'

import PaypalConfig from '../../config/paypal.json';

// Real setup //
// let interactionCompletionTime = 1000*60*60*48 // 48 hours;
// let payoutDelayTime = 1000*60*60*24*7 // 7 days;
// End Real setup //

// Development Setup //
let interactionCompletionTime = 1000*60*15 // auto Complete in 15 minutes;
let payoutDelayTime = 1000*60*15 // auto payout in 15 minutes;
// End Development Setup //

let payoutrate = 0.75;

export default compose(
	firestoreConnect([
		{ 
			collection: 'interactions',
			where:[
				['status','==','completed']
			// 	// ['endTime','!=',''],
			// 	['endTime','>=',payoutDelayTime],
			]
		},
		{
			collection: 'users'
		}
	]),
	connect((state) => {
		let interactions = state.firestore.data.interactions;
		let users = state.firestore.data.users;

		// console.log(users);

		return {
			interactions: interactions,
			auth: state.firebase.auth,
			users: users
		}
	})
)((props)=>{
	const { interactions, auth, users } = props;
	if (interactions && users) {
		for (let id in interactions) {
			let interaction = interactions[id];
			let firebase = getFirebase();

			if (interaction.status == 'completed' && interaction.endTime + payoutDelayTime >= new Date().getTime()) {
				let paypal_base_uri = `https://api.paypal.com/`;
				if (PaypalConfig.sandbox) paypal_base_uri = `https://api.sandbox.paypal.com/`;
				axios.post(paypal_base_uri + 'v1/oauth2/token',
				   "grant_type=client_credentials",
				   {
				   	  "headers": {
				   	  		"Accept" : "application/json",
				   	  		"Accept-Language" : "en_US",
				   	  		'Access-Control-Allow-Origin': 'localhost:3000'
				   	  },
				   	  // "withCredentials": true,
				   	  "auth":{
				   	  	"username":PaypalConfig.client_id,
				   	  	"password":PaypalConfig.client_secret
				   	  }
				   }).then((response)=>{
				   		let paypal_access_token = response.data.access_token;
				   		let paypal_token_type = response.data.token_type;
				   		let paypalid = interaction.paypal.id;
				   		let year = new Date().getFullYear();

				   		// console.log(interaction.proUID);
				   		let pro = users[interaction.proUID];
				   		// console.log(pro);

				   		axios.post(paypal_base_uri + 'v1/payments/payouts',{
				   			"sender_batch_header":{
				   				"sender_batch_id":"CTBY_" +year+ "_" + new Date().getTime(),
				   				"email_subject":"CTBY Payout",
				   				"email_message":"This is a test message."
				   			},
				   			"items":[
				   				{
				   					"recipient_type":"EMAIL",
				   					"amount":{
				   						"value":interaction.total * payoutrate,
				   						"currency":"USD"
				   					},
				   					"note":"This is a test message",
				   					"sender_item_id":new Date().getTime(),
				   					"receiver":pro.paypalPremium.email,
				   					"notification_language":"en-US"
				   				}
				   			]
				   		},{
				   			"headers":{
					   			"Content-Type":"application/json",
				   				"Authorization":`${paypal_token_type} ${paypal_access_token}`
				   			}
				   		}).then((response)=>{
				   			if (response.data.hasOwnProperty('batch_header')) {
				   				// TODO: update booking status
				   			}
				   		})
				   })
			}
		}
	} else {

	}

	return (<></>);
});