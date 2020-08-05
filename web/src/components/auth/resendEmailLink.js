
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resendEmail } from '../../store/actions/authActions';


class Resend extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSent: false
		}
	}

	resendTheEmail = () => {
		this.props.resendEmail()
		this.setState({
			hasSent: true
		})
	}

	render() {
		const { text } = this.props
		return (
			<>
				{
					this.state.hasSent ?
						<strong>Email has been sent.</strong>
						:
						<button className="link" onClick={this.resendTheEmail}>{text}</button>
				}
			</>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		resendEmail: () => dispatch(resendEmail()),
	}
}

export default connect(null, mapDispatchToProps)(Resend)