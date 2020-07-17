import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form } from 'semantic-ui-react';
import { updateProfile } from '../../store/actions/profileActions';

class Payments extends Component {

     constructor(props) {
          super(props)
          this.state = {}
          this.getUrlTabIndex = this.getUrlTabIndex.bind(this)
     }

     getUrlTabIndex = (hash) => {
          var initHash = hash
          if (initHash.startsWith('#')) {
               var removeHash = initHash.replace('#', '')
               return parseInt(removeHash)
          }
          return parseInt(initHash)
     }

     handleChange = (e) => {
          this.setState({
               [e.target.id]: e.target.value
          })
     }

     updatePreferredPaypal = (e) => {
          e.preventDefault()
          this.props.updateProfile(this.state);
     }

     render() {
          const { interactions, auth, history, profile } = this.props
          if (!auth.uid) return <Redirect to='/signin' />
          return (
               <div className="payment page">

                    <div className="container container--top-bottom-padding">
                         <div className="row" style={{ marginBottom: '25px' }}>
                              <div className="col">
                                   <h1 className="text--lg">Payments</h1>
                              </div>
                         </div>

                         <div className="row">
                              <div className="col col--12" style={{ marginBottom: '50px' }}>
                                   <div>
                                        <h2>Preferred Paypal ( Receivable )</h2>
                                        <p>Please add your paypal email you'd like to receive payments. If none added, your default email will be used to send your payout.</p>
                                   </div>
                              </div>
                              <div className="col col--12" style={{ marginBottom: '25px' }}>
                                   <form onSubmit={this.updatePreferredPaypal} style={{ maxWidth: '520px', margin: 'auto', width: '100%' }}>
                                        <div className={'form__inner'}>
                                             <Form.Field>
                                                  <label htmlFor="preferredPaypalEmail" className="screen-reader-text">Enter preferred paypal email</label>
                                                  <input defaultValue={profile.preferredPaypalEmail} className={this.state.preferredPaypalEmail !== '' ? 'input--filled' : ''} type="email" name="preferredPaypalEmail" id="preferredPaypalEmail" placeholder="Enter your preferred Paypal email" onChange={this.handleChange} required></input>
                                             </Form.Field>
                                             <Form.Field>
                                                  <button className="button button--primary">Update Paypal Email</button>
                                             </Form.Field>
                                        </div>
                                   </form>
                              </div>
                         </div>

                    </div>

               </div>
          )
     }
}

const mapStateToProps = (state) => {
     // console.log(state);
     return {
          auth: state.firebase.auth,
          profile: state.firebase.profile,
          isInitializing: state.firebase.isInitializing
     }
}

const mapDispatchToProps = (dispatch) => {
     return {
          updateProfile: (profileDetails) => dispatch(updateProfile(profileDetails))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)