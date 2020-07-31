import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { connect } from 'react-redux';
import PaypalConfig from '../../config/paypal.json';
import { sendTip } from '../../store/actions/interactionActions';
import Modal from '../modal/Modal';

class SendTip extends Component {
     constructor(props) {
          super(props);
          this.state = {
               paypalTip: {
                    amount: 0,
               }
          };
     }

     onChange = (e) => {
          this.setState({
               paypalTip: {
                    amount: e.target.value
               }
          })
     }

     handleSubmit = (details, data, iid) => {
          let $this = this
          this.setState({
               paypalTip: {
                    ...$this.state.paypalTip,
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
               $this.props.sendTip($this.state, iid)
               document.body.style.overflow = 'unset'
               $this.props.history.push(`/session/${iid}`)
          }, 2000)
     }

     render() {
          const { iid, interaction } = this.props;
          // console.log(iid)
          return (
               <form>
                    <div className="rating__message">
                         <input type={'number'} id={'tipAmount'} onChange={this.onChange} placeholder={'Amount'} />
                    </div>
                    <div className="rating__button">
                         <Modal
                              buttonText={'Send Tip'}
                              buttonStyle={`button button--accent`}
                              content={(
                                   <div style={{ textTransform: 'none' }}>
                                        <h2>Tip</h2>
                                        <p>Your total tip of ${this.state.paypalTip.amount} will be sent to <span className="text--capitalize">{interaction.proFirstName}</span>.</p>
                                        <p>Please choose your preferred method of payment below.</p>
                                        <PayPalButton
                                             amount={this.state.paypalTip.amount}
                                             // amount={1} // testing
                                             shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                             onSuccess={(details, data) => {
                                                  // alert("Transaction completed by " + details.payer.name.given_name);
                                                  this.handleSubmit(details, data, iid)
                                             }}
                                             options={{
                                                  clientId: PaypalConfig.client_id
                                             }}
                                        />
                                   </div>
                              )}
                         />
                    </div>
               </form>
          )
     }
}

const mapStateToProps = (state) => {
     return {
          auth: state.firebase.auth,
          profile: state.firebase.profile
     }
}

const mapDispatchToProps = (dispatch) => {
     return {
          sendTip: (tip, iid) => dispatch(sendTip(tip, iid))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendTip)