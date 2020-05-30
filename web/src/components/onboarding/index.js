import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button, Checkbox, Input } from 'semantic-ui-react'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { addDays } from "date-fns";
import { completeOnboarding } from '../../store/actions/authActions'
import spinner from '../../assets/images/spinner.gif'
import ImageUpload from '../profileEdit/imageUpload/ImageUpload';
import RenderImage from '../profileEdit/imageUpload/RenderImage';
import LicenseImageUpload from '../profileEdit/imageUpload/LicenseImageUpload';
import RenderLicense from '../profileEdit/imageUpload/RenderLicense';

class Onboarding extends Component {

	constructor(props) {
		super(props)
		this.state = {
			onboardingCompleted: true,
			professions: {},
			rates: {}
		}
		this.handleSpecialties = this.handleSpecialties.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}



	handleSpecialties = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			specialties: {
				...this.state.specialties,
				[e.target.id]: e.target.checked
			}
		})
	}

	handleChefRateChange = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			rates: {
				chef: {
					...this.state.rates.chef,
					[e.target.id]: e.target.value
				}
			}
		})
	}

	handleChange = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			[e.target.id]: e.target.value
		})
	}


	handleNext = (e) => {
		e.preventDefault()
		console.log('next screen');
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.completeOnboarding(this.state, this.props.auth.uid);
	}

	render() {
		const { projects, auth, profile, notifications } = this.props
		if (profile.onboardingCompleted) return <Redirect to='/dashboard' />

		if (profile.isEmpty !== true) {
			return (
				<div className="onboarding">
					<div className="container container--small container--top-bottom-padding">
						<h1 className="text--bold">Onboarding</h1>
						<h2>Hi <span className="text--capitalize">{profile.firstName}</span>,</h2>
						<p>Welcome to the onboarding process! Please fill out as much information as possible so out admins can approve your profile as soon as possible.  <Link to="/contact">Contact us</Link> if you have any questions.</p>
						<Form onSubmit={this.handleSubmit}>

							<div className={'form__inner--1'}>
								{profile.professions.chef && (
									<div className={'form__inner '}>
										<div>
											<h2>Specialties</h2>
											<p>What are your specialties as a <span className={'text--bold'}>{profile.professions.chef ? 'Chef' : null}{profile.professions.fitnessTrainer ? 'Fitness Instructor' : null}{profile.professions.nutritionist ? 'Nutritionist' : null}{profile.professions.massageTherapist ? 'Massage Therapist' : null}</span>?</p>
										</div>
										<Form.Field className={'field--cols'}>
											<div class="ui checkbox">
												<input id="seafood" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="seafood">Seafood</label>
											</div>
											<div class="ui checkbox">
												<input id="american" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="american">American</label>
											</div>
											<div class="ui checkbox">
												<input id="breakfastOrBrunch" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="breakfastOrBrunch">Breakfast or Brunch</label>
											</div>
											<div class="ui checkbox">
												<input id="international" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="international">International</label>
											</div>
											<div class="ui checkbox">
												<input id="southern" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="southern">Southern</label>
											</div>
											<div class="ui checkbox">
												<input id="healthy" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="healthy">Healthy</label>
											</div>
											<div class="ui checkbox">
												<input id="desserts" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="desserts">Desserts</label>
											</div>
											<div class="ui checkbox">
												<input id="juicesAndSmoothies" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
												<label for="juicesAndSmoothies">Juices and Smoothies</label>
											</div>
										</Form.Field>
										<Form.Field className={'field--half'}>
											<Input id={'online'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required onChange={this.handleChefRateChange} />
										</Form.Field>
										<Form.Field className={'field--half'}>
											<Input id={'inPerson'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required onChange={this.handleChefRateChange} />
										</Form.Field>
									</div>
								)}

								{profile.professions.massageTherapist && (
									<Form.Field className={'field--cols'}>
										<div class="ui checkbox">
											<input id="deepTissue" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="deepTissue">Deep Tissue</label>
										</div>
										<div class="ui checkbox">
											<input id="swedish" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="swedish">Swedish</label>
										</div>
										<div class="ui checkbox">
											<input id="stone" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="stone">Stone</label>
										</div>
										<div class="ui checkbox">
											<input id="pregnancy" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="pregnancy">Pregnancy</label>
										</div>
										<div class="ui checkbox">
											<input id="sports" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="sports">Sports</label>
										</div>
										<div class="ui checkbox">
											<input id="reflexology" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="reflexology">Reflexology</label>
										</div>
									</Form.Field>
								)}

								{profile.professions.nutritionist && (
									<Form.Field className={'field--cols'}>
										<div class="ui checkbox">
											<input id="normalNutrition" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="normalNutrition">Normal Nutrition</label>
										</div>
										<div class="ui checkbox">
											<input id="veganOrVegetarian" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="veganOrVegetarian">Vegan or Vegetarian</label>
										</div>
										<div class="ui checkbox">
											<input id="paleo" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="paleo">Paleo</label>
										</div>
										<div class="ui checkbox">
											<input id="publicHealth" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="publicHealth">Public Health</label>
										</div>
										<div class="ui checkbox">
											<input id="sports" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="sports">Sports</label>
										</div>
										<div class="ui checkbox">
											<input id="pediatric" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="pediatric">Pediatric</label>
										</div>
										<div class="ui checkbox">
											<input id="diabetes" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="diabetes">Diabetes</label>
										</div>
										<div class="ui checkbox">
											<input id="heartHealth" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="heartHealth">Heart Health</label>
										</div>
										<div class="ui checkbox">
											<input id="autoimmuneDisease" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="autoimmuneDisease">Autoimmune Disease</label>
										</div>
										<div class="ui checkbox">
											<input id="foodAllergies" tabindex="0" type="checkbox" onChange={this.handleSpecialties} />
											<label for="foodAllergies">Food Allergies</label>
										</div>
									</Form.Field>
								)}
								{/* <Form.Field>
									<button className={`button button--secondary text--uppercase text--bold text--font-secondary`} onClick={this.handleNext}>Proceed</button>
								</Form.Field> */}
							</div>

							<div className={'form__inner--1'}>
								<div className="form__inner">
									<div>
										<h2>About You</h2>
										<p>We'd like to know more about you! The infromation you provide here will be part of your profile.</p>
									</div>
									<Form.Field>
										<label htmlFor="about">About</label>
										<textarea id={'about'} placeholder="Enter a desciptive biography." onChange={this.handleChange} required></textarea>
									</Form.Field>
									<Form.Field>
										<label htmlFor="background">Background</label>
										<textarea id={'background'} placeholder="Explain your background." onChange={this.handleChange} required></textarea>
									</Form.Field>
									<Form.Field className={'field--half'}>
										<label htmlFor="favQuote">Favorite Quote</label>
										<textarea id={'favQuote'} placeholder="What is your favorite quote?" onChange={this.handleChange} required></textarea>
									</Form.Field>
									<Form.Field className={'field--half'}>
										<label htmlFor="funFact">Fun Fact</label>
										<textarea id={'funFact'} placeholder="Tell us a fun fact about yourself." onChange={this.handleChange} required></textarea>
									</Form.Field>
									{/* <Form.Field>
									<button className={`button button--secondary text--uppercase text--bold text--font-secondary`} onClick={this.handleNext}>Proceed</button>
								</Form.Field> */}
								</div>
							</div>

							<div className={'form__inner--2'}>
								<div className="form__inner">
									<Form.Field>
										<h2>Media</h2>
									</Form.Field>
									<Form.Field className={'field--half'}>
										<div>
											<h2>Profile Image</h2>
											<p>Upload your profile image below.</p>
										</div>
										<ImageUpload />
										{/* <RenderImage /> */}
									</Form.Field>
									<Form.Field className={'field--half'}>
										<div>
											<h2>License Image</h2>
											<p>Upload an image of any certification you'd like displayed in your profile.</p>
										</div>
										<LicenseImageUpload />
										{/* <RenderLicense /> */}
									</Form.Field>
								</div>
							</div>

							<div className={'form__inner--2'}>
								<div className="form__inner">
									<Form.Field>
										<Button type="submit" className="button button--secondary text--md text--font-secondary text--uppercase">Complete Onboarding</Button>
									</Form.Field>
								</div>
							</div>

						</Form>
					</div>
				</div>
			)
		} else {
			return (
				<div>loading..</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		completeOnboarding: (onboard) => dispatch(completeOnboarding(onboard))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Onboarding))