import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import PaypalConfig from '../../config/paypal.json'
import { completeInteractionPayout, getInteractionsForCron, getProForPayout } from '../../store/actions/interactionActions'


// Real setup //
// let interactionCompletionTime = 1000 * 60 * 60 * 48 // 48 hours;
// let payoutDelayTime = 1000 * 60 * 60 * 24 * 7 // 7 days;
// End Real setup //

// Development Setup //
let interactionCompletionTime = 1000 * 60 * 15 // auto Complete in 15 minutes;
let payoutDelayTime = 1000 * 60 * 15 // auto payout in 15 minutes;
// End Development Setup //

let payoutrate = 0.75; // 75%

const mapDispatchToProps = (dispatch) => {
	return {
		getInteractionsForCron: () => dispatch(getInteractionsForCron()),
		completeInteractionPayout: (iid) => dispatch(completeInteractionPayout(iid)),
		getProForPayout: (uid) => dispatch(getProForPayout(uid))
	}
}

class InteractionCron extends React.Component {
	construct = (props) => {
		this.state({ firestoreLoaded: false })
	}

	render = () => {
		let promise = this.props.getInteractionsForCron()
		let $this = this

		promise.then(snap => {
			let interactions = {}, paypal_payout_items = []
			snap.docs.map(doc => { interactions[doc.id] = doc.data() })
			let paypal_base_uri = 'https://api.paypal.com/'
			if (PaypalConfig.sandbox) paypal_base_uri = 'https://api.sandbox.paypal.com/'

			for (let id in interactions) {
				let interaction = interactions[id]

				if (interaction && interaction.status == 'completed' && interaction.endTime + payoutDelayTime <= new Date().getTime()) {
					$this.props.getProForPayout(interaction.proUID).then(data => {
						let pro = data.data()

						if (interaction.total * payoutrate > 0) {
							paypal_payout_items.push({
								"recipient_type": "EMAIL",
								"amount": {
									"value": interaction.total * payoutrate,
									"currency": "USD"
								},
								"note": "This is a test message", // Update for paypal invoice message
								"sender_item_id": new Date().getTime(),
								"receiver":pro.email,
								"notification_language": "en-US",
							})
						}
					})
				}
			}

			axios.post(paypal_base_uri + 'v1/oauth2/token',
				"grant_type=client_credentials",
				{
					"headers": {
						"Accept": "application/json",
						"Accept-Language": "en_US",
						'Access-Control-Allow-Origin': 'localhost:3000'
					},
					// "withCredentials": true,
					"auth": {
						"username": PaypalConfig.client_id,
						"password": PaypalConfig.client_secret
					}
				}).then((response) => {
					let paypal_access_token = response.data.access_token;
					let paypal_token_type = response.data.token_type;

					axios.post(`${paypal_base_uri}v1/payments/payouts`,
						{
							"sender_batch_header": {
								"sender_batch_id": "CTBY_" + new Date().getFullYear() + "_" + new Date().getTime(),
								"email_subject": "CTBY Payout", // Update email subject
								"email_message": "You have recieved a payment from CTBY" // Update email message
							},
							"items": paypal_payout_items,

						},
						{
							headers: {
								"Content-Type": "application/json",
								"Authorization": `${paypal_token_type} ${paypal_access_token}`
							},
						})
				})
		})

		return (<div className="cron-running"></div>)
	}
}

export default connect(null, mapDispatchToProps)(InteractionCron)
