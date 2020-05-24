import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUpPro } from '../../../store/actions/authActions'
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';

class SignUpPro extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profession: '',
			zip: '',
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	}

	zipValidator = (zip) => {
		if (postcodeValidator(zip, 'US') === false) {
			alert('Enter a valid zip code')
			return null
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.zipValidator(this.state.zip)
		// this.props.signUp(this.state)
	}

	renderDataList = () => {
		var options = [
			'Fitness Trainer',
			'Chef',
			'Nutrionist',
			'Massage Therapist'
		]
		var optionsFormatted = []
		options.forEach(function (option, i) {
			optionsFormatted.push(
				<option value={option} key={i} />
			)
		});
		return (
			optionsFormatted.splice('')
		)
	}

	render() {
		const { auth, authError } = this.props
		if (auth.uid) return <Redirect to='/' />

		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<h2>Sign Up</h2>
					<Form.Field>
						<label htmlFor="profession">Select your primary professions</label>
						<input list="professions" name="profession" id="profession" placeholder="e.g. Fitness Trainer, Chef, Nutrionist, Massage Therapist" onChange={this.handleChange}></input>
						<datalist id="professions">
							{this.renderDataList()}
						</datalist>
					</Form.Field>
					<Form.Field>
						<label htmlFor="zip">Enter your zipcode</label>
						<input type="text" name="zip" id="zip" placeholder="e.g. 32801" onChange={this.handleChange}></input>
					</Form.Field>
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
		signUpPro: (newUser) => dispatch(signUpPro(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPro)