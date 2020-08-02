import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import imageChef from '../../assets/images/chef-cutting-veggies.jpeg';
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
			checkboxValidation: false,
			currentPage: 1,
			right: true,
			left: false
		}
		this.handleSpecialities = this.handleSpecialities.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	renderStates = (allStates) => {
		const states = [];
		allStates.forEach(st => {
			states.push(<option key={st.abbreviation} value={st.abbreviation}>{st.name}</option>);
		});
		return states;
	}

	componentDidMount() {
		// console.log("hello", this.props.profile.specialties)
		window.addEventListener('resize', this.renderOnboardingSlider);
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


	goNext = (num, e, validation) => {
		e.preventDefault()
		console.log(validation)
		if (validation) {

			let new_array = Object.values(this.state.specialties).filter(item => item == true)
			console.log(new_array)
			if (new_array.length === 0) {

				this.setState({

					checkboxValidation: true
				})

			} else {
				console.log('t', e);
				this.setState({
					left: false,
					right: true,
					currentPage: num,
					checkboxValidation: false
				})

			}

		} else {

			console.log('t', e);
			this.setState({
				left: false,
				right: true,
				currentPage: num,
				checkboxValidation: false
			})


		}


	}


	goBack = (num, e) => {
		e.preventDefault()
		// console.log('====================================');
		console.log('t', e);
		// console.log('====================================');
		this.setState({
			left: true,
			right: false,
			currentPage: num
		}, () => {
			/*

			const sliders = document.getElementsByClassName('onboarding__step-content-container');
			const sliderItemWidth = document.getElementsByClassName(`onboarding__step-content-area--${(num)}`)[0].clientWidth
			console.log(num-1)
				console.log(sliderItemWidth)

			
				sliders[0].setAttribute('style', 'transform:' +`translateX(-${(sliderItemWidth*(num-1)+90)}px)`  + '!important;');

			*/

		})
	}

	renderOnboardingSlider = () => {
		/*
		const sliders = document.getElementsByClassName('onboarding__step-content-container');
		const $this = this;
		for (var i = 0; i < sliders.length; i++) {
			var sliderWidth = sliders[i].parentElement.offsetWidth;
			var sliderItems = sliders[i].children.length;
			var totalWidth = sliderWidth * sliderItems;
			sliders[i].setAttribute('style', 'width:' + totalWidth + 'px;');
			sliders[i].setAttribute('data-slides', sliderWidth + 'px;');
			for (var j = 0; j < sliders[i].children.length; j++) {
				sliders[i].children[j].setAttribute('style', 'width:' + sliderWidth + 'px;');
			}
		}
		*/
	}

	render() {
		// console.log(this.state)
		const { projects, auth, profile, notifications } = this.props
		if (profile.onboardingCompleted) return <Redirect to='/dashboard' />
		if (profile.isEmpty !== true) {
			//window.onresize = this.renderOnboardingSlider();
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

					<div className="onboarding__step">
						<div className="onboarding__step-image">
							{profile.professions.chef ?
								<img src={imageChef} />
								: null}
							{profile.professions.massageTherapist ? <img src={imageChef} /> : null}
							{profile.professions.nutritionist ? <img src={imageChef} /> : null}
							{profile.professions.fitnessTrainer ? <img src={imageChef} /> : null}
						</div>
						<div className="onboarding__step-content">
							<div className='onboarding__step-content-container'>

								{this.state.currentPage == 1 &&
									<div className={`onboarding__step-content-area onboarding__step-content-area--1 ${this.state.currentPage === 1 ? 'active' : null}`}>
										<h1 className="text--bold">Onboarding</h1>
										<h2>Hi <span className="text--capitalize">{profile.firstName}</span>,</h2>
										<p>Welcome to the onboarding process! A verificaton email has been sent to your inbox.</p>
										<p>Please fill out as much information as possible so out admins can approve your profile as soon as possible.  <Link to="/contact">Contact us</Link> if you have any questions.</p>
										<button onClick={(e) => this.goNext(2, e)} className="button">Next</button>
									</div>
								}
								<Form className="form__secondary">
									{this.state.currentPage == 2 &&
										<Fade right={this.state.right} left={this.state.left}>
											<div className={`onboarding__step-content-area onboarding__step-content-area--2 ${this.state.currentPage === 2 ? 'active' : null}`}>
												<h2>Profile Image</h2>
												<p>Upload your profile image.</p>
												{profile.photoURL ?
													<img className="onboarding__profile-image" src={profile.photoURL} />
													: null}
												<ImageUpload />
												{profile.photoURL ?
													<>
														<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
															<button onClick={(e) => this.goBack(1, e)} className="button">Previous</button>
															<button type="submit" onClick={(e) => this.goNext(3, e)} className="button">Next</button>
														</div>
													</> : null}

											</div>
										</Fade>}
									{this.state.currentPage == 3 &&
										<Fade right={this.state.right} left={this.state.left}>
											<div className={`onboarding__step-content-area onboarding__step-content-area--3 ${this.state.currentPage === 3 ? 'active' : null}`}>
												<h2>License Image</h2>
												<p>Upload an image of any certification you'd like displayed in your profile.</p>
												<LicenseImageUpload />
												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(2, e)} className="button">Previous</button>
													<button onClick={(e) => this.goNext(4, e)} className="button">Next</button>
												</div>

											</div></Fade>}
									{this.state.currentPage == 4 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.goNext(5, e, true)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--4 ${this.state.currentPage === 4 ? 'active' : null}`}>
													<h2>Specialties</h2>
													<p>What are your specialties as a <span className={'text--bold'}>{profile.professions.chef ? 'Chef' : null}{profile.professions.fitnessTrainer ? 'Fitness Trainer' : null}{profile.professions.nutritionist ? 'Nutritionist' : null}{profile.professions.massageTherapist ? 'Massage Therapist' : null}</span>?</p>
													<p>Please choose atleast 1 specialties.</p>
													{profile.professions.chef && (
														<Form.Field className={'field--cols'} style={{ padding: '0px' }}>
															<div className="ui checkbox">
																<input id="seafood" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.seafood || this.state.specialties.seafood} onChange={this.handleSpecialities} />
																<label htmlFor="seafood">Seafood</label>
															</div>
															<div className="ui checkbox">
																<input id="american" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.american || this.state.specialties.american} onChange={this.handleSpecialities} />
																<label htmlFor="american">American</label>
															</div>
															<div className="ui checkbox">
																<input id="breakfastOrBrunch" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.breakfastOrBrunch || this.state.specialties.breakfastOrBrunch} onChange={this.handleSpecialities} />
																<label htmlFor="breakfastOrBrunch">Breakfast or Brunch</label>
															</div>
															<div className="ui checkbox">
																<input id="international" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.international || this.state.specialties.international} onChange={this.handleSpecialities} />
																<label htmlFor="international">International</label>
															</div>
															<div className="ui checkbox">
																<input id="southern" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.southern || this.state.specialties.southern} onChange={this.handleSpecialities} />
																<label htmlFor="southern">Southern</label>
															</div>
															<div className="ui checkbox">
																<input id="healthy" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.healthy || this.state.specialties.healthy} onChange={this.handleSpecialities} />
																<label htmlFor="healthy">Healthy</label>
															</div>
															<div className="ui checkbox">
																<input id="desserts" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.desserts || this.state.specialties.desserts} onChange={this.handleSpecialities} />
																<label htmlFor="desserts">Desserts</label>
															</div>
															<div className="ui checkbox">
																<input id="juicesAndSmoothies" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.juicesAndSmoothies || this.state.specialties.juicesAndSmoothies} onChange={this.handleSpecialities} />
																<label htmlFor="juicesAndSmoothies">Juices and Smoothies</label>
															</div>
														</Form.Field>
													)}

													{profile.professions.massageTherapist && (
														<Form.Field className={'field--cols'} style={{ padding: '0px' }}>
															<div className="ui checkbox">
																<input id="deepTissue" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.deepTissue || this.state.specialties.deepTissue} onChange={this.handleSpecialities} />
																<label htmlFor="deepTissue">Deep Tissue</label>
															</div>
															<div className="ui checkbox">
																<input id="swedish" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.swedish || this.state.specialties.swedish} onChange={this.handleSpecialities} />
																<label htmlFor="swedish">Swedish</label>
															</div>
															<div className="ui checkbox">
																<input id="stone" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.stone || this.state.specialties.stone} onChange={this.handleSpecialities} />
																<label htmlFor="stone">Stone</label>
															</div>
															<div className="ui checkbox">
																<input id="pregnancy" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pregnancy || this.state.specialties.pregnancy} onChange={this.handleSpecialities} />
																<label htmlFor="pregnancy">Pregnancy</label>
															</div>
															<div className="ui checkbox">
																<input id="sports" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.sports || this.state.specialties.sports} onChange={this.handleSpecialities} />
																<label htmlFor="sports">Sports</label>
															</div>
															<div className="ui checkbox">
																<input id="reflexology" tabindex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.reflexology || this.state.specialties.reflexology} onChange={this.handleSpecialities} />
																<label htmlFor="reflexology">Reflexology</label>
															</div>
														</Form.Field>
													)}

													{profile.professions.nutritionist && (
														<Form.Field className={'field--cols'} style={{ padding: '0px' }}>
															<div className="ui checkbox">
																<input id="normalNutrition" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.normalNutrition || this.state.specialties.normalNutrition} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="normalNutrition">Normal Nutrition</label>
															</div>
															<div className="ui checkbox">
																<input id="veganOrVegetarian" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.veganOrVegetarian || this.state.specialties.veganOrVegetarian} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="veganOrVegetarian">Vegan or Vegetarian</label>
															</div>
															<div className="ui checkbox">
																<input id="paleo" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.paleo || this.state.specialties.paleo} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="paleo">Paleo</label>
															</div>
															<div className="ui checkbox">
																<input id="publicHealth" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.publicHealth || this.state.specialties.publicHealth} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="publicHealth">Public Health</label>
															</div>
															<div className="ui checkbox">
																<input id="sports" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.sports || this.state.specialties.sports} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="sports">Sports</label>
															</div>
															<div className="ui checkbox">
																<input id="pediatric" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pediatric || this.state.specialties.pediatric} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="pediatric">Pediatric</label>
															</div>
															<div className="ui checkbox">
																<input id="diabetes" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.diabetes || this.state.specialties.diabetes} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="diabetes">Diabetes</label>
															</div>
															<div className="ui checkbox">
																<input id="heartHealth" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.heartHealth || this.state.specialties.heartHealth} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="heartHealth">Heart Health</label>
															</div>
															<div className="ui checkbox">
																<input id="autoimmuneDisease" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.autoimmuneDisease || this.state.specialties.autoimmuneDisease} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="autoimmuneDisease">Autoimmune Disease</label>
															</div>
															<div className="ui checkbox">
																<input id="foodAllergies" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.foodAllergies || this.state.specialties.foodAllergies} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="foodAllergies">Food Allergies</label>
															</div>
														</Form.Field>
													)}

													{profile.professions.fitnessTrainer && (
														<Form.Field className={'field--cols'} style={{ padding: '0px' }}>
															<div className="ui checkbox">
																<input id="competitionPrep" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.competitionPrep || this.state.specialties.competitionPrep} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="competitionPrep">Competition Prep</label>
															</div>
															<div className="ui checkbox">
																<input id="powerLifting" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.powerLifting || this.state.specialties.powerLifting} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="powerLifting">Powerlifting</label>
															</div>
															<div className="ui checkbox">
																<input id="weightLoss" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.weightLoss || this.state.specialties.weightLoss} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="weightLoss">Weight Loss</label>
															</div>
															<div className="ui checkbox">
																<input id="bodyFatLoss" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.bodyFatLoss || this.state.specialties.bodyFatLoss} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="bodyFatLoss">Body Fat Loss</label>
															</div>
															<div className="ui checkbox">
																<input id="sizeGaining" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.sizeGaining || this.state.specialties.sizeGaining} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="sizeGaining">Size Gaining</label>
															</div>
															<div className="ui checkbox">
																<input id="enduranceTraining" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.enduranceTraining || this.state.specialties.enduranceTraining} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="enduranceTraining">Endurance Training</label>
															</div>
															<div className="ui checkbox">
																<input id="formingAndToning" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.formingAndToning || this.state.specialties.formingAndToning} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="formingAndToning">Forming and Toning</label>
															</div>
															<div className="ui checkbox">
																<input id="flexibility" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.flexibility || this.state.specialties.flexibility} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="flexibility">Flexibility</label>
															</div>
															<div className="ui checkbox">
																<input id="aerobicFitness" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.aerobicFitness || this.state.specialties.aerobicFitness} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="aerobicFitness">Aerobic Fitness</label>
															</div>
															<div className="ui checkbox">
																<input id="pregnancy" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pregnancy || this.state.specialties.pregnancy} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="pregnancy">Pregnancy</label>
															</div>
															<div className="ui checkbox">
																<input id="rehabilitation" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.rehabilitation || this.state.specialties.rehabilitation} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="rehabilitation">Rehabilitation</label>
															</div>
															<div className="ui checkbox">
																<input id="pilates" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.pilates || this.state.specialties.pilates} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="pilates">Pilates</label>
															</div>
															<div className="ui checkbox">
																<input id="yoga" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.yoga || this.state.specialties.yoga} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="yoga">Yoga</label>
															</div>
															<div className="ui checkbox">
																<input id="athletic" tabIndex="0" type="checkbox" defaultChecked={profile.specialties && profile.specialties.athletic || this.state.specialties.athletic} onChange={this.handleSpecialities} />
																<label htmlhtmlFor="athletic">Athletic</label>
															</div>
														</Form.Field>
													)}
													{this.state.checkboxValidation &&
														<div className="status status--danger status--full" style={{ marginBottom: '20px' }}>
															Please Select at least 1 specialty.
														</div>
													}
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(3, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>

												</div></Form>
										</Fade>}
									{this.state.currentPage == 5 &&
										<Fade right={this.state.right} left={this.state.left} >
											<Form onSubmit={(e) => this.goNext(6, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--5 ${this.state.currentPage === 5 ? 'active' : null}`}>
													<h2>Rates</h2>
													<p>What are your rates per hour as a <span className={'text--bold'}>{profile.professions.chef ? 'Chef' : null}{profile.professions.fitnessTrainer ? 'Fitness Trainer' : null}{profile.professions.nutritionist ? 'Nutritionist' : null}{profile.professions.massageTherapist ? 'Massage Therapist' : null}</span>?</p>
													{profile.professions.chef && (
														<>
															<Form.Field className={'field--cols'} style={{ padding: '0' }} >
																<div className="ui checkbox">
																	<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
																	<label htmlhtmlFor="online">Online</label>
																</div>
																<div className="ui checkbox">
																	<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
																	<label htmlhtmlFor="inperson">In-Person</label>
																</div>
																<div className="ui checkbox">
																	<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
																	<label htmlhtmlFor="both">Both</label>
																</div>
															</Form.Field>
															{(this.state.online || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesOnlineChef'} type={'number'} defaultValue={profile.ratesOnlineChef && profile.ratesOnlineChef || this.state.ratesOnlineChef} placeholder={'min. $50 /hr'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}
															{(this.state.inperson || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesInPersonChef'} type={'number'} defaultValue={profile.ratesInPersonChef && profile.ratesInPersonChef || this.state.ratesInPersonChef} placeholder={'min. $50 /hr'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}

														</>
													)}

													{profile.professions.massageTherapist && (
														<>
															<Form.Field className={'field--cols'} style={{ padding: '0' }} >
																<div className="ui checkbox">
																	<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
																	<label htmlhtmlFor="online">Online</label>
																</div>
																<div className="ui checkbox">
																	<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
																	<label htmlhtmlFor="inperson">In Person</label>
																</div>
																<div className="ui checkbox">
																	<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
																	<label htmlhtmlFor="both">Both</label>
																</div>

															</Form.Field>
															{(this.state.online || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesOnlineMassageTherapist'} type={'number'} defaultValue={profile.ratesOnlineMassageTherapist && profile.ratesOnlineMassageTherapist || this.state.ratesOnlineMassageTherapist} placeholder={'min. $50 /hr'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}

															{(this.state.inperson || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesInPersonMassageTherapist'} type={'number'} defaultValue={profile.ratesInPersonMassageTherapist && profile.ratesInPersonMassageTherapist || this.state.ratesInPersonMassageTherapist} placeholder={'min. $50 /hr'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}

														</>
													)}

													{profile.professions.nutritionist && (
														<>
															<Form.Field className={'field--cols'} style={{ padding: '0' }} >
																<div className="ui checkbox">
																	<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
																	<label htmlhtmlFor="online">Online</label>
																</div>
																<div className="ui checkbox">
																	<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
																	<label htmlhtmlFor="inperson">In Person</label>
																</div>
																<div className="ui checkbox">
																	<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
																	<label htmlhtmlFor="both">Both</label>
																</div>

															</Form.Field>
															{(this.state.online || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesOnlineNutritionist'} type={'number'} defaultValue={profile.ratesOnlineNutritionist && profile.ratesOnlineNutritionist || this.state.ratesOnlineNutritionist} placeholder={'min. $50 /hr'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}

															{(this.state.inperson || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesInPersonNutritionist'} type={'number'} defaultValue={profile.ratesInPersonNutritionist && profile.ratesInPersonNutritionist || this.state.ratesInPersonNutritionist} placeholder={'min. $50 /hr'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}

														</>
													)}

													{profile.professions.fitnessTrainer && (
														<>

															<Form.Field className={'field--cols'} style={{ padding: '0' }}>
																<div className="ui checkbox">
																	<input id="online" tabIndex="0" type="radio" checked={this.state.online} defaultChecked={false} onChange={(e) => this.handleSelector("online", e)} />
																	<label htmlhtmlFor="online">Online</label>
																</div>
																<div className="ui checkbox">
																	<input id="inperson" tabIndex="0" checked={this.state.inperson} type="radio" defaultChecked={false} onChange={(e) => this.handleSelector("inperson", e)} />
																	<label htmlhtmlFor="inperson">In Person</label>
																</div>
																<div className="ui checkbox">
																	<input id="both" tabIndex="0" checked={this.state.both} type="radio" defaultChecked={true} onChange={(e) => this.handleSelector("both", e)} />
																	<label htmlhtmlFor="both">Both</label>
																</div>

															</Form.Field>
															{(this.state.online || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesOnlineFitnessTrainer'} type={'number'} defaultValue={profile.ratesOnlineFitnessTrainer && profile.ratesOnlineFitnessTrainer || this.state.ratesOnlineFitnessTrainer} placeholder={'min. $50 /hr'} label={'Your Online Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}

															{(this.state.inperson || this.state.both) &&
																<Form.Field className={'field--half'}>
																	<Input id={'ratesInPersonFitnessTrainer'} type={'number'} defaultValue={profile.ratesInPersonFitnessTrainer && profile.ratesInPersonFitnessTrainer || this.state.ratesInPersonFitnessTrainer} placeholder={'min. $50 /hr'} label={'Your In-Person Rates'} min={50} required onChange={this.handleRateChange} />
																</Form.Field>
															}

														</>
													)}
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(4, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
													{this.state.error &&
														<div className="status status--danger status--full">
															{this.state.error}
														</div>
													}

												</div>	</Form>
										</Fade>}
									{this.state.currentPage == 6 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.goNext(7, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--6 ${this.state.currentPage === 6 ? 'active' : null}`}>
													<h2>About You</h2>
													<p>We'd like to know more about you! The information you provide here will be part of your profile.</p>
													<Form.Field>
														<label className="screen-reader-text" htmlhtmlFor="about">About / Experience *</label>
														<textarea id={'about'} placeholder="Tell us about You." defaultValue={profile.about || this.state.about} onChange={this.handleChange} required></textarea>
													</Form.Field>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(5, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
													{this.state.error &&
														<div className="status status--danger status--full">
															{this.state.error}
														</div>
													}
												</div></Form>
										</Fade>}
									{this.state.currentPage == 7 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.goNext(8, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--7 ${this.state.currentPage === 7 ? 'active' : null}`}>
													<h2>What's a fun fact about you?</h2>
													<Form.Field>
														<label className="screen-reader-text" htmlhtmlFor="funFact">Fun Fact</label>
														<textarea id={'funFact'} placeholder="Tell us a fun fact about You." defaultValue={profile.funFact || this.state.funFact} onChange={this.handleChange}></textarea>
													</Form.Field>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(6, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
													{this.state.error &&
														<div className="status status--danger status--full">
															{this.state.error}
														</div>
													}
												</div></Form>
										</Fade>

									}
									{this.state.currentPage == 8 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.goNext(9, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--8 ${this.state.currentPage === 8 ? 'active' : null}`}>
													<h2>What's your favorite quote?</h2>
													<Form.Field>
														<label className="screen-reader-text" htmlFor="favQuote">Favorite Quote</label>
														<textarea required id={'favQuote'} placeholder="Tell us Your favorite quote." defaultValue={profile.favQuote || this.state.favQuote} onChange={this.handleChange}></textarea>
													</Form.Field>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(7, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
												</div></Form>
										</Fade>}
									{this.state.currentPage == 9 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.goNext(10, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--9 ${this.state.currentPage === 9 ? 'active' : null}`}>
													<h2>Business Info</h2>
													<p>All business fields are required for your profile to be approved. This information will be provided to the client when they book with you.</p>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(8, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
													{this.state.error &&
														<div className="status status--danger status--full">
															{this.state.error}
														</div>
													}
												</div></Form>
										</Fade>}
									{this.state.currentPage == 10 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.goNext(11, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--10 ${this.state.currentPage === 10 ? 'active' : null}`}>
													<h2>Business Info</h2>
													<div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
														<Form.Field>
															<Input id="businessName" type="text" label="Business Name" defaultValue={profile.businessName || this.state.businessName} onChange={this.handleChange} />
														</Form.Field>
														<Form.Field>
															<Input id="businessAddress1" type="text" label="Business Address 1 *" defaultValue={profile.businessAddress1 || this.state.businessAddress1} onChange={this.handleChange} required />
														</Form.Field>
														<Form.Field className="field--half">
															<Input id="businessAddress2" type="text" label="Business Address 2" defaultValue={profile.businessAddress2 || this.state.businessAddress2} onChange={this.handleChange} />
														</Form.Field>
														<Form.Field className="field--half">
															<Input id="businessCity" type="text" label="City" defaultValue={profile.businessCity || this.state.businessCity} onChange={this.handleChange} />
														</Form.Field>
														<Form.Field className="field--half">
															<label htmlFor="businessState">State</label>
															<select id="businessState" defaultValue={profile.businessState || this.state.businessState} onChange={this.handleChange} required>
																<option>Select State</option>
																{this.renderStates(states)}
															</select>
														</Form.Field>
														<Form.Field className="field--half">
															<Input id="businessZip" type="text" label="Zip Code" defaultValue={profile.businessZip || this.state.businessZip} onChange={this.handleChange} />
														</Form.Field>
													</div>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(9, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
													{this.state.error &&
														<div className="status status--danger status--full">
															{this.state.error}
														</div>
													}
												</div></Form>
										</Fade>}
									{this.state.currentPage == 11 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.props.profile.isProPremium ? this.goNext(12, e) : this.goNext(13, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--11 ${this.state.currentPage === 11 ? 'active' : null}`}>
													<PaypalModal></PaypalModal>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start', marginTop: '20px' }}>
														<button onClick={(e) => this.goBack(9, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
													{this.state.error &&
														<div className="status status--danger status--full">
															{this.state.error}
														</div>
													}
												</div></Form>
										</Fade>}
									{this.props.profile.isProPremium &&
										this.state.currentPage == 12 &&
										<Fade right={this.state.right} left={this.state.left}>
											<Form onSubmit={(e) => this.goNext(13, e)}>
												<div className={`onboarding__step-content-area onboarding__step-content-area--12 ${this.state.currentPage === 12 ? 'active' : null}`}>
													<div style={{ marginBottom: '0px' }}>
														<h2>Social Accounts</h2>
													</div>
													<div className="form__inner" style={{ marginTop: '0px' }}>
														<Form.Field className="field--half">
															<Input id="socialFacebook" type="url" label="Facebook" placeholder="Enter your Facebook profile url" defaultValue={profile.socialFacebook || this.state.socialFacebook} onChange={this.handleChange} />
														</Form.Field>
														<Form.Field className="field--half">
															<Input id="socialTwitter" type="url" placeholder="Enter your Twitter profile url" label="Twitter" defaultValue={profile.socialTwitter || this.state.socialTwitter} onChange={this.handleChange} />
														</Form.Field>
														<Form.Field className="field--half">
															<Input id="socialInstagram" type="url" placeholder="Enter your Instagram profile url" label="Instagram" defaultValue={profile.socialInstagram || this.state.socialInstagram} onChange={this.handleChange} />
														</Form.Field>
														<Form.Field className="field--half">
															<Input id="socialPinterest" type="url" placeholder="Enter your Pinterest profile url" label="Pinterest" defaultValue={profile.socialPinterest || this.state.socialPinterest} onChange={this.handleChange} />
														</Form.Field>
													</div>
													{this.state.error &&
														<div className="status status--danger status--full">
															{this.state.error}
														</div>
													}

													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(9, e)} className="button">Previous</button>
														<button type="submit" className="button">Next</button>
													</div>
												</div></Form>
										</Fade>}
									{this.state.currentPage == 13 &&
										<Fade right={this.state.right} left={this.state.left}>
											<div className={`onboarding__step-content-area onboarding__step-content-area--13 ${this.state.currentPage === 13 ? 'active' : null}`}>
												<div style={{ marginBottom: '0px' }}>
													<h2>You did it!</h2>
												</div>
												<div className="form__inner" style={{ marginBottom: '10px' }}>
													<p>Once you complete the onboarding, your application will be reviewed by our team. And your profile will be seen by clients after approval.</p>
													<p>Don't worry, you'll still be able to use the website and update your profile!</p>
												</div>
												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(9, e)} className="button">Previous</button>
													<button type="submit" onClick={this.handleSubmit} className="button button--secondary text--md text--font-secondary text--uppercase">Complete Onboarding</button>
												</div>
											</div>
										</Fade>
									}
								</Form>
							</div>

						</div>
					</div>
				</div >
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