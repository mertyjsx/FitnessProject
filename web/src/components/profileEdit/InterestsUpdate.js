import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { updateInterests } from '../../store/actions/profileActions'

class InterestsUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			interests: {},
		}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
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

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit clicked');
		this.props.updateInterests(this.state)
	}

	render() {
		const { auth, profile } = this.props

		// console.log(profile)

		if (profile.isEmpty !== true) {
			return (
				<div className={`profile-edit__specialties`}>

					<Form onSubmit={this.handleSubmit}>
						<h2>Select Interest(s)</h2>

						<div className="form__inner">
							<div className={`divider`} style={{ margin: '30px 0 50px' }}></div>
							<legend className="text--uppercase text--bold">Chef Interests</legend>
							<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
								<div className="ui checkbox">
									<input id="seafood" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.seafood} onChange={this.handleInterests} />
									<label for="seafood">Seafood</label>
								</div>
								<div className="ui checkbox">
									<input id="american" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.american} onChange={this.handleInterests} />
									<label for="american">American</label>
								</div>
								<div className="ui checkbox">
									<input id="breakfastOrBrunch" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.breakfastOrBrunch} onChange={this.handleInterests} />
									<label for="breakfastOrBrunch">Breakfast or Brunch</label>
								</div>
								<div className="ui checkbox">
									<input id="international" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.international} onChange={this.handleInterests} />
									<label for="international">International</label>
								</div>
								<div className="ui checkbox">
									<input id="southern" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.southern} onChange={this.handleInterests} />
									<label for="southern">Southern</label>
								</div>
								<div className="ui checkbox">
									<input id="healthy" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.healthy} onChange={this.handleInterests} />
									<label for="healthy">Healthy</label>
								</div>
								<div className="ui checkbox">
									<input id="desserts" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.desserts} onChange={this.handleInterests} />
									<label for="desserts">Desserts</label>
								</div>
								<div className="ui checkbox">
									<input id="juicesAndSmoothies" tabindex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.juicesAndSmoothies} onChange={this.handleInterests} />
									<label for="juicesAndSmoothies">Juices and Smoothies</label>
								</div>
							</Form.Field>
						</div>

						<div className="form__inner">
							<div className={`divider`} style={{ margin: '50px 0' }}></div>
							<legend className="text--uppercase text--bold">Fitness Interests</legend>
							<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
								<div className="ui checkbox">
									<input id="competitionPrep" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.competitionPrep} onChange={this.handleInterests} />
									<label htmlFor="competitionPrep">Competition Prep</label>
								</div>
								<div className="ui checkbox">
									<input id="powerLifting" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.powerLifting} onChange={this.handleInterests} />
									<label htmlFor="powerLifting">Powerlifting</label>
								</div>
								<div className="ui checkbox">
									<input id="weightLoss" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.weightLoss} onChange={this.handleInterests} />
									<label htmlFor="weightLoss">Weight Loss</label>
								</div>
								<div className="ui checkbox">
									<input id="bodyFatLoss" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.bodyFatLoss} onChange={this.handleInterests} />
									<label htmlFor="bodyFatLoss">Body Fat Loss</label>
								</div>
								<div className="ui checkbox">
									<input id="sizeGaining" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.sizeGaining} onChange={this.handleInterests} />
									<label htmlFor="sizeGaining">Size Gaining</label>
								</div>
								<div className="ui checkbox">
									<input id="enduranceTraining" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.enduranceTraining} onChange={this.handleInterests} />
									<label htmlFor="enduranceTraining">Endurance Training</label>
								</div>
								<div className="ui checkbox">
									<input id="formingAndToning" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.formingAndToning} onChange={this.handleInterests} />
									<label htmlFor="formingAndToning">Forming and Toning</label>
								</div>
								<div className="ui checkbox">
									<input id="flexibility" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.flexibility} onChange={this.handleInterests} />
									<label htmlFor="flexibility">Flexibility</label>
								</div>
								<div className="ui checkbox">
									<input id="aerobicFitness" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.aerobicFitness} onChange={this.handleInterests} />
									<label htmlFor="aerobicFitness">Aerobic Fitness</label>
								</div>
								<div className="ui checkbox">
									<input id="pregnancy" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.pregnancy} onChange={this.handleInterests} />
									<label htmlFor="pregnancy">Pregnancy</label>
								</div>
								<div className="ui checkbox">
									<input id="rehabilitation" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.rehabilitation} onChange={this.handleInterests} />
									<label htmlFor="rehabilitation">Rehabilitation</label>
								</div>
								<div className="ui checkbox">
									<input id="pilates" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.pilates} onChange={this.handleInterests} />
									<label htmlFor="pilates">Pilates</label>
								</div>
								<div className="ui checkbox">
									<input id="yoga" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.yoga} onChange={this.handleInterests} />
									<label htmlFor="yoga">Yoga</label>
								</div>
								<div className="ui checkbox">
									<input id="athletic" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.athletic} onChange={this.handleInterests} />
									<label htmlFor="athletic">Athletic</label>
								</div>
							</Form.Field>
						</div>

						<div className="form__inner">
							<div className={`divider`} style={{ margin: '50px 0' }}></div>
							<legend className="text--uppercase text--bold">Nutritionist Interests</legend>
							<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
								<div className="ui checkbox">
									<input id="normalNutrition" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.normalNutrition} onChange={this.handleInterests} />
									<label htmlFor="normalNutrition">Normal Nutrition</label>
								</div>
								<div className="ui checkbox">
									<input id="veganOrVegetarian" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.veganOrVegetarian} onChange={this.handleInterests} />
									<label htmlFor="veganOrVegetarian">Vegan or Vegetarian</label>
								</div>
								<div className="ui checkbox">
									<input id="paleo" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.paleo} onChange={this.handleInterests} />
									<label htmlFor="paleo">Paleo</label>
								</div>
								<div className="ui checkbox">
									<input id="publicHealth" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.publicHealth} onChange={this.handleInterests} />
									<label htmlFor="publicHealth">Public Health</label>
								</div>
								<div className="ui checkbox">
									<input id="sports" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.sports} onChange={this.handleInterests} />
									<label htmlFor="sports">Sports</label>
								</div>
								<div className="ui checkbox">
									<input id="pediatric" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.pediatric} onChange={this.handleInterests} />
									<label htmlFor="pediatric">Pediatric</label>
								</div>
								<div className="ui checkbox">
									<input id="diabetes" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.diabetes} onChange={this.handleInterests} />
									<label htmlFor="diabetes">Diabetes</label>
								</div>
								<div className="ui checkbox">
									<input id="heartHealth" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.heartHealth} onChange={this.handleInterests} />
									<label htmlFor="heartHealth">Heart Health</label>
								</div>
								<div className="ui checkbox">
									<input id="autoimmuneDisease" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.autoimmuneDisease} onChange={this.handleInterests} />
									<label htmlFor="autoimmuneDisease">Autoimmune Disease</label>
								</div>
								<div className="ui checkbox">
									<input id="foodAllergies" tabIndex="0" type="checkbox" defaultChecked={profile.interests && profile.interests.foodAllergies} onChange={this.handleInterests} />
									<label htmlFor="foodAllergies">Food Allergies</label>
								</div>
							</Form.Field>
						</div>

						<div className="form__inner">
							<div className={`divider`} style={{ margin: '50px 0' }}></div>
							<legend className="text--uppercase text--bold">Massage Therapy Interests</legend>
							<Form.Field className={'field--cols'} style={{ padding: '20px 0' }}>
								<div className="ui checkbox">
									<input id="deepTissue" tabindex="0" type="checkbox" onChange={this.handleInterests} />
									<label for="deepTissue">Deep Tissue</label>
								</div>
								<div className="ui checkbox">
									<input id="swedish" tabindex="0" type="checkbox" onChange={this.handleInterests} />
									<label for="swedish">Swedish</label>
								</div>
								<div className="ui checkbox">
									<input id="stone" tabindex="0" type="checkbox" onChange={this.handleInterests} />
									<label for="stone">Stone</label>
								</div>
								<div className="ui checkbox">
									<input id="pregnancy" tabindex="0" type="checkbox" onChange={this.handleInterests} />
									<label for="pregnancy">Pregnancy</label>
								</div>
								<div className="ui checkbox">
									<input id="sports" tabindex="0" type="checkbox" onChange={this.handleInterests} />
									<label for="sports">Sports</label>
								</div>
								<div className="ui checkbox">
									<input id="reflexology" tabindex="0" type="checkbox" onChange={this.handleInterests} />
									<label for="reflexology">Reflexology</label>
								</div>
							</Form.Field>
						</div>

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
		updateInterests: (interests) => dispatch(updateInterests(interests))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InterestsUpdate)