import React, { Component } from "react"
import { connect } from 'react-redux'
import { Form } from "semantic-ui-react"
import { passwordReset } from '../../store/actions/authActions'
import Modal from '../modal/Modal'

class PasswordReset extends Component {

	constructor(props) {
		super(props)
		this.state = {
			email: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	reset = () => {
		let $this = this

		$this.state.email !== '' ?
			this.props.passwordReset(this.state.email)
			:
			alert('Please enter email.')
	}

	render() {
		const { authError, auth } = this.props
		return (
			<div className={'password-reset'}>
				<Modal
					buttonText={'Forgot Password'}
					buttonStyle={'button link button--center'}
					content={(
						<div>
							<h2>Reset Password</h2>
							<p>You will receive an email on how to reset your password.  Enter your email below.</p>
							<form onSubmit={this.reset}>
								<Form>
									<Form.Field>
										<label htmlFor="email">Enter Email</label>
										<input type="email" name="email" onChange={this.handleChange} id="email"></input>
									</Form.Field>
									<Form.Field>
										<button type="submit" className={'button button--primary'}>Reset</button>
										<div className="warning">
											{authError ? <p>{authError}</p> : null}
										</div>
									</Form.Field>
								</Form>
							</form>
						</div>
					)}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		passwordReset: (email) => dispatch(passwordReset(email))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
