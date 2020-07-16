import React, { Component } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';


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

     render() {
          const { interactions, auth, history, profile } = this.props
          // if (!auth.uid) return <Redirect to='/signin' />

          return (
               <div className="not-found page">

                    <div className="container container--top-bottom-padding">
                         <div className="row">
                              <div className="col">
                                   <h1 className="text--lg">Payments</h1>
                              </div>
                         </div>

                         <div className="row">
                              <div className="col">
                                   <Tabs defaultIndex={this.getUrlTabIndex(history.location.hash)}>
                                        <TabList>
                                             <Tab>Paypal</Tab>
                                        </TabList>
                                        <TabPanel>
                                             Paypal Content
								</TabPanel>
                                   </Tabs>
                              </div>
                         </div>

                    </div>

               </div>
          )
     }
}

export default Payments