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
            isProPremium: false,
            openModal:false,
            
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		
	}

    handleSelector=(e)=>{

this.setState({openModal:e.target.checked})
    }


	handleSubmit = (details, data) => {
        console.log("nnn",details)
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
            
			
		}, 3000)
	}

	render() {
		const { handleSubmit } = this
		return (
			<div className={'pro-premium'}>
				<h3>Pro Premium</h3>
			
				{this.props.profile.isProPremium ?
				<h1>You are premium user !</h1>
                    :
                    <div>
                   
                
                 <Modal
						buttonText={'Be Premium'}
                        buttonStyle={'button button--md button--secondary'}
                        
						content={(
							<>
								<h2>be Premium</h2>
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
                                /></div>
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
		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpgradeProPremium))
