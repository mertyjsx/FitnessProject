import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import paypalConfig from '../../config/paypal.json';
import { upgrade } from '../../store/actions/authActions';
import Modal from '../modal/Modal';

class PaypalModal extends Component {

     constructor(props) {
          super(props);
          this.state = {}
          // this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleSubmit = (details, data) => {
          // console.log("nnn", details)
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
          const { buttonText, buttonClass } = this.props;
          const { handleSubmit } = this;
          return (
               <Modal buttonText={buttonText} buttonStyle={buttonClass} content={(
                    <div class={`text--left`}>
                         <h2>Become a Pro Premium</h2>
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
                    </div>
               )} />
          )
     }
}

const mapDispatchToProps = (dispatch) => {
     return {
          upgrade: (upgradeParams) => dispatch(upgrade(upgradeParams)),
     }
}

export default connect(null, mapDispatchToProps)(withRouter(PaypalModal))