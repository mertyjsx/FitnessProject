import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import ellipses from '../../assets/images/ellipsis.gif';
import states from '../../json/states.json';
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
			inperson: false,
			specialties: {},
			checkboxValidation: false
		}
		this.handleSpecialities = this.handleSpecialities.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	renderStates = (allStates) => {
		const states = [];
		allStates.forEach(st => {
			states.push(<option value={st.abbreviation}>{st.name}</option>);
		});
		return states;
	}

	componentDidMount() {
		// console.log("hello", this.props.profile.specialties)
		let specialties = this.props.profile.specialties ? this.props.profile.specialties : {}
		this.setState({ specialties: specialties })
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			// console.log("hello", this.props.profile.specialties)
			let specialties = this.props.profile.specialties ? this.props.profile.specialties : {}
			this.setState({ specialties: specialties })
		}
	}

	handleSpecialities = (e) => {
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

		let speArray = Object.values(this.state.specialties)

		let CheckArray = speArray.filter(item => item)

		let $this = this

		if (CheckArray.length < 1) {
			this.setState({ checkboxValidation: true })
			setTimeout(function () {
				// console.log('wait 3 secs', $this.state, $this.props.auth.uid);
				$this.setState({ checkboxValidation: false })
			}, 3000)
		} else {
			$this.setState({
				onboardingUploading: true
			})
			setTimeout(function () {
				// console.log('wait 3 secs', $this.state, $this.props.auth.uid);
				$this.props.completeOnboarding($this.state, $this.props.profile.isDeclined);
				$this.props.history.push('/dashboard')
			}, 3000)
		}
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
		// console.log(this.state)
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
									<div style={{width:"100%",height:100}}>
										<h2>Profile Image</h2>
										<p>Upload your profile image below.</p>
										
									</div>
									<img 
									style={{width:300,height:300,border:"1px solid black"}}
									 src={profile.photoURL}></img>
									<ImageUpload />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<div style={{width:"100%",height:100}}>
										<h2>License Image</h2>
										<p>Upload an image of any certification you'd like displayed in your profile.</p>
									
									</div>
									<img 
									style={{width:300,height:300,border:"1px solid black"}}
									></img>
									<LicenseImageUpload />
								</Form.Field>
							</div>
						</div>

						<Form onSubmit={this.handleSubmit}>

							<div className={'form__inner--1'}>
								<div className={'form__inner '}>
									<div>
										<h2>Specialties</h2>
										<p>What are your specialties as a <span className={'text--bold'}>{profile.professions.chef ? 'Chef' : null}{profile.professions.fitnessTrainer ? 'Fitness Trainer' : null}{profile.professions.nutritionist ? 'Nutritionist' : null}{profile.professions.massageTherapist ? 'Massage Therapist' : null}</span>?</p>
									</div>

									{profile.professions.chef && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="seafood" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.seafood} onChange={this.handleSpecialities} />
													<label for="seafood">Seafood</label>
												</div>
												<div className="ui checkbox">
													<input id="american" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.american} onChange={this.handleSpecialities} />
													<label for="american">American</label>
												</div>
												<div className="ui checkbox">
													<input id="breakfastOrBrunch" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.breakfastOrBrunch} onChange={this.handleSpecialities} />
													<label for="breakfastOrBrunch">Breakfast or Brunch</label>
												</div>
												<div className="ui checkbox">
													<input id="international" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.international} onChange={this.handleSpecialities} />
													<label for="international">International</label>
												</div>
												<div className="ui checkbox">
													<input id="southern" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.southern} onChange={this.handleSpecialities} />
													<label for="southern">Southern</label>
												</div>
												<div className="ui checkbox">
													<input id="healthy" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.healthy} onChange={this.handleSpecialities} />
													<label for="healthy">Healthy</label>
												</div>
												<div className="ui checkbox">
													<input id="desserts" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.desserts} onChange={this.handleSpecialities} />
													<label for="desserts">Desserts</label>
												</div>
												<div className="ui checkbox">
													<input id="juicesAndSmoothies" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.juicesAndSmoothies} onChange={this.handleSpecialities} />
													<label for="juicesAndSmoothies">Juices and Smoothies</label>
												</div>
											</Form.Field>


											<Form.Field className={'field--cols'} style={{ padding: '0' }} >
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
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} defaultValue={profile.ratesOnlineFitnessTrainer ? profile.ratesOnlineFitnessTrainer : false} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} defaultValue={profile.ratesInPersonFitnessTrainer ? profile.ratesInPersonFitnessTrainer : false} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

										</>
									)}

									{profile.professions.massageTherapist && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="deepTissue" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.deepTissue} onChange={this.handleSpecialities} />
													<label for="deepTissue">Deep Tissue</label>
												</div>
												<div className="ui checkbox">
													<input id="swedish" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.swedish} onChange={this.handleSpecialities} />
													<label for="swedish">Swedish</label>
												</div>
												<div className="ui checkbox">
													<input id="stone" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.stone} onChange={this.handleSpecialities} />
													<label for="stone">Stone</label>
												</div>
												<div className="ui checkbox">
													<input id="pregnancy" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pregnancy} onChange={this.handleSpecialities} />
													<label for="pregnancy">Pregnancy</label>
												</div>
												<div className="ui checkbox">
													<input id="sports" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.sports} onChange={this.handleSpecialities} />
													<label for="sports">Sports</label>
												</div>
												<div className="ui checkbox">
													<input id="reflexology" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.reflexology} onChange={this.handleSpecialities} />
													<label for="reflexology">Reflexology</label>
												</div>
											</Form.Field>
											<Form.Field className={'field--cols'} style={{ padding: '0' }} >
												<div style={{ flex: '0 1 100%' }}>
													<h2>Rates</h2>
												</div>
												<div className="ui checkbox">
													<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
													<label htmlFor="online">Online</label>
												</div>
												<div className="ui checkbox">
													<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
													<label htmlFor="inperson">In Person</label>
												</div>
												<div className="ui checkbox">
													<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
													<label htmlFor="both">Both</label>
												</div>

											</Form.Field>
											{(this.state.online || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} defaultValue={profile.ratesOnlineFitnessTrainer ? profile.ratesOnlineFitnessTrainer : false} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} defaultValue={profile.ratesInPersonFitnessTrainer ? profile.ratesInPersonFitnessTrainer : false} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

										</>
									)}

									{profile.professions.nutritionist && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="normalNutrition" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.normalNutrition} onChange={this.handleSpecialities} />
													<label htmlFor="normalNutrition">Normal Nutrition</label>
												</div>
												<div className="ui checkbox">
													<input id="veganOrVegetarian" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.veganOrVegetarian} onChange={this.handleSpecialities} />
													<label htmlFor="veganOrVegetarian">Vegan or Vegetarian</label>
												</div>
												<div className="ui checkbox">
													<input id="paleo" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.paleo} onChange={this.handleSpecialities} />
													<label htmlFor="paleo">Paleo</label>
												</div>
												<div className="ui checkbox">
													<input id="publicHealth" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.publicHealth} onChange={this.handleSpecialities} />
													<label htmlFor="publicHealth">Public Health</label>
												</div>
												<div className="ui checkbox">
													<input id="sports" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.sports} onChange={this.handleSpecialities} />
													<label htmlFor="sports">Sports</label>
												</div>
												<div className="ui checkbox">
													<input id="pediatric" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pediatric} onChange={this.handleSpecialities} />
													<label htmlFor="pediatric">Pediatric</label>
												</div>
												<div className="ui checkbox">
													<input id="diabetes" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.diabetes} onChange={this.handleSpecialities} />
													<label htmlFor="diabetes">Diabetes</label>
												</div>
												<div className="ui checkbox">
													<input id="heartHealth" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.heartHealth} onChange={this.handleSpecialities} />
													<label htmlFor="heartHealth">Heart Health</label>
												</div>
												<div className="ui checkbox">
													<input id="autoimmuneDisease" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.autoimmuneDisease} onChange={this.handleSpecialities} />
													<label htmlFor="autoimmuneDisease">Autoimmune Disease</label>
												</div>
												<div className="ui checkbox">
													<input id="foodAllergies" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.foodAllergies} onChange={this.handleSpecialities} />
													<label htmlFor="foodAllergies">Food Allergies</label>
												</div>
											</Form.Field>
											<Form.Field className={'field--cols'} style={{ padding: '0' }} >
												<div style={{ flex: '0 1 100%' }}>
													<h2>Rates</h2>
												</div>
												<div className="ui checkbox">
													<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
													<label htmlFor="online">Online</label>
												</div>
												<div className="ui checkbox">
													<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
													<label htmlFor="inperson">In Person</label>
												</div>
												<div className="ui checkbox">
													<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
													<label htmlFor="both">Both</label>
												</div>

											</Form.Field>
											{(this.state.online || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} defaultValue={profile.ratesOnlineFitnessTrainer ? profile.ratesOnlineFitnessTrainer : false} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} defaultValue={profile.ratesInPersonFitnessTrainer ? profile.ratesInPersonFitnessTrainer : false} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

										</>
									)}

									{profile.professions.fitnessTrainer && (
										<>
											<Form.Field className={'field--cols'}>
												<div className="ui checkbox">
													<input id="competitionPrep" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.competitionPrep} onChange={this.handleSpecialities} />
													<label htmlFor="competitionPrep">Competition Prep</label>
												</div>
												<div className="ui checkbox">
													<input id="powerLifting" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.powerLifting} onChange={this.handleSpecialities} />
													<label htmlFor="powerLifting">Powerlifting</label>
												</div>
												<div className="ui checkbox">
													<input id="weightLoss" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.weightLoss} onChange={this.handleSpecialities} />
													<label htmlFor="weightLoss">Weight Loss</label>
												</div>
												<div className="ui checkbox">
													<input id="bodyFatLoss" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.bodyFatLoss} onChange={this.handleSpecialities} />
													<label htmlFor="bodyFatLoss">Body Fat Loss</label>
												</div>
												<div className="ui checkbox">
													<input id="sizeGaining" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.sizeGaining} onChange={this.handleSpecialities} />
													<label htmlFor="sizeGaining">Size Gaining</label>
												</div>
												<div className="ui checkbox">
													<input id="enduranceTraining" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.enduranceTraining} onChange={this.handleSpecialities} />
													<label htmlFor="enduranceTraining">Endurance Training</label>
												</div>
												<div className="ui checkbox">
													<input id="formingAndToning" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.formingAndToning} onChange={this.handleSpecialities} />
													<label htmlFor="formingAndToning">Forming and Toning</label>
												</div>
												<div className="ui checkbox">
													<input id="flexibility" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.flexibility} onChange={this.handleSpecialities} />
													<label htmlFor="flexibility">Flexibility</label>
												</div>
												<div className="ui checkbox">
													<input id="aerobicFitness" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.aerobicFitness} onChange={this.handleSpecialities} />
													<label htmlFor="aerobicFitness">Aerobic Fitness</label>
												</div>
												<div className="ui checkbox">
													<input id="pregnancy" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pregnancy} onChange={this.handleSpecialities} />
													<label htmlFor="pregnancy">Pregnancy</label>
												</div>
												<div className="ui checkbox">
													<input id="rehabilitation" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.rehabilitation} onChange={this.handleSpecialities} />
													<label htmlFor="rehabilitation">Rehabilitation</label>
												</div>
												<div className="ui checkbox">
													<input id="pilates" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pilates} onChange={this.handleSpecialities} />
													<label htmlFor="pilates">Pilates</label>
												</div>
												<div className="ui checkbox">
													<input id="yoga" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.yoga} onChange={this.handleSpecialities} />
													<label htmlFor="yoga">Yoga</label>
												</div>
												<div className="ui checkbox">
													<input id="athletic" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.athletic} onChange={this.handleSpecialities} />
													<label htmlFor="athletic">Athletic</label>
												</div>
											</Form.Field>


											<Form.Field className={'field--cols'} style={{ padding: '0' }}>
												<div style={{ flex: '0 1 100%' }}>
													<h2>Rates</h2>
												</div>
												<div className="ui checkbox">
													<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
													<label htmlFor="online">Online</label>
												</div>
												<div className="ui checkbox">
													<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
													<label htmlFor="inperson">In Person</label>
												</div>
												<div className="ui checkbox">
													<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
													<label htmlFor="both">Both</label>
												</div>

											</Form.Field>
											{(this.state.online || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesOnlineFitnessTrainer'} type={'number'} defaultValue={profile.ratesOnlineFitnessTrainer ? profile.ratesOnlineFitnessTrainer : false} placeholder={'min. 50'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
												</Form.Field>
											}

											{(this.state.inperson || this.state.both) &&
												<Form.Field className={'field--half'}>
													<Input id={'ratesInPersonFitnessTrainer'} type={'number'} defaultValue={profile.ratesInPersonFitnessTrainer ? profile.ratesInPersonFitnessTrainer : false} placeholder={'min. 50'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
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
										<p>We'd like to know more about you! The information you provide here will be part of your profile.</p>
									</div>
									<Form.Field>
										<label htmlFor="about">About / Experience *</label>
										<textarea id={'about'} placeholder="Tell us about You." defaultValue={profile.about} onChange={this.handleChange} required></textarea>
									</Form.Field>

									<Form.Field>
										<label htmlFor="funFact">Fun Fact</label>
										<textarea id={'funFact'} placeholder="Tell us a fun fact about You." defaultValue={profile.funFact} onChange={this.handleChange}></textarea>
									</Form.Field>
									<Form.Field>
										<label htmlFor="favQuote">Favorite Quote</label>
										<textarea id={'favQuote'} placeholder="Tell us Your favorite quote." defaultValue={profile.favQuote} onChange={this.handleChange}></textarea>
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
										<Input id="businessName" type="text" label="Business Name" defaultValue={this.props.profile.businessName} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field>
										<Input id="businessAddress1" type="text" label="Business Address 1 *" defaultValue={this.props.profile.businessAddress1} onChange={this.handleChange} required />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="businessAddress2" type="text" label="Business Address 2" defaultValue={this.props.profile.businessAddress2} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="businessCity" type="text" label="City" defaultValue={this.props.profile.businessCity} onChange={this.handleChange} />
									</Form.Field>
									<Form.Field className="field--half">
										<label htmlFor="businessState">State</label>
										<select id="businessState" defaultValue={this.props.profile.businessState} onChange={this.handleChange} required>
											<option>Select State</option>
											{this.renderStates(states)}
										</select>
									</Form.Field>
									<Form.Field className="field--half">
										<Input id="businessZip" type="text" label="Zip Code" defaultValue={this.props.profile.businessZip} onChange={this.handleChange} />
									</Form.Field>
								</div>
							</div>
							{this.props.profile.isProPremium &&
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
							}

							<PaypalModal></PaypalModal>

							<div className={'form__inner--2'}>
								<div className="form__inner">
									<Form.Field>
										<Button type="submit" className="button button--secondary text--md text--font-secondary text--uppercase">Complete Onboarding</Button>
									</Form.Field>
								</div>
							</div>
							{this.state.checkboxValidation &&
								<div className="status status--danger status--full">
									<p>Please choose atleast 1 specialties.</p>
								</div>
							}
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
		completeOnboarding: (onboard, isDeclined) => dispatch(completeOnboarding(onboard, isDeclined))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Onboarding))