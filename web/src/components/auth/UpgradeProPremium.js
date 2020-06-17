import React, { Component } from "react"
import { Button } from "semantic-ui-react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { upgrade } from '../../store/actions/authActions'
import Modal from '../modal/Modal'
import { PayPalButton } from 'react-paypal-button-v2'

class UpgradeProPremium extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isProPremium: false
		}
	}
	// const { isProPremium } = props

	handleSubmit = (details, data) => {
		let $this = this
		this.setState({
			isProPremium: true,
			paypalPremium: {
				timeCreated: details.create_time,
				id: details.id,
				email: details.payer.email_address,
				firstName: details.payer.name.given_name,
				lastName: details.payer.name.surname,
				payerID: details.payer.payer_id,
				status: details.status
			}
		})

		setTimeout(function () {
			// console.log('please', $this.props, $this.state);
			$this.props.upgrade($this.state)
			document.body.style.overflow = 'unset'
			$this.props.history.push('/profile-edit')
		}, 3000)
	}

	modalContent = (
		<>
			<h2>Confirm Upgrade</h2>
			{/* <button onClick={this.handleSubmit}>test</button> */}
			<PayPalButton
				options={{
					clientId: "AXZo-2NNpO_ZB4UcXu5Acw4B6cyHDuOe6xkEalFeEviIUzfiu3B7dN37P9EK09SVzh9i31DeyTF8x4Ok",
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
						this.handleSubmit(details, data)
					});
				}}
			/>
		</>

	)

	modalContentDowngrade = (
		<>
			<h2>Confirm Downgrade</h2>
			<button onClick={this.handleDowngrade}>test</button>
			{/* <PayPalButton
				amount={'0.01'}
				shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
				onSuccess={(details, data) => {
					// alert("Transaction completed by " + details.payer.name.given_name);
					this.handleSubmit(details, data)
				}}
				options={{
					clientId: "AdnGkXFLEzUBky5CsXg-LToFxF9xTiJFH6jEz5vBXffma53lY5JVu4wzKPM1B1AlEZWYAlCpZDc25Dnu"
				}}
			/> */}
		</>
	)

	render() {
		return (
			<div className={'pro-premium'}>
				<h3>Pro Premium</h3>
				<p>You are currently <strong>{this.props.profile.isProPremium ? 'enrolled' : 'not enrolled'}</strong> in the Pro Premium program.</p>
				{this.props.profile.isProPremium ?
					<Modal
						buttonText={'Downgrade'}
						buttonStyle={'button button--md button--secondary'}
						content={this.modalContentDowngrade}
					/>
					:
					<Modal
						buttonText={'Upgrade'}
						buttonStyle={'button button--md button--secondary'}
						content={this.modalContent}
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
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		upgrade: (upgradeParams) => dispatch(upgrade(upgradeParams))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpgradeProPremium))
