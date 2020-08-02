import axios from 'axios'
import React, { Component } from "react"
import { PayPalButton } from 'react-paypal-button-v2'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import paypalConfig from '../../config/paypal.json'
import { downgrade, upgrade } from '../../store/actions/authActions'
import Modal from '../modal/Modal'


class UpgradeProPremium extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isProPremium: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.cancelSubscription = this.cancelSubscription.bind(this)
	}

	cancelSubscription = () => {
		let paypalBaseUri = 'https://api.paypal.com/';
		if (paypalConfig.sandbox) paypalBaseUri = 'https://api.sandbox.paypal.com/';

		console.log('btn clicked')
		let $this = this
		axios.post(`${paypalBaseUri}v1/oauth2/token`, "grant_type=client_credentials", {
			headers: {
				"Accept": "application/json",
				"Accept-Language": "en_US",
				'Access-Control-Allow-Origin': 'localhost:3000'
			},
			auth: {
				username: paypalConfig.client_id,
				password: paypalConfig.client_secret
			}
		}).then(response => {
			let paypal_access_token = response.data.access_token;
			let paypal_token_type = response.data.token_type;

			axios({
				url: `${paypalBaseUri}v1/billing/subscriptions/${this.props.profile.paypalPremium.id}/cancel`,
				method: 'post',
				headers: {
					"Content-Type": "application/json",
					"Authorization": `${paypal_token_type} ${paypal_access_token}`
				},
				data: { "reason": "test -- Not satisfied with the service" }
			})
				.then(res => {
					console.log(`Axios Call completed: ${res}`)
					this.setState({
						isProPremium: false,
					})
					setTimeout(function () {
						// console.log('please', $this.props, $this.state);
						$this.props.downgrade($this.state)
						document.body.style.overflow = 'unset'
						$this.props.history.push('/profile-edit')
					}, 3000)
				});
		})
	}

	handleSubmit = (details, data) => {
		console.log("nnn", details)
		let $this = this
		this.setState({
			isProPremium: true,
			paypalPremium: {
				billing_info: {
					next_billing_time: details.billing_info.next_billing_time
				},
				timeCreated: details.create_time,
				id: details.id,
				plan_id: details.plan_id,
				email: details.subscriber.email_address,
				firstName: details.subscriber.name.given_name,
				lastName: details.subscriber.name.surname,
				payerID: details.subscriber.payer_id,
				status: details.status,
				billingToken: data.billingToken,
				facilitatorAccessToken: data.facilitatorAccessToken,
				orderID: data.orderID,
				subscriptionID: data.subscriptionID
			}
		})

		setTimeout(function () {
			// console.log('please', $this.props, $this.state);
			$this.props.upgrade($this.state)
			document.body.style.overflow = 'unset'
			$this.props.history.push('/profile-edit')
		}, 3000)
	}

	render() {
		const { handleSubmit } = this
		return (
			<div className={'pro-premium'}>
				<h3>Pro Premium</h3>
				<p>You are currently <strong>{this.props.profile.isProPremium ? 'enrolled' : 'not enrolled'}</strong> in the Pro Premium program.</p>
				{this.props.profile.isProPremium ?
					<Modal
						buttonText={'Downgrade'}
						buttonStyle={'button button--md button--secondary'}
						content={(
							<>
								<h2>Confirm Downgrade</h2>
								<button class="button button--md button--primary" onClick={this.cancelSubscription}>Downgrade</button>
							</>
						)}
					/>
					:
					<Modal
						buttonText={'Upgrade'}
						buttonStyle={'button button--md button--secondary'}
						content={(
							<>
								<h2>Confirm Upgrade</h2>
								<p>Upgrade today to add the following features to your profile:</p>
								<ul>
									<li>Website / Social Links</li>
									<li>Recognition</li>
									<li>Additional Photos and Videos</li>
									<li>Additional Client Leads</li>
								</ul>
								<PayPalButton
									options={{
										clientId: paypalConfig.client_id,
										vault: true
									}}
									createSubscription={(data, actions) => {
										return actions.subscription.create({
											// plan_id: 'PROD-97A271950K7441738' // This has the product ID instead of plan ID
											plan_id: paypalConfig.plan_id
										});
									}}
									onApprove={(data, actions) => {
										// Capture the funds from the transaction
										return actions.subscription.get().then(function (details) {
											// console.log(details, data);
											handleSubmit(details, data)
										});
									}}
								/>
							</>
						)}
					/>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		// projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		// notifications: state.firestore.ordered.notifications,
		profile: state.firebase.profile,
		settings: state.firebase.settings
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		upgrade: (upgradeParams) => dispatch(upgrade(upgradeParams)),
		downgrade: (downgradeParams) => dispatch(downgrade(downgradeParams))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpgradeProPremium))
