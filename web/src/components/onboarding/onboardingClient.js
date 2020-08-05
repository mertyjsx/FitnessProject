import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import imageChef from '../../assets/images/chef-cutting-veggies.jpeg';
import ellipses from '../../assets/images/ellipsis.gif';
import states from '../../json/states.json';
import { completeOnboardingClient } from '../../store/actions/authActions';
import Loading from '../modules/Loading';

class OnboardingClient extends Component {

	constructor(props) {
		super(props)
		this.state = {
			onboardingUploading: false,
			interests: {},
			checkboxValidation: false,
			currentPage: 1,
			right: true,
			left: false,
			error: ""
		}
		this.handleInterests = this.handleInterests.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	handleInterests = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			interests: {
				...this.state.interests,
				[e.target.id]: e.target.checked
			}
		})
	}

	renderStates = (allStates) => {
		const agg = [];
		allStates.forEach(st => {
			agg.push(<option value={st.abbreviation}>{st.name}</option>);
		});
		return agg;
	};

	onChange = (e) => {
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

		let interestsArray = Object.values(this.state.interests)
		// console.log(interestsArray)
		let CheckArray = interestsArray.filter(item => item)
		// console.log(CheckArray)

		if (CheckArray.length < 1) {
			this.setState({ checkboxValidation: true })
			setTimeout(function () {
				// console.log('wait 3 secs', $this.state, $this.props.auth.uid);
				$this.setState({ checkboxValidation: false })
			}, 3000)
		} else {
			$this.setState({
				onboardingUploading: true,
			})
			setTimeout(function () {
				// console.log('wait 3 secs', $this.state, $this.props.auth.uid);
				$this.props.completeOnboarding($this.state);
				$this.props.history.push('/dashboard')
			}, 3000)
		}
	}

	goNext = (num, e, validation) => {
		e.preventDefault()
		let error = false
		if (validation && validation.length > 0) {
			validation.map(item => {
				console.log(item.which)
				console.log(this.state[item.which])
				if (!this.state[item.which]) {
					this.setState({ error: item.error })
					error = true
				}
			})
			if (!error) {

				console.log('t', e);
				this.setState({
					left: false,
					right: true,
					currentPage: num,
					error: ""
				})
			}
		} else {
			// console.log('t', e);
			this.setState({
				left: false,
				right: true,
				currentPage: num,
				error: ""
			})
		}
	}

	goBack = (num, e) => {
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
	render() {
		// console.log(this.state)
		const { projects, auth, profile, notifications } = this.props
		if (profile.isOnboardingClientCompleted || profile.isPro) return <Redirect to='/dashboard' />

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

					<div className="onboarding__step">
						<div className="onboarding__step-image">
							<img src={imageChef} />
						</div>
						<div className="onboarding__step-content">
							<div className='onboarding__step-content-container'>
								{this.state.currentPage == 1 &&
									<Fade right={this.state.right} left={this.state.left}>
										<div class="container onboarding__step onboarding__step--1 active">
											<div className="onboarding__step-container">
												<h1 className="text--bold">Welcome to the Onboarding</h1>
												<h2>Hi <span className="text--capitalize">{profile.firstName}</span>,</h2>
												<p>Welcome to the onboarding process! Please fill out as much information as possible   <Link to="/contact">Contact us</Link> if you have any questions.</p>
												<button onClick={(e) => this.goNext(2, e)} className="button">Next</button>
											</div>
										</div>
									</Fade>}

								<Form className="form__secondary" onSubmit={this.handleSubmit}>

									{this.state.currentPage == 2 &&
										<Fade right={this.state.right} left={this.state.left}>
											<h2>Select Chef Related Interests</h2>
											<div>
												<p>This helps us match your interests with our Pros.</p>
											</div>

											<div className="form__inner">
												<div className={`divider`} style={{ margin: '10px 0 30px' }}></div>
												<legend className="text--uppercase text--bold">Chef Interests</legend>
												<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
													<div className="ui checkbox">
														<input id="seafood" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.seafood || this.state.interests.seafood} onChange={this.handleInterests} />
														<label for="seafood">Seafood</label>
													</div>
													<div className="ui checkbox">
														<input id="american" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.american || this.state.interests.american} onChange={this.handleInterests} />
														<label for="american">American</label>
													</div>
													<div className="ui checkbox">
														<input id="breakfastOrBrunch" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.breakfastOrBrunch || this.state.interests.breakfastOrBrunch} onChange={this.handleInterests} />
														<label for="breakfastOrBrunch">Breakfast or Brunch</label>
													</div>
													<div className="ui checkbox">
														<input id="international" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.international || this.state.interests.international} onChange={this.handleInterests} />
														<label for="international">International</label>
													</div>
													<div className="ui checkbox">
														<input id="southern" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.southern || this.state.interests.southern} onChange={this.handleInterests} />
														<label for="southern">Southern</label>
													</div>
													<div className="ui checkbox">
														<input id="healthy" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.healthy || this.state.interests.healthy} onChange={this.handleInterests} />
														<label for="healthy">Healthy</label>
													</div>
													<div className="ui checkbox">
														<input id="desserts" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.desserts || this.state.interests.desserts} onChange={this.handleInterests} />
														<label for="desserts">Desserts</label>
													</div>
													<div className="ui checkbox">
														<input id="juicesAndSmoothies" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.juicesAndSmoothies || this.state.interests.juicesAndSmoothies} onChange={this.handleInterests} />
														<label for="juicesAndSmoothies">Juices and Smoothies</label>
													</div>

													{this.state.error &&
														<div className="status status--danger status--full">{this.state.error}</div>
													}
												</Form.Field>

												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(1, e)} className="button">Previous</button>
													<button onClick={(e) => this.goNext(3, e)} className="button">Next</button>
												</div>
											</div>
										</Fade>
									}

									{this.state.currentPage == 3 &&
										<Fade right={this.state.right} left={this.state.left}>
											<h2>Select Fitness Related Interests</h2>
											<div>
												<p>This helps us match your interests with our Pros.</p>
											</div>
											<div className="form__inner">
												<div className={`divider`} style={{ margin: '30px 0' }}></div>
												<legend className="text--uppercase text--bold">Fitness Interests</legend>
												<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
													<div className="ui checkbox">
														<input id="competitionPrep" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.competitionPrep || this.state.interests.competitionPrep} onChange={this.handleInterests} />
														<label htmlFor="competitionPrep">Competition Prep</label>
													</div>
													<div className="ui checkbox">
														<input id="powerLifting" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.powerLifting || this.state.interests.powerLifting} onChange={this.handleInterests} />
														<label htmlFor="powerLifting">Powerlifting</label>
													</div>
													<div className="ui checkbox">
														<input id="weightLoss" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.weightLoss || this.state.interests.weightLoss} onChange={this.handleInterests} />
														<label htmlFor="weightLoss">Weight Loss</label>
													</div>
													<div className="ui checkbox">
														<input id="bodyFatLoss" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.bodyFatLoss || this.state.interests.bodyFatLoss} onChange={this.handleInterests} />
														<label htmlFor="bodyFatLoss">Body Fat Loss</label>
													</div>
													<div className="ui checkbox">
														<input id="sizeGaining" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.sizeGaining || this.state.interests.sizeGaining} onChange={this.handleInterests} />
														<label htmlFor="sizeGaining">Size Gaining</label>
													</div>
													<div className="ui checkbox">
														<input id="enduranceTraining" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.enduranceTraining || this.state.interests.enduranceTraining} onChange={this.handleInterests} />
														<label htmlFor="enduranceTraining">Endurance Training</label>
													</div>
													<div className="ui checkbox">
														<input id="formingAndToning" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.formingAndToning || this.state.interests.formingAndToning} onChange={this.handleInterests} />
														<label htmlFor="formingAndToning">Forming and Toning</label>
													</div>
													<div className="ui checkbox">
														<input id="flexibility" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.flexibility || this.state.interests.flexibility} onChange={this.handleInterests} />
														<label htmlFor="flexibility">Flexibility</label>
													</div>
													<div className="ui checkbox">
														<input id="aerobicFitness" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.aerobicFitness || this.state.interests.aerobicFitness} onChange={this.handleInterests} />
														<label htmlFor="aerobicFitness">Aerobic Fitness</label>
													</div>
													<div className="ui checkbox">
														<input id="pregnancy" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.pregnancy || this.state.interests.pregnancy} onChange={this.handleInterests} />
														<label htmlFor="pregnancy">Pregnancy</label>
													</div>
													<div className="ui checkbox">
														<input id="rehabilitation" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.rehabilitation || this.state.interests.rehabilitation} onChange={this.handleInterests} />
														<label htmlFor="rehabilitation">Rehabilitation</label>
													</div>
													<div className="ui checkbox">
														<input id="pilates" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.pilates || this.state.interests.pilates} onChange={this.handleInterests} />
														<label htmlFor="pilates">Pilates</label>
													</div>
													<div className="ui checkbox">
														<input id="yoga" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.yoga || this.state.interests.yoga} onChange={this.handleInterests} />
														<label htmlFor="yoga">Yoga</label>
													</div>
													<div className="ui checkbox">
														<input id="athletic" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.athletic || this.state.interests.athletic} onChange={this.handleInterests} />
														<label htmlFor="athletic">Athletic</label>
													</div>

												</Form.Field>
												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(2, e)} className="button">Previous</button>
													<button onClick={(e) => this.goNext(4, e)} className="button">Next</button>
												</div>
												{this.state.error &&
													<div className="status status--danger status--full">{this.state.error}</div>
												}
											</div>
										</Fade>
									}

									{this.state.currentPage == 4 &&
										<Fade right={this.state.right} left={this.state.left}>
											<h2>Select Nutrition Related Interests</h2>
											<div>
												<p>This helps us match your interests with our Pros.</p>
											</div>
											<div className="form__inner">
												<div className={`divider`} style={{ margin: '30px 0' }}></div>
												<legend className="text--uppercase text--bold">Nutritionist Interests</legend>
												<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
													<div className="ui checkbox">
														<input id="normalNutrition" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.normalNutrition || this.state.interests.normalNutrition} onChange={this.handleInterests} />
														<label htmlFor="normalNutrition">Normal Nutrition</label>
													</div>
													<div className="ui checkbox">
														<input id="veganOrVegetarian" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.veganOrVegetarian || this.state.interests.veganOrVegetarian} onChange={this.handleInterests} />
														<label htmlFor="veganOrVegetarian">Vegan or Vegetarian</label>
													</div>
													<div className="ui checkbox">
														<input id="paleo" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.paleo || this.state.interests.paleo} onChange={this.handleInterests} />
														<label htmlFor="paleo">Paleo</label>
													</div>
													<div className="ui checkbox">
														<input id="publicHealth" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.publicHealth || this.state.interests.publicHealth} onChange={this.handleInterests} />
														<label htmlFor="publicHealth">Public Health</label>
													</div>
													<div className="ui checkbox">
														<input id="sports" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.sports || this.state.interests.sports} onChange={this.handleInterests} />
														<label htmlFor="sports">Sports</label>
													</div>
													<div className="ui checkbox">
														<input id="pediatric" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.pediatric || this.state.interests.pediatric} onChange={this.handleInterests} />
														<label htmlFor="pediatric">Pediatric</label>
													</div>
													<div className="ui checkbox">
														<input id="diabetes" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.diabetes || this.state.interests.diabetes} onChange={this.handleInterests} />
														<label htmlFor="diabetes">Diabetes</label>
													</div>
													<div className="ui checkbox">
														<input id="heartHealth" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.heartHealth || this.state.interests.heartHealth} onChange={this.handleInterests} />
														<label htmlFor="heartHealth">Heart Health</label>
													</div>
													<div className="ui checkbox">
														<input id="autoimmuneDisease" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.autoimmuneDisease || this.state.interests.autoimmuneDisease} onChange={this.handleInterests} />
														<label htmlFor="autoimmuneDisease">Autoimmune Disease</label>
													</div>
													<div className="ui checkbox">
														<input id="foodAllergies" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.foodAllergies || this.state.interests.foodAllergies} onChange={this.handleInterests} />
														<label htmlFor="foodAllergies">Food Allergies</label>
													</div>

												</Form.Field>
												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(3, e)} className="button">Previous</button>
													<button onClick={(e) => this.goNext(5, e)} className="button">Next</button>
												</div>
												{this.state.error &&
													<div className="status status--danger status--full">{this.state.error}</div>
												}
											</div>
										</Fade>
									}

									{this.state.currentPage == 5 &&
										<Fade right={this.state.right} left={this.state.left}>
											<h2>Select Massage Therapist Related Interests</h2>
											<div>
												<p>This helps us match your interests with our Pros.</p>
											</div>
											<div className="form__inner">
												<div className={`divider`} style={{ margin: '30px 0' }}></div>
												<legend className="text--uppercase text--bold">Massage Therapy Interests</legend>
												<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
													<div className="ui checkbox">
														<input id="deepTissue" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.deepTissue || this.state.interests.deepTissue} onChange={this.handleInterests} />
														<label for="deepTissue">Deep Tissue</label>
													</div>
													<div className="ui checkbox">
														<input id="swedish" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.swedish || this.state.interests.swedish} onChange={this.handleInterests} />
														<label for="swedish">Swedish</label>
													</div>
													<div className="ui checkbox">
														<input id="stone" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.stone || this.state.interests.stone} onChange={this.handleInterests} />
														<label for="stone">Stone</label>
													</div>
													<div className="ui checkbox">
														<input id="pregnancy" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.pregnancy || this.state.interests.pregnancy} onChange={this.handleInterests} />
														<label for="pregnancy">Pregnancy</label>
													</div>
													<div className="ui checkbox">
														<input id="sports" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.sports || this.state.interests.sports} onChange={this.handleInterests} />
														<label for="sports">Sports</label>
													</div>
													<div className="ui checkbox">
														<input id="reflexology" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.reflexology || this.state.interests.reflexology} onChange={this.handleInterests} />
														<label for="reflexology">Reflexology</label>
													</div>
												</Form.Field>
												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(4, e)} className="button">Previous</button>
													<button onClick={(e) => this.goNext(6, e)} className="button">Next</button>
												</div>
												{this.state.error &&
													<div className="status status--danger status--full">{this.state.error}</div>
												}
											</div>
										</Fade>
									}

									{this.state.currentPage == 6 &&
										<Fade right={this.state.right} left={this.state.left}>
											<div className={'form__inner--1'}>
												<div className="form__inner">
													<div style={{ marginBottom: '20px' }}>
														<h2>Personal Goal</h2>
														<p>What is your personal goal? This will be displayed on your dashboard to motivate and remind you of where you want to be.</p>
													</div>
													<Form.Field>
														<textarea id={'personalGoal'} placeholder="My personal goal is .." onChange={this.onChange} required></textarea>
													</Form.Field>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(5, e)} className="button">Previous</button>
														<button onClick={(e) => this.goNext(7, e, [{ which: "personalGoal", error: "Fill out your personal goal." }])} className="button">Next</button>
													</div>
													{this.state.error &&
														<div style={{ marginTop: '20px' }} className="status status--danger status--full">{this.state.error}</div>
													}
												</div>
											</div>
										</Fade>
									}

									{this.state.currentPage == 7 &&
										<Fade right={this.state.right} left={this.state.left}>
											<div>
												<div className="form__inner">
													<div className="field">
														<h2>Personal Address</h2>
													</div>
													<Form.Field>
														<Input id="personalAddress1" type="text" label="Address 1" defaultValue={this.props.profile.personalAddress1} onChange={this.onChange} required />
													</Form.Field>
													<Form.Field className="field--half">
														<Input id="personalAddress2" type="text" label="Address 2" defaultValue={this.props.profile.personalAddress2} onChange={this.onChange} />
													</Form.Field>
													<Form.Field className="field--half">
														<Input id="personalCity" type="text" label="City" defaultValue={this.props.profile.personalCity} onChange={this.onChange} required />
													</Form.Field>
													<Form.Field className="field--half">
														<label htmlFor="personalState">State</label>
														<select id="personalState" defaultValue={this.props.profile.personalState} onChange={this.onChange} required >
															<option>Select State</option>
															{this.renderStates(states)}
														</select>
													</Form.Field>
													<Form.Field className="field--half">
														<Input id="personalZip" type="text" label="Zip Code" defaultValue={this.props.profile.personalZip} onChange={this.onChange} required />
													</Form.Field>
													<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
														<button onClick={(e) => this.goBack(6, e)} className="button">Previous</button>
														{this.props.profile.googleOrFacebook ?
															<button onClick={(e) => this.goNext(8, e)} className="button">Next</button>
															:
															<button onClick={(e) => this.goNext(9, e, [
																{ which: "personalAddress1", error: "Please enter your address." },
																{ which: "personalCity", error: "Please enter the city." },
																{ which: "personalState", error: "Please enter the state." },
																{ which: "personalZip", error: "Please enter the zip code." }
															])} className="button">Next</button>
														}
													</div>
													{this.state.error &&
														<div style={{ marginTop: '20px' }} className="status status--danger status--full">{this.state.error}</div>
													}
												</div>
											</div>
										</Fade>
									}

									{this.state.currentPage == 8 &&
										<Fade right={this.state.right} left={this.state.left}>
											<div>
												<div className="form__inner">
													<div className="field">
														<h2>Phone Number</h2>
													</div>
													<Form.Field>
														<label htmlFor="phoneNumber">Mobile Number <sup className="red">*</sup>(ex. ##########)</label>
														<input type="tel" pattern="[0-9]{10}" name="phoneNumber" id="phoneNumber" placeholder="Enter your cell phone (ex. ##########)" onChange={this.onChange} required></input>
													</Form.Field>

												</div>

												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(7, e)} className="button">Previous</button>
													<button onClick={(e) => this.goNext(9, e, [{ which: "phoneNumber", error: "Please enter your mobile number" }])} className="button">Next</button>
												</div>
												{this.state.error &&
													<div style={{ marginTop: '20px' }} className="status status--danger status--full">{this.state.error}</div>
												}
											</div>
										</Fade>
									}

									{this.state.currentPage == 9 &&
										<Fade right={this.state.right} left={this.state.left}>
											<div className={`onboarding__step-content-area onboarding__step-content-area--13 ${this.state.currentPage === 13 ? 'active' : null}`}>
												<div style={{ marginBottom: '0px' }}>
													<h2>You did it!</h2>
												</div>
												<div className="form__inner" style={{ marginBottom: '10px' }}>
													<p>Once you complete the onboarding, you'll be ready to start booking.</p>
												</div>
												<div className="buttons--inline" style={{ justifyContent: 'flex-start' }}>
													<button onClick={(e) => this.goBack(7, e)} className="button">Previous</button>
													<button type="submit" onClick={this.handleSubmit} className="button button--secondary text--md text--font-secondary text--uppercase">Complete Onboarding</button>
												</div>
											</div>
										</Fade>
									}

								</Form>


							</div>
						</div>
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
		completeOnboarding: (payload) => dispatch(completeOnboardingClient(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OnboardingClient))