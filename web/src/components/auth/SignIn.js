import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import { signIn, signInClientWithFacebook, signInClientWithGoogle } from '../../store/actions/authActions'
import PasswordReset from './PasswordReset'

class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state)
	}
	handleFacebookSubmit = (e) => {
		e.preventDefault()
		console.log('handleFacebookSubmit works');

		this.props.signInClientWithFacebook()
	}

	handleGoogleSubmit = (e) => {
		e.preventDefault()
		console.log('handleGoogleSubmit works');
		this.props.signInClientWithGoogle()
	}

	render() {
		const { authError, auth } = this.props
		if (auth.uid) return <Redirect to='/dashboard' />

		return (
			<div className={'signin'}>
				<div className="container container--small container--top-bottom-padding">
					<h1 className="text--bold text--center">Sign In</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" placeholder="Enter email" onChange={this.handleChange}></input>
						</Form.Field>
						<Form.Field>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" placeholder="Enter password" onChange={this.handleChange}></input>
						</Form.Field>
						<Form.Field>
							<button type="submit" className={`button button--secondary text--uppercase text--bold text--font-secondary`}>Login</button>
						</Form.Field>

						<Form.Field className={'field--half'}>
							<button onClick={this.handleFacebookSubmit} className={`button button--secondary button--center text--uppercase text--bold text--font-secondary`} type="submit">
								Sign In with Facebook <FontAwesomeIcon style={{ marginLeft: '10px', transform: 'translateY(-2px)' }} icon={["fab", "facebook-f"]} />
							</button>
						</Form.Field>
						<Form.Field className={'field--half'}>
							<button onClick={this.handleGoogleSubmit} className={`button button--secondary button--center text--uppercase text--bold text--font-secondary`} type="submit">
								Sign In with Google
								<FontAwesomeIcon style={{ marginLeft: '10px', transform: 'translateY(-2px)' }} icon={["fab", "google"]} />
							</button>
						</Form.Field>
						{authError ?
							<Form.Field>
								<div className="status status--danger status--full">
									{authError}
								</div>
							</Form.Field>
							: null}
					</Form>
					<PasswordReset />
				</div>
			</div>
		)
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
		signIn: (creds) => dispatch(signIn(creds)),
		signInClientWithFacebook: () => dispatch(signInClientWithFacebook()),
		signInClientWithGoogle: () => dispatch(signInClientWithGoogle())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
