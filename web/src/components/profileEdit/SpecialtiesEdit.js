import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button, Checkbox, Input } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { updateSpecialties } from '../../store/actions/profileActions'

class SpecialtiesEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			professions: {
				fitnessTrainer: this.props.profile.professions.fitnessTrainer,
				chef: this.props.profile.professions.chef,
				nutritionist: this.props.profile.professions.nutritionist,
				massageTherapist: this.props.profile.professions.massageTherapist
			},
			specialties: {},
			rates: {
				fitnessTrainer: {},
				massageTherapist: {},
				nutritionist: {},
				chef: {}
			}
		}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateSpecialties(this.state)
	}

	handleChefRateChange = (e) => {
		this.setState({
			rates: {
				chef: {
					...this.state.rates.chef,
					[e.target.id]: e.target.value
				}
			}
		})
	}

	handleFitnessRateChange = (e) => {
		this.setState({
			rates: {
				fitnessTrainer: {
					...this.state.rates.fitnessTrainer,
					[e.target.id]: e.target.value
				}
			}
		})
	}

	handleMassageTherapistRateChange = (e) => {
		this.setState({
			rates: {
				massageTherapist: {
					...this.state.rates.massageTherapist,
					[e.target.id]: e.target.value
				}
			}
		})
	}

	handleNutritionistRateChange = (e) => {
		this.setState({
			rates: {
				nutritionist: {
					...this.state.rates.nutritionist,
					[e.target.id]: e.target.value
				}
			}
		})
	}

	handleProfessionChange = (e) => {
		// console.log(e.target.id, e.target.checked);
		this.setState({
			professions: {
				...this.state.professions,
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
						<h2>Select Primary Service(s)</h2>
						<Form.Field className={'field--inline'}>
							<Checkbox id="fitnessTrainer" label={'Fitness Trainer'} defaultChecked={profile.professions.fitnessTrainer} onChange={this.handleProfessionChange} />
							<Checkbox id="chef" label={'Chef'} defaultChecked={profile.professions.chef} onChange={this.handleProfessionChange} />
							<Checkbox id="nutritionist" label={'Nutritionist'} defaultChecked={profile.professions.nutritionist} onChange={this.handleProfessionChange} />
							<Checkbox id="massageTherapist" label={'Massage Therapist'} defaultChecked={profile.professions.massageTherapist} onChange={this.handleProfessionChange} />
						</Form.Field>

						{this.state.professions.chef && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Chef Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="seafood" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="seafood">Seafood</label>
									</div>
									<div className="ui checkbox">
										<input id="american" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="american">American</label>
									</div>
									<div className="ui checkbox">
										<input id="breakfastOrBrunch" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="breakfastOrBrunch">Breakfast or Brunch</label>
									</div>
									<div className="ui checkbox">
										<input id="international" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="international">International</label>
									</div>
									<div className="ui checkbox">
										<input id="southern" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="southern">Southern</label>
									</div>
									<div className="ui checkbox">
										<input id="healthy" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="healthy">Healthy</label>
									</div>
									<div className="ui checkbox">
										<input id="desserts" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="desserts">Desserts</label>
									</div>
									<div className="ui checkbox">
										<input id="juicesAndSmoothies" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
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
						{this.state.professions.fitnessTrainer && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Fitness Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="seafood" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="seafood">Seafood</label>
									</div>
									<div className="ui checkbox">
										<input id="american" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="american">American</label>
									</div>
									<div className="ui checkbox">
										<input id="breakfastOrBrunch" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="breakfastOrBrunch">Breakfast or Brunch</label>
									</div>
									<div className="ui checkbox">
										<input id="international" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="international">International</label>
									</div>
									<div className="ui checkbox">
										<input id="southern" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="southern">Southern</label>
									</div>
									<div className="ui checkbox">
										<input id="healthy" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="healthy">Healthy</label>
									</div>
									<div className="ui checkbox">
										<input id="desserts" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="desserts">Desserts</label>
									</div>
									<div className="ui checkbox">
										<input id="juicesAndSmoothies" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="juicesAndSmoothies">Juices and Smoothies</label>
									</div>
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'online'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required onChange={this.handleFitnessRateChange} />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'inPerson'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required onChange={this.handleFitnessRateChange} />
								</Form.Field>
							</div>
						)}
						{this.state.professions.nutritionist && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Nutritionist Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="normalNutrition" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="normalNutrition">Normal Nutrition</label>
									</div>
									<div className="ui checkbox">
										<input id="veganOrVegetarian" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="veganOrVegetarian">Vegan or Vegetarian</label>
									</div>
									<div className="ui checkbox">
										<input id="paleo" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="paleo">Paleo</label>
									</div>
									<div className="ui checkbox">
										<input id="publicHealth" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="publicHealth">Public Health</label>
									</div>
									<div className="ui checkbox">
										<input id="sports" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="sports">Sports</label>
									</div>
									<div className="ui checkbox">
										<input id="pediatric" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="pediatric">Pediatric</label>
									</div>
									<div className="ui checkbox">
										<input id="diabetes" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="diabetes">Diabetes</label>
									</div>
									<div className="ui checkbox">
										<input id="heartHealth" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="heartHealth">Heart Health</label>
									</div>
									<div className="ui checkbox">
										<input id="autoimmuneDisease" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="autoimmuneDisease">Autoimmune Disease</label>
									</div>
									<div className="ui checkbox">
										<input id="foodAllergies" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="foodAllergies">Food Allergies</label>
									</div>
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'online'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required onChange={this.handleNutritionistRateChange} />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'inPerson'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required onChange={this.handleNutritionistRateChange} />
								</Form.Field>
							</div>
						)}
						{this.state.professions.massageTherapist && (
							<div className="form__inner">
								<div className={`divider`} style={{ margin: '50px 0' }}></div>
								<legend className="text--uppercase text--bold">Select Your Massage Therapist Specialties</legend>
								<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
									<div className="ui checkbox">
										<input id="deepTissue" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="deepTissue">Deep Tissue</label>
									</div>
									<div className="ui checkbox">
										<input id="swedish" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="swedish">Swedish</label>
									</div>
									<div className="ui checkbox">
										<input id="stone" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="stone">Stone</label>
									</div>
									<div className="ui checkbox">
										<input id="pregnancy" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="pregnancy">Pregnancy</label>
									</div>
									<div className="ui checkbox">
										<input id="sports" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="sports">Sports</label>
									</div>
									<div className="ui checkbox">
										<input id="reflexology" tabindex="0" type="checkbox" onChange={this.handleSpecialities} />
										<label for="reflexology">Reflexology</label>
									</div>
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'online'} type={'number'} placeholder={'e.g. 25'} label={'Your Online Rates'} min={25} required onChange={this.handleMassageTherapistRateChange} />
								</Form.Field>
								<Form.Field className={'field--half'}>
									<Input id={'inPerson'} type={'number'} placeholder={'e.g. 35'} label={'Your In-Person Rates'} min={50} required onChange={this.handleChhandleMassageTherapistRateChangeefRateChange} />
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
		updateSpecialties: (specialties) => dispatch(updateSpecialties(specialties))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtiesEdit)