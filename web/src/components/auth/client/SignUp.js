import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../../store/actions/authActions'

class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
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
		this.props.signUp(this.state)
	}

	render() {
		const { auth, authError } = this.props
		if (auth.uid) return <Redirect to='/' />

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<h2>Sign Up</h2>
					<Form.Field>
						<label htmlFor="firstName">First Name</label>
						<input type="text" name="firstName" id="firstName" placeholder="Enter your first name" onChange={this.handleChange}></input>
					</Form.Field>
					<Form.Field>
						<label htmlFor="lastName">Last Name</label>
						<input type="text" name="lastName" id="lastName" placeholder="Enter your last name" onChange={this.handleChange}></input>
					</Form.Field>
					<Form.Field>
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" placeholder="Enter your email" onChange={this.handleChange}></input>
					</Form.Field>
					<Form.Field>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" placeholder="Enter password" onChange={this.handleChange}></input>
					</Form.Field>
					<Form.Field>
						<button type="submit">Login</button>
						<div className="warning">
							{authError ? <p>{authError}</p> : null}
						</div>
					</Form.Field>
				</Form>
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
		signUp: (newUser) => dispatch(signUp(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)