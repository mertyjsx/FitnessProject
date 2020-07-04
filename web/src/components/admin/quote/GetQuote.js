import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class GetQuote extends Component {

     constructor(props) {
          super(props);
          this.state = {}
     }

     render() {
          const { settings } = this.props
          // console.log(settings.general.splash, this.props);

          return (
               <div className="motivation-quote">
                    {settings && settings.quote.quote}
               </div>
          )
     }
}

const mapStateToProps = (state) => {
     // console.log(state);
     return {
          settings: state.firestore.data.settings
     }
}

export default compose(
     connect(mapStateToProps),
     firestoreConnect((props, store) => {
          // const uid = props.user.uid;
          return [{
               collection: 'settings'
          }]
     })
)(GetQuote)