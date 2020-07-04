import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { updateQuote } from '../../../store/actions/settingsActions';

class SetQuote extends Component {
     constructor(props) {
          super(props);
          this.state = {

          };
          this.onSubmit = this.onSubmit.bind(this)
     }

     onChange = (e) => {
          this.setState({
               [e.target.id]: e.target.value
          })
     }

     onSubmit = (e) => {
          e.preventDefault()
          this.props.updateQuote(this.state)
     }

     render() {

          return (
               <div className="motivation-quote__form">
                    <form onSubmit={this.onSubmit}>
                         <div className="form__inner">
                              <div className="field">
                                   <textarea id={'quote'} onChange={this.onChange} placeholder={'Quote'}></textarea>
                              </div>
                              <div className="field">
                                   <Button className={'button button--accent'}>Update Quote</Button>
                              </div>
                         </div>
                    </form>
               </div>
          )
     }
}

const mapStateToProps = (state) => {
     return {
          // auth: state.firebase.auth,
          // profile: state.firebase.profile
          settings: state.firestore.data.settings,
     }
}

const mapDispatchToProps = (dispatch) => {
     return {
          updateQuote: (quote) => dispatch(updateQuote(quote))
     }
}

export default compose(
     connect(mapStateToProps, mapDispatchToProps),
     firestoreConnect([
          // { collection: 'projects', orderBy: ['createdAt', 'desc'] },
          { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] },
          { collection: 'settings' }
     ])
)(SetQuote)