import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUpPro } from '../../../store/actions/authActions'
import { postcodeValidator, postcodeValidatorExists } from 'postcode-validator';

class SignUpPro extends Component {
	constructor(props) {
		super(props)
		this.state = {
			professionChef: '',
			city: '',
			state: '',
			zip: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			data: '',
			pageTwoActive: false,
			professionFitnessTrainer: false,
			professionChef: false,
			professionMassageTherapist: false,
			professionNutritionist: false
		}
	}

	zipValidator = (e) => {
		e.preventDefault();
		let $this = this;
		if (postcodeValidator($this.state.zip, 'US') === false) {
			alert('Enter a valid zip code')
			return null
		}
		$this.setState({
			pageTwoActive: true
		})
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${$this.state.zip}&sensor=true&key=AIzaSyBffpI8hvEPuICCsaEkV6dIl-gOW-4E49w`)
			.then(function (response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}

				response.json().then(function (data) {
					data.results.map(res => {
						console.log(res.address_components, res.address_components[1].long_name);
						$this.setState({
							city: res.address_components[1].long_name,
							state: res.address_components[2].short_name.length === 2 ? res.address_components[2].short_name : res.address_components[3].short_name.length === 2 ? res.address_components[3].short_name : res.address_components[4].short_name
						})
					})
				});
			}).catch(function (err) {
				console.log('Please contact webmaster with this error:', err);
			})

	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleProfessionChange = (e) => {
		if (e.target.value === 'chef') {
			this.setState({
				professionFitnessTrainer: false,
				professionChef: true,
				professionMassageTherapist: false,
				professionNutritionist: false
			})
		}
		if (e.target.value === 'nutritionist') {
			this.setState({
				professionFitnessTrainer: false,
				professionChef: false,
				professionMassageTherapist: false,
				professionNutritionist: true
			})
		}
		if (e.target.value === 'massageTherapist') {
			this.setState({
				professionFitnessTrainer: false,
				professionChef: false,
				professionMassageTherapist: true,
				professionNutritionist: false
			})
		}
		if (e.target.value === 'fitnessTrainer') {
			this.setState({
				professionFitnessTrainer: true,
				professionChef: false,
				professionMassageTherapist: false,
				professionNutritionist: false
			})
		}
	}

	handleSubmit = (e) => {
		// e.preventDefault();
		// this.zipValidator(this.state.zip)
		// console.log(this.state);
		this.props.signUpPro(this.state, this.props)
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
		function convertToCamelCase(word) {
			console.log(word);

		}
		return (
			convertToCamelCase(optionsFormatted.splice(''))
		)
	}

	render() {
		const { auth, authError } = this.props
		if (auth.uid) return <Redirect to='/dashboard' />

		return (
			<div className="signup">
				<div className="container container--small container--top-bottom-padding">
					<h1 className={'text--center text--bold'}>Join As Pro</h1>
					<Form onSubmit={this.handleSubmit}>
						{this.state.pageTwoActive !== true ?
							<div className={'form__inner'}>
								<Form.Field className={this.state.pageTwoActive === true ? 'field--hide' : 'field--show'}>
									<label htmlFor="profession">Select your primary profession</label>
									<select id={'profession'} onChange={this.handleProfessionChange}>
										<option>Primary Profession</option>
										<option value={'fitnessTrainer'}>Fitness Trainer</option>
										<option value={'chef'}>Chef</option>
										<option value={'nutritionist'}>Nutrionist</option>
										<option value={'massageTherapist'}>Massage Therapist</option>
									</select>
								</Form.Field>
								<Form.Field>
									<label htmlFor="zip">Enter your zipcode</label>
									<input type="text" name="zip" id="zip" placeholder="e.g. 32801" onChange={this.handleChange}></input>
								</Form.Field>
								<Form.Field>
									<button className={`button button--secondary text--uppercase text--bold text--font-secondary ${this.state.profession === '' ? 'button--inactive' : ''}`} onClick={this.zipValidator}>Proceed</button>
								</Form.Field>
							</div>
							:
							<div className={'form__inner'}>
								<Form.Field>
									<p><small>(*) All fields are required</small></p>
								</Form.Field>
								<Form.Field className={'field--half field--inactive'}>
									<label htmlFor="city">City</label>
									<div name="city" className="input--field input--filled">
										{this.state.city}
									</div>
								</Form.Field>
								<Form.Field className={'field--half field--inactive'}>
									<label htmlFor="state">State</label>
									<div name="state" className="input--field input--filled">
										{this.state.state}
									</div>
								</Form.Field>
								<Form.Field>
									<label htmlFor="firstName">First Name <sup className="red">*</sup></label>
									<input className={this.state.firstName !== '' ? 'input--filled' : ''} type="text" name="firstName" id="firstName" placeholder="Enter your first name" onChange={this.handleChange} required></input>
								</Form.Field>
								<Form.Field>
									<label htmlFor="lastName">Last Name <sup className="red">*</sup></label>
									<input className={this.state.lastName !== '' ? 'input--filled' : ''} type="text" name="lastName" id="lastName" placeholder="Enter your last name" onChange={this.handleChange} required></input>
								</Form.Field>
								<Form.Field>
									<label htmlFor="email">Email <sup className="red">*</sup></label>
									<input className={this.state.email !== '' ? 'input--filled' : ''} type="email" name="email" id="email" placeholder="Enter your email" onChange={this.handleChange} required></input>
								</Form.Field>
								<Form.Field>
									<label htmlFor="password">Password <sup className="red">*</sup> <small>(min. 8 characters)</small></label>
									<input className={this.state.password !== '' ? 'input--filled' : ''} type="password" name="password" id="password" placeholder="Enter password" onChange={this.handleChange} required></input>
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
									<button type="submit" className={`button button--secondary text--uppercase text--bold text--font-secondary ${this.state.email === '' && this.state.password === '' ? 'button--inactive' : ''}`}>Join</button>
									<div className="warning">
										{authError ? <p>{authError}</p> : null}
									</div>
								</Form.Field>
							</div>
						}
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
		signUpPro: (newUser) => dispatch(signUpPro(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpPro))