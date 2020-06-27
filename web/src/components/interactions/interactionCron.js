import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect, getFirebase } from 'react-redux-firebase'
import { compose } from 'redux'
import PaypalConfig from '../../config/paypal.json'
import { completeInteractionPayout } from '../../store/actions/interactionActions'


// Real setup //
let interactionCompletionTime = 1000*60*60*48 // 48 hours;
let payoutDelayTime = 1000*60*60*24*7 // 7 days;
// End Real setup //

// Development Setup //
// let interactionCompletionTime = 1000*60*15 // auto Complete in 15 minutes;
// let payoutDelayTime = 1000*60*15 // auto payout in 15 minutes;
// End Development Setup //

let payoutrate = 0.75; // 75%

const mapDispatchToProps = (dispatch) => {
	return {
		completeInteractionPayout: (interaction) => dispatch(completeInteractionPayout(interaction))
	}
}

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
	},mapDispatchToProps)
)((props)=>{
	const { interactions, auth, users } = props;
	let status = "";

	if (interactions && users) {
		status = "running";
		for (let id in interactions) {
			let interaction = interactions[id];
			let firebase = getFirebase();
			// console.log(interaction)

			if (interaction && interaction.status == 'completed' && interaction.endTime + payoutDelayTime >= new Date().getTime()) {
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
				   				// props.completeInteractionPayout(id);
				   			}
				   		})
				   })
			}
		}
	} else {

	}

	return (<div className={"cron " + status}></div>);
});