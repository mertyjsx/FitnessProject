
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button} from 'semantic-ui-react'
import {resendEmail} from '../../store/actions/authActions'

class Resend extends Component {



	render() {
		

		return (
			
        <Button  onClick={()=>this.props.ResendEmail()}>{this.props.text}</Button>
			
		)
	}
}



const mapDispatchToProps = (dispatch) => {
	return {
		ResendEmail: () => dispatch(resendEmail()),
		
	}
}

export default connect(null, mapDispatchToProps)(Resend)