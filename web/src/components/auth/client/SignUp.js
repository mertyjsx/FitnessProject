import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import { signUp, signUpClientWithFacebook, signUpClientWithGoogle } from '../../../store/actions/authActions'

class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			phoneNumber: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signUp(this.state)
	}

	handleFacebookSubmit = (e) => {
		e.preventDefault()
		console.log('handleFacebookSubmit works');

		this.props.signUpClientWithFacebook(this.state)
	}

	handleGoogleSubmit = (e) => {
		e.preventDefault()
		console.log('handleGoogleSubmit works');
		this.props.signUpClientWithGoogle(this.state)
	}

	render() {
		const { auth, authError } = this.props
		if (auth.uid) return <Redirect to='/onboarding-client' />

		return (
			<div className="signup">
				<div className="container container--small container--top-bottom-padding">
					<h1 className="text--bold text--center">Sign Up</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field className="field--half">
							<label htmlFor="firstName">First Name</label>
							<input className={this.state.firstName !== '' ? 'input--filled' : ''} type="text" name="firstName" id="firstName" placeholder="Enter your first name" onChange={this.handleChange} />
						</Form.Field>
						<Form.Field className="field--half">
							<label htmlFor="lastName">Last Name</label>
							<input className={this.state.lastName !== '' ? 'input--filled' : ''} type="text" name="lastName" id="lastName" placeholder="Enter your last name" onChange={this.handleChange} />
						</Form.Field>
						<Form.Field>
							<label htmlFor="email">Email</label>
							<input className={this.state.email !== '' ? 'input--filled' : ''} type="email" name="email" id="email" placeholder="Enter your email" onChange={this.handleChange} />
						</Form.Field>
						<Form.Field>
							<label htmlFor="phoneNumber">Mobile Number <sup className="red">*</sup>(ex. ##########)</label>
							<input className={this.state.phoneNumber !== '' ? 'input--filled' : ''} type="tel" pattern="[0-9]{10}" name="phoneNumber" id="phoneNumber" placeholder="Enter your cell phone (ex. ##########)" onChange={this.handleChange} required></input>
						</Form.Field>
						<Form.Field>
							<label htmlFor="password">Password <small>(min. 8 characters)</small></label>
							<input className={this.state.password !== '' ? 'input--filled' : ''} type="password" name="password" id="password" placeholder="Enter password" onChange={this.handleChange} pattern=".{8,}" required title="8 characters minimum" />
						</Form.Field>
						<Form.Field>
							<label htmlFor="password">Confirm Password</label>
							<input className={this.state.passwordConfirm ? this.state.passwordConfirm === this.state.password ? 'input--filled' : 'input--error' : ''} type="password" name="password" id="passwordConfirm" placeholder="Retype password" onChange={this.handleChange} pattern=".{8,}" required title="8 characters minimum" />
							<span className={'error-span'}>Passwords do not match</span>
						</Form.Field>
						<Form.Field>
							<p className="text--center">By clicking <strong>Create Account</strong>, you agree to the <Link to={'/terms-of-use'}>Terms of Use</Link> and <Link to={'/privacy-policy'}>Privacy Policy</Link>.</p>
						</Form.Field>
						<Form.Field>
							<button className={`button button--secondary text--uppercase text--bold text--font-secondary ${this.state.password !== this.state.passwordConfirm ? `button--inactive` : `button--active`}`} type="submit">Create Account</button>
							<div className="warning">
								{authError ? <p>{authError}</p> : null}
							</div>
						</Form.Field>
					</Form>

					<p style={{ width: '100%', textAlign: 'center' }}>OR</p>

					<Form onSubmit={this.handleFacebookSubmit}>
						<Form.Field>
							<button className={`button button--secondary text--uppercase text--bold text--font-secondary`} type="submit">
								Create Account with Facebook
								<FontAwesomeIcon style={{ marginLeft: '10px', transform: 'translateY(-2px)' }} icon={["fab", "facebook-f"]} />
							</button>
							<div className="warning">
								{authError ? <p>{authError}</p> : null}
							</div>
						</Form.Field>
					</Form>
					<Form onSubmit={this.handleGoogleSubmit}>
						<Form.Field>
							<button className={`button button--secondary text--uppercase text--bold text--font-secondary`} type="submit">
								Create Account with Google
								<FontAwesomeIcon style={{ marginLeft: '10px', transform: 'translateY(-2px)' }} icon={["fab", "google"]} />
							</button>
							<div className="warning">
								{authError ? <p>{authError}</p> : null}
							</div>
						</Form.Field>
					</Form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser)),
		signUpClientWithFacebook: (newUser) => dispatch(signUpClientWithFacebook(newUser)),
		signUpClientWithGoogle: (newUser) => dispatch(signUpClientWithGoogle(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp))