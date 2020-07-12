import React, { Component } from 'react'

class CancellationPolicy extends Component {
     render() {
          return (
               <div className="about page">
                    <div className="container container--top-bottom-padding">
                         <div className="row">
                              <div className="col">
                                   <h1 className="text--lg">C2B You Cancellation &amp; Refund Policy</h1>
                              </div>
                         </div>
                         <div className="row">
                              <div className="col">
                                   <ul>
                                        <li>Under our 24-hour flexible booking policy, if you cancel a session  that was purchased in the last 24 hours and you completed your purchase one week or more before the original scheduled session, it may qualify for refund.</li>
                                        <li>Once a session has been marked as completed, you have 48 hours to submit a refund claim.  Claims are able to be submitted after aforementioned 48 hours.  </li>
                                        <li>If it has been determined that your session has not been completed by the professional, you will receive a full refund. </li>
                                        <li>Credit card refunds will be processed within seven business days of the request. All other refunds will be processed within 20 business days of the request</li>
                                        <li>Your refund will be credited back to your original form of payment.</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
               </div>
          )
     }
}

export default CancellationPolicy