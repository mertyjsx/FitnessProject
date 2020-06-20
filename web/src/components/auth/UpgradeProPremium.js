import React, { Component } from "react"
import { Button } from "semantic-ui-react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { upgrade, downgrade } from '../../store/actions/authActions'
import Modal from '../modal/Modal'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'

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
		console.log('btn clicked')
		let $this = this
		axios({
			url: `https://api.paypal.com/v1/billing/subscriptions/${this.props.profile.paypalPremium.id}/cancel`,
			method: 'post',
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${this.props.profile.paypalPremium.facilitatorAccessToken}`
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
	}

	handleSubmit = (details, data) => {
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
								<button onClick={this.cancelSubscription}>Downgrade</button>
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
								<PayPalButton
									options={{
										clientId: "AR5NGMdDDS5r5ppii1xubgv3F-Ek9VGqss7yt2WJ1JpTZ3Tr7dwgxcyoLtmvr7DyZ5YMeLEWx8hrDvn-",
										vault: true
									}}
									createSubscription={(data, actions) => {
										return actions.subscription.create({
											// plan_id: 'PROD-97A271950K7441738' // This has the product ID instead of plan ID
											plan_id: "P-8AN10913427866211L2VW5WI"
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
