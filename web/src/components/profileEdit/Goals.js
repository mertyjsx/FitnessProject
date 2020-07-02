import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Form, Input } from 'semantic-ui-react'
import { updateGoals } from '../../store/actions/profileActions'

class Goals extends Component {
	constructor(props) {
		super(props)
		this.state = {
			professionGoals: {
				fitnessTrainer: false,
				chef: false,
				nutritionist: false,
				massageTherapist: false
			},
			goals: {},
		}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleGoals = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			specialties: {
				...this.state.specialties,
				[e.target.id]: e.target.checked
			}
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit clicked');
		this.props.updateSpecialties(this.state)
	}

	handleRateChange = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleProfessionChange = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			professionGoals: {
				...this.state.professionGoals,
				[e.target.id]: e.target.checked
			}
		})
	}

	render() {
		const { auth, profile } = this.props

		// console.log(profile)

		if (profile.isEmpty !== true) {
			return (
				<div className={`profile-edit__specialties`}>

					<Form onSubmit={this.handleSubmit}>
						<h2>Select Primary Goal(s)</h2>
						<Form.Field className={'field--inline'}>
							<Checkbox id="fitnessTrainer" label={'Fitness Trainer'} defaultChecked={profile.professionGoals.fitnessTrainer} onChange={this.handleProfessionChange} />
							<Checkbox id="chef" label={'Chef'} defaultChecked={profile.professionGoals.chef} onChange={this.handleProfessionChange} />
							<Checkbox id="nutritionist" label={'Nutritionist'} defaultChecked={profile.professionGoals.nutritionist} onChange={this.handleProfessionChange} />
							<Checkbox id="massageTherapist" label={'Massage Therapist'} defaultChecked={profile.professionGoals.massageTherapist} onChange={this.handleProfessionChange} />
						</Form.Field>

						{this.state.professionGoals.chef && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Chef Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="seafood" tabindex="0" type="checkbox" defaultChecked={profile.specialties.seafood} onChange={this.handleGoals} />
										<label for="seafood">Seafood</label>
									</div>
									<div className="ui checkbox">
										<input id="american" tabindex="0" type="checkbox" defaultChecked={profile.specialties.american} onChange={this.handleGoals} />
										<label for="american">American</label>
									</div>
									<div className="ui checkbox">
										<input id="breakfastOrBrunch" tabindex="0" type="checkbox" defaultChecked={profile.specialties.breakfastOrBrunch} onChange={this.handleGoals} />
										<label for="breakfastOrBrunch">Breakfast or Brunch</label>
									</div>
									<div className="ui checkbox">
										<input id="international" tabindex="0" type="checkbox" defaultChecked={profile.specialties.international} onChange={this.handleGoals} />
										<label for="international">International</label>
									</div>
									<div className="ui checkbox">
										<input id="southern" tabindex="0" type="checkbox" defaultChecked={profile.specialties.southern} onChange={this.handleGoals} />
										<label for="southern">Southern</label>
									</div>
									<div className="ui checkbox">
										<input id="healthy" tabindex="0" type="checkbox" defaultChecked={profile.specialties.healthy} onChange={this.handleGoals} />
										<label for="healthy">Healthy</label>
									</div>
									<div className="ui checkbox">
										<input id="desserts" tabindex="0" type="checkbox" defaultChecked={profile.specialties.desserts} onChange={this.handleGoals} />
										<label for="desserts">Desserts</label>
									</div>
									<div className="ui checkbox">
										<input id="juicesAndSmoothies" tabindex="0" type="checkbox" defaultChecked={profile.specialties.juicesAndSmoothies} onChange={this.handleGoals} />
										<label for="juicesAndSmoothies">Juices and Smoothies</label>
									</div>
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesOnlineChef'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required defaultValue={profile.ratesOnlineChef} onChange={this.handleRateChange} />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesInPersonChef'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required defaultValue={profile.ratesInPersonChef} onChange={this.handleRateChange} />
								</Form.Field>
							</div>
						)}

						{this.state.professionGoals.fitnessTrainer && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Fitness Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="competitionPrep" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.competitionPrep} onChange={this.handleGoals} />
										<label htmlFor="competitionPrep">Competition Prep</label>
									</div>
									<div className="ui checkbox">
										<input id="powerLifting" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.powerLifting} onChange={this.handleGoals} />
										<label htmlFor="powerLifting">Power Lifting</label>
									</div>
									<div className="ui checkbox">
										<input id="weightLoss" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.weightLoss} onChange={this.handleGoals} />
										<label htmlFor="weightLoss">Weight Loss</label>
									</div>
									<div className="ui checkbox">
										<input id="bodyFatLoss" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.bodyFatLoss} onChange={this.handleGoals} />
										<label htmlFor="bodyFatLoss">Body Fat Loss</label>
									</div>
									<div className="ui checkbox">
										<input id="sizeGaining" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.sizeGaining} onChange={this.handleGoals} />
										<label htmlFor="sizeGaining">Size Gaining</label>
									</div>
									<div className="ui checkbox">
										<input id="enduranceTraining" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.enduranceTraining} onChange={this.handleGoals} />
										<label htmlFor="enduranceTraining">Endurance Training</label>
									</div>
									<div className="ui checkbox">
										<input id="formingAndToning" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.formingAndToning} onChange={this.handleGoals} />
										<label htmlFor="formingAndToning">Forming and Toning</label>
									</div>
									<div className="ui checkbox">
										<input id="flexibility" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.flexibility} onChange={this.handleGoals} />
										<label htmlFor="flexibility">Flexibility</label>
									</div>
									<div className="ui checkbox">
										<input id="aerobicFitness" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.aerobicFitness} onChange={this.handleGoals} />
										<label htmlFor="aerobicFitness">Aerobic Fitness</label>
									</div>
									<div className="ui checkbox">
										<input id="pregnancy" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.pregnancy} onChange={this.handleGoals} />
										<label htmlFor="pregnancy">Pregnancy</label>
									</div>
									<div className="ui checkbox">
										<input id="rehabilitation" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.rehabilitation} onChange={this.handleGoals} />
										<label htmlFor="rehabilitation">Rehabilitation</label>
									</div>
									<div className="ui checkbox">
										<input id="pilates" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.pilates} onChange={this.handleGoals} />
										<label htmlFor="pilates">Pilates</label>
									</div>
									<div className="ui checkbox">
										<input id="yoga" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.yoga} onChange={this.handleGoals} />
										<label htmlFor="yoga">Yoga</label>
									</div>
									<div className="ui checkbox">
										<input id="athletic" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.athletic} onChange={this.handleGoals} />
										<label htmlFor="athletic">Athletic</label>
									</div>
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesOnlineFitnessTrainer'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required defaultValue={profile.ratesOnlineFitnessTrainer} onChange={this.handleRateChange} />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesInPersonFitnessTrainer'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required defaultValue={profile.ratesInPersonFitnessTrainer} onChange={this.handleRateChange} />
								</Form.Field>
							</div>
						)}

						{this.state.professionGoals.nutritionist && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Nutritionist Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="normalNutrition" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.normalNutrition} onChange={this.handleGoals} />
										<label htmlFor="normalNutrition">Normal Nutrition</label>
									</div>
									<div className="ui checkbox">
										<input id="veganOrVegetarian" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.veganOrVegetarian} onChange={this.handleGoals} />
										<label htmlFor="veganOrVegetarian">Vegan or Vegetarian</label>
									</div>
									<div className="ui checkbox">
										<input id="paleo" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.paleo} onChange={this.handleGoals} />
										<label htmlFor="paleo">Paleo</label>
									</div>
									<div className="ui checkbox">
										<input id="publicHealth" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.publicHealth} onChange={this.handleGoals} />
										<label htmlFor="publicHealth">Public Health</label>
									</div>
									<div className="ui checkbox">
										<input id="sports" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.sports} onChange={this.handleGoals} />
										<label htmlFor="sports">Sports</label>
									</div>
									<div className="ui checkbox">
										<input id="pediatric" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.pediatric} onChange={this.handleGoals} />
										<label htmlFor="pediatric">Pediatric</label>
									</div>
									<div className="ui checkbox">
										<input id="diabetes" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.diabetes} onChange={this.handleGoals} />
										<label htmlFor="diabetes">Diabetes</label>
									</div>
									<div className="ui checkbox">
										<input id="heartHealth" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.heartHealth} onChange={this.handleGoals} />
										<label htmlFor="heartHealth">Heart Health</label>
									</div>
									<div className="ui checkbox">
										<input id="autoimmuneDisease" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.autoimmuneDisease} onChange={this.handleGoals} />
										<label htmlFor="autoimmuneDisease">Autoimmune Disease</label>
									</div>
									<div className="ui checkbox">
										<input id="foodAllergies" tabIndex="0" type="checkbox" defaultChecked={profile.specialties.foodAllergies} onChange={this.handleGoals} />
										<label htmlFor="foodAllergies">Food Allergies</label>
									</div>
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesOnlineNutitionist'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required defaultValue={profile.ratesOnlineNutitionist} onChange={this.handleRateChange} />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesInPersonNutitionist'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required defaultValue={profile.ratesInPersonNutitionist} onChange={this.handleRateChange} />
								</Form.Field>
							</div>
						)}

						{this.state.professionGoals.massageTherapist && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Massage Therapist Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="deepTissue" tabindex="0" type="checkbox" onChange={this.handleGoals} />
										<label for="deepTissue">Deep Tissue</label>
									</div>
									<div className="ui checkbox">
										<input id="swedish" tabindex="0" type="checkbox" onChange={this.handleGoals} />
										<label for="swedish">Swedish</label>
									</div>
									<div className="ui checkbox">
										<input id="stone" tabindex="0" type="checkbox" onChange={this.handleGoals} />
										<label for="stone">Stone</label>
									</div>
									<div className="ui checkbox">
										<input id="pregnancy" tabindex="0" type="checkbox" onChange={this.handleGoals} />
										<label for="pregnancy">Pregnancy</label>
									</div>
									<div className="ui checkbox">
										<input id="sports" tabindex="0" type="checkbox" onChange={this.handleGoals} />
										<label for="sports">Sports</label>
									</div>
									<div className="ui checkbox">
										<input id="reflexology" tabindex="0" type="checkbox" onChange={this.handleGoals} />
										<label for="reflexology">Reflexology</label>
									</div>
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesOnlineMassageTherapist'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required defaultValue={profile.ratesOnlineMassageTherapist} onChange={this.handleRateChange} />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'ratesInPersonMassageTherapist'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required defaultValue={profile.ratesInPersonMassageTherapist} onChange={this.handleRateChange} />
								</Form.Field>
							</div>
						)}

						<Form.Field>
							<Button className={'button button--secondary text--uppercase text--font-secondary text--sm'}>Update Profile</Button>
						</Form.Field>
					</Form>
				</div>
			)
		} else {
			return null
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
		updateGoals: (goals) => dispatch(updateGoals(goals))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals)