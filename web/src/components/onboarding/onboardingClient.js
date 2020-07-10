import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import ellipses from '../../assets/images/ellipsis.gif';
import { completeOnboardingClient } from '../../store/actions/authActions';
import Loading from '../modules/Loading';





class OnboardingClient extends Component {

    constructor(props) {
        super(props)
        this.state = {

            onboardingUploading: false,
            interests: {},

            checkboxValidation: false,

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

        let interestsArray = Object.keys(this.state.interests)


        if (interestsArray.length < 3) {
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




    render() {
        console.log(this.state)
        const { projects, auth, profile, notifications } = this.props
        if (profile.isOnboardingClientCompleted) return <Redirect to='/dashboard' />

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
                        <h1 className="text--bold">Onboarding Client</h1>
                        <h2>Hi <span className="text--capitalize">{profile.firstName}</span>,</h2>
                        <p>Welcome to the onboarding process! Please fill out as much information as possible   <Link to="/contact">Contact us</Link> if you have any questions.</p>


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
									<label htmlFor="powerLifting">Power Lifting</label>
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
					
                                {/* <Form.Field>
									<button className={`button button--secondary text--uppercase text--bold text--font-secondary`} onClick={this.handleNext}>Proceed</button>
								</Form.Field> */}
                            </div>

                            <div className={'form__inner--1'}>
                                <div className="form__inner">
                                    <div style={{ marginBottom: '20px' }}>
                                        <h2>PERSONAL GOAL</h2>
                                        <p>We'd like to know more about you! The infromation you provide here will be part of your profile.</p>
                                    </div>
                                    <Form.Field>

                                        <textarea id={'personalGoal'} placeholder="My personal goal is .." onChange={this.onChange} required></textarea>
                                    </Form.Field>

                                </div>
                            </div>

                            <div className="form__inner">
						<div style={{ marginBottom: '50px' }} className={'col col--12'}></div>
						<div className="field">
							<h2>Personal Address</h2>
						</div>
						<Form.Field>
							<Input id="personalAddress1" type="text" label="Address 1" defaultValue={this.props.profile.personalAddress1} onChange={this.onChange} />
						</Form.Field>
						<Form.Field className="field--half">
							<Input id="personalAddress2" type="text" label="Address 2" defaultValue={this.props.profile.personalAddress2} onChange={this.onChange} />
						</Form.Field>
						<Form.Field className="field--half">
							<Input id="personalCity" type="text" label="City" defaultValue={this.props.profile.personalCity} onChange={this.onChange} />
						</Form.Field>
						<Form.Field className="field--half">
							<Input id="personalState" type="text" label="State" defaultValue={this.props.profile.personalState} onChange={this.onChange} />
						</Form.Field>
						<Form.Field className="field--half">
							<Input id="personalZip" type="text" label="Zip Code" defaultValue={this.props.profile.personalZip} onChange={this.onChange} />
						</Form.Field>
					</div>
                            {this.state.checkboxValidation &&
                                <div className="m-40">
                                    <p className="alertDialog"> You need to choose a minimum of 3 interests ! </p>
                                </div>
                            }




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
        completeOnboarding: (payload) => dispatch(completeOnboardingClient(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OnboardingClient))