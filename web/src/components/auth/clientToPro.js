import { postcodeValidator } from 'postcode-validator'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import { ClientToPro } from '../../store/actions/authActions'

class UpgradePremium extends Component {
	constructor(props) {
		super(props)
		this.state = {
			professionChef: '',
			city: '',
			state: '',
			zip: '',

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
		e.preventDefault();
		// this.zipValidator(this.state.zip)
		// console.log(this.state);
		this.props.signUpPro(this.state)
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
		const { auth, authError, profile } = this.props
		if (profile.isPro) return <Redirect to='/dashboard' />
		if (!auth.uid) return <Redirect to='/signin' />
		return (
			<div className="signup">
				<div className="container container--small container--top-bottom-padding">
					<h1 className={'text--center text--bold'}>Upgrade to Pro</h1>
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
									<button className={`button button--secondary text--uppercase text--bold text--font-secondary ${this.state.professionFitnessTrainer === false && this.state.professionChef === false && this.state.professionMassageTherapist === false && this.state.professionNutritionist === false ? 'button--inactive' : ''}`} onClick={this.zipValidator}>Proceed</button>
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
									<label htmlFor="phoneNumber">Mobile Number <sup className="red">*</sup>(ex. ##########)</label>
									<input className={this.state.phoneNumber !== '' ? 'input--filled' : ''} type="tel" pattern="[0-9]{10}" name="phoneNumber" id="phoneNumber" placeholder="Enter your cell phone (ex. ##########)" onChange={this.handleChange} required></input>
								</Form.Field>


								<Form.Field>
									<p className="text--center">By clicking <strong>Upgrade to Pro</strong>, you agree to the <Link to={'/terms-of-use'}>Terms of Use</Link> and <Link to={'/privacy-policy'}>Privacy Policy</Link>.</p>
								</Form.Field>
								<Form.Field>
									<button type="submit" className={`button button--secondary text--uppercase text--bold text--font-secondary  `}>Upgrade to Pro</button>
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
		authError: state.auth.authError,
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUpPro: (newUser) => dispatch(ClientToPro(newUser))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpgradePremium))