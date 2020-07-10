
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resendEmail } from '../../store/actions/authActions'


class Resend extends Component {
	render() {
		return (
			<a href="#" className="link" onClick={() => this.props.ResendEmail()}>{this.props.text}</a>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		ResendEmail: () => dispatch(resendEmail()),
	}
}

export default connect(null, mapDispatchToProps)(Resend)