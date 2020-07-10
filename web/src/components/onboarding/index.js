import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import ellipses from '../../assets/images/ellipsis.gif';
import { completeOnboarding } from '../../store/actions/authActions';
import Loading from '../modules/Loading';
import ImageUpload from '../profileEdit/imageUpload/ImageUpload';
import LicenseImageUpload from '../profileEdit/imageUpload/LicenseImageUpload';
import PaypalModal from "./paypalModal";



class Onboarding extends Component {

	constructor(props) {
		super(props)
		this.state = {
			onboardingCompleted: true,
			onboardingUploading: false,
			both: true,
			online: false,
			inperson: false
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

	handleRateChange = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			[e.target.id]: e.target.value
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
		let $this = this
		$this.setState({
			onboardingUploading: true
		})
		setTimeout(function () {
			// console.log('wait 3 secs', $this.state, $this.props.auth.uid);
			$this.props.completeOnboarding($this.state,$this.props.profile.isDeclined);
			$this.props.history.push('/dashboard')
		}, 3000)
	}

	handleSelector = (name, e) => {
		console.log(name)
		console.log(e.target.checked)
		if (name === "both") {
			let bool = e.target.checked
			this.setState({ both: bool, inperson: !bool, online: !bool })
		}
		if (name === "inperson") {
			let bool = e.target.checked
			this.setState({ both: !bool, inperson: bool, online: !bool })
		}
		if (name === "online") {
			let bool = e.target.checked
			this.setState({ both: !bool, inperson: !bool, online: bool })
		}



	}


	render() {
		console.log(this.state)
		const { projects, auth, profile, notifications } = this.props
		if (profile.onboardingCompleted) return <Redirect to='/dashboard' />

		if (profile.isEmpty !== true) {
			return (
				<div className="onboarding">

					{this.state.onboardingUploading ?
						<div className="uploading">
							<div className="uploading__content">
								<img src={ellipses} />
								<p>Profile Uploading</p>
							</div>
						</div>
						: null}
					<div className="container container--small container--top-bottom-padding">
						<h1 className="text--bold">Onboarding</h1>
						<h2>Hi <span className="text--capitalize">{profile.firstName}</span>,</h2>
						<p>Welcome to the onboarding process! Please fill out as much information as possible so out admins can approve your profile as soon as possible.  <Link to="/contact">Contact us</Link> if you have any questions.</p>

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
								</Form.Field>
								<Form.Field className={'field--half'}>
									<div>
										<h2>License Image</h2>
										<p>Upload an image of any certification you'd like displayed in your profile.</p>
									</div>
									<LicenseImageUpload />
								</Form.Field>
							</div>
						</div>

						<Form onSubmit={this.handleSubmit}>

							<div className={'form__inner--1'}>
								<div className={'form__inner '}>
									<div>
										<h2>Specialties</h2>
										<p>What are your specialties as a <span className={'text--bold'}>{profile.professions.chef ? 'Chef' : null}{profile.professions.fitnessTrainer ? 'Fitness Instructor' : null}{profile.professions.nutritionist ? 'Nutritionist' : null}{profile.professions.massageTherapist ? 'Massage Therapist' : null}</span>?</p>
									</div>

									{profile.professions.chef && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="seafood" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="seafood">Seafood</label>
												</div>
												<div className="ui checkbox">
													<input id="american" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="american">American</label>
												</div>
												<div className="ui checkbox">
													<input id="breakfastOrBrunch" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="breakfastOrBrunch">Breakfast or Brunch</label>
												</div>
												<div className="ui checkbox">
													<input id="international" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="international">International</label>
												</div>
												<div className="ui checkbox">
													<input id="southern" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="southern">Southern</label>
												</div>
												<div className="ui checkbox">
													<input id="healthy" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="healthy">Healthy</label>
												</div>
												<div className="ui checkbox">
													<input id="desserts" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="desserts">Desserts</label>
												</div>
												<div className="ui checkbox">
													<input id="juicesAndSmoothies" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="juicesAndSmoothies">Juices and Smoothies</label>
												</div>
											</Form.Field>


											<Form.Field className={'field--cols'} style={{ padding: '20px 0 0' }} >
												<div style={{ flex: '0 1 100%' }}>
													<h2>Rates</h2>
												</div>

												<div className="ui checkbox">
													<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
													<label htmlFor="online">Online</label>
												</div>
												<div className="ui checkbox">
													<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
													<label htmlFor="inperson">In-Person</label>
												</div>
												<div className="ui checkbox">
													<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
													<label htmlFor="both">Both</label>
												</div>

											</Form.Field>
											{(this.state.online || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

										</>
									)}

									{profile.professions.massageTherapist && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="deepTissue" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="deepTissue">Deep Tissue</label>
												</div>
												<div className="ui checkbox">
													<input id="swedish" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="swedish">Swedish</label>
												</div>
												<div className="ui checkbox">
													<input id="stone" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="stone">Stone</label>
												</div>
												<div className="ui checkbox">
													<input id="pregnancy" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="pregnancy">Pregnancy</label>
												</div>
												<div className="ui checkbox">
													<input id="sports" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="sports">Sports</label>
												</div>
												<div className="ui checkbox">
													<input id="reflexology" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="reflexology">Reflexology</label>
												</div>
											</Form.Field>
											<Form.Field className={'field--cols'} >

												<div className="ui checkbox">
													<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
													<label htmlFor="online">Online</label>
												</div>
												<div className="ui checkbox">
													<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
													<label htmlFor="inperson">Inperson</label>
												</div>
												<div className="ui checkbox">
													<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
													<label htmlFor="both">both</label>
												</div>

											</Form.Field>
											{(this.state.online || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

										</>
									)}

									{profile.professions.nutritionist && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="normalNutrition" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="normalNutrition">Normal Nutrition</label>
												</div>
												<div className="ui checkbox">
													<input id="veganOrVegetarian" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="veganOrVegetarian">Vegan or Vegetarian</label>
												</div>
												<div className="ui checkbox">
													<input id="paleo" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="paleo">Paleo</label>
												</div>
												<div className="ui checkbox">
													<input id="publicHealth" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="publicHealth">Public Health</label>
												</div>
												<div className="ui checkbox">
													<input id="sports" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="sports">Sports</label>
												</div>
												<div className="ui checkbox">
													<input id="pediatric" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="pediatric">Pediatric</label>
												</div>
												<div className="ui checkbox">
													<input id="diabetes" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="diabetes">Diabetes</label>
												</div>
												<div className="ui checkbox">
													<input id="heartHealth" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="heartHealth">Heart Health</label>
												</div>
												<div className="ui checkbox">
													<input id="autoimmuneDisease" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="autoimmuneDisease">Autoimmune Disease</label>
												</div>
												<div className="ui checkbox">
													<input id="foodAllergies" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="foodAllergies">Food Allergies</label>
												</div>
											</Form.Field>
											<Form.Field className={'field--cols'} >

												<div className="ui checkbox">
													<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
													<label htmlFor="online">Online</label>
												</div>
												<div className="ui checkbox">
													<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
													<label htmlFor="inperson">Inperson</label>
												</div>
												<div className="ui checkbox">
													<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
													<label htmlFor="both">both</label>
												</div>

											</Form.Field>
											{(this.state.online || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

										</>
									)}

									{profile.professions.fitnessTrainer && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="competitionPrep" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="competitionPrep">Competition Prep</label>
												</div>
												<div className="ui checkbox">
													<input id="powerLifting" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="powerLifting">Power Lifting</label>
												</div>
												<div className="ui checkbox">
													<input id="weightLoss" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="weightLoss">Weight Loss</label>
												</div>
												<div className="ui checkbox">
													<input id="bodyFatLoss" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="bodyFatLoss">Body Fat Loss</label>
												</div>
												<div className="ui checkbox">
													<input id="sizeGaining" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="sizeGaining">Size Gaining</label>
												</div>
												<div className="ui checkbox">
													<input id="enduranceTraining" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="enduranceTraining">Endurance Training</label>
												</div>
												<div className="ui checkbox">
													<input id="formingAndToning" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="formingAndToning">Forming and Toning</label>
												</div>
												<div className="ui checkbox">
													<input id="flexibility" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="flexibility">Flexibility</label>
												</div>
												<div className="ui checkbox">
													<input id="aerobicFitness" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="aerobicFitness">Aerobic Fitness</label>
												</div>
												<div className="ui checkbox">
													<input id="pregnancy" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="pregnancy">Pregnancy</label>
												</div>
												<div className="ui checkbox">
													<input id="rehabilitation" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="rehabilitation">Rehabilitation</label>
												</div>
												<div className="ui checkbox">
													<input id="pilates" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="pilates">Pilates</label>
												</div>
												<div className="ui checkbox">
													<input id="yoga" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="yoga">Yoga</label>
												</div>
												<div className="ui checkbox">
													<input id="athletic" tabIndex="0" type="checkbox" onChange={this.handleSpecialties} />
													<label htmlFor="athletic">Athletic</label>
												</div>
											</Form.Field>


											<Form.Field className={'field--cols'} >

												<div className="ui checkbox">
													<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
													<label htmlFor="online">Online</label>
												</div>
												<div className="ui checkbox">
													<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
													<label htmlFor="inperson">Inperson</label>
												</div>
												<div className="ui checkbox">
													<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
													<label htmlFor="both">both</label>
												</div>

											</Form.Field>
											{(this.state.online || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

										</>
									)}

								</div>
								{/* <Form.Field>
									<button className={`button button--secondary text--uppercase text--bold text--font-secondary`} onClick={this.handleNext}>Proceed</button>
								</Form.Field> */}
							</div>

							<div className={'form__inner--1'}>
								<div className="form__inner">
									<div style={{ marginBottom: '20px' }}>
										<h2>About You</h2>
										<p>We'd like to know more about you! The infromation you provide here will be part of your profile.</p>
									</div>
									<Form.Field>
										<label htmlFor="about">About / Experience *</label>
										<textarea id={'about'} placeholder="Tell us about You." onChange={this.handleChange} required></textarea>
									</Form.Field>

								</div>
							</div>

							<div className={'form__inner--1'}>
								<div className="form__inner">
									<div style={{ marginBottom: '20px' }}>
										<h2>Business Info</h2>
										<p>All business fields are required for your profile to be approved. This information will be provided to the client when they book with you.</p>
									</div>
									<Form.Field>
										<Input id="businessName" type="text" label="Business Name" onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<Input id="businessAddress1" type="text" label="Business Address 1 *" onChange={this.handleChange} required />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="businessAddress2" type="text" label="Business Address 2" onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="businessCity" type="text" label="City" defaultValue={this.props.profile.businessCity} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="businessState" type="text" label="State" defaultValue={this.props.profile.businessState} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="businessZip" type="text" label="Zip Code" defaultValue={this.props.profile.businessZip} onChange={this.handleChange} />
									</Form.Field>
								</div>
							</div>

							<div className={'form__inner--1'}>
								<div style={{ marginBottom: '0px' }}>
									<h2>Social Accounts</h2>
								</div>
								<div className="form__inner" style={{ marginTop: '0px' }}>
									<Form.Field className="field--half">
										<Input id="socialFacebook" type="url" label="Facebook" placeholder="Enter your Facebook profile url" defaultValue={this.props.profile.socialFacebook} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="socialTwitter" type="url" placeholder="Enter your Twitter profile url" label="Twitter" defaultValue={this.props.profile.socialTwitter} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="socialInstagram" type="url" placeholder="Enter your Instagram profile url" label="Instagram" defaultValue={this.props.profile.socialInstagram} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="socialPinterest" type="url" placeholder="Enter your Pinterest profile url" label="Pinterest" defaultValue={this.props.profile.socialPinterest} onChange={this.handleChange} />
									</Form.Field>
								</div>
							</div>

							<PaypalModal></PaypalModal>

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
				<Loading />
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
		completeOnboarding: (onboard,isDeclined) => dispatch(completeOnboarding(onboard,isDeclined))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Onboarding))