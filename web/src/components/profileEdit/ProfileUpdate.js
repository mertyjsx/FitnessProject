import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Label, TextArea } from 'semantic-ui-react'
import states from '../../json/states.json'
import { updateProfile } from '../../store/actions/profileActions'

class ProfileUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateProfile(this.state);
	}

	renderStates = (allStates) => {
		const states = [];
		allStates.forEach(st => {
			states.push(<option value={st.abbreviation}>{st.name}</option>);
		});
		return states;
	}

	render() {

		return (
			<div className={`profile-edit__profile`}>

				<h2>Update Profile</h2>

				<Form onSubmit={this.handleSubmit}>
					<Form.Field className="field--half">
						<Input id="firstName" type="text" label="First Name" defaultValue={this.props.profile.firstName} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="lastName" type="text" label="Last Name" defaultValue={this.props.profile.lastName} onChange={this.onChange} />
					</Form.Field>
					{this.props.profile.isPro ?
						<div className="form__inner">
							<Form.Field>
								<div className="ui labeled">
									<Label>About</Label>
									<TextArea id="about" defaultValue={this.props.profile.about} onChange={this.onChange} />
								</div>
							</Form.Field>
							<Form.Field className="field--half">
								<Input id="funFact" type="text" label="Fun Fact" defaultValue={this.props.profile.funFact} onChange={this.onChange} />
							</Form.Field>
							<Form.Field className="field--half">
								<Input id="favQuote" type="text" label="Favorite Quote" defaultValue={this.props.profile.favQuote} onChange={this.onChange} />
							</Form.Field>
							<div style={{ marginBottom: '50px' }} className={'col col--12'}></div>
							<div className="field">
								<h2>Business Info</h2>
							</div>
							<Form.Field>
								<Input id="businessName" type="text" label="Business Name" defaultValue={this.props.profile.businessName} onChange={this.onChange} />
							</Form.Field>
							<Form.Field>
								<Input id="businessAddress1" type="text" label="Business Address 1" defaultValue={this.props.profile.businessAddress1} onChange={this.onChange} />
							</Form.Field>
							<Form.Field className="field--half">
								<Input id="businessAddress2" type="text" label="Business Address 2" defaultValue={this.props.profile.businessAddress2} onChange={this.onChange} />
							</Form.Field>
							<Form.Field className="field--half">
								<Input id="businessCity" type="text" label="City" defaultValue={this.props.profile.businessCity} onChange={this.onChange} />
							</Form.Field>
							<Form.Field className="field--half">
								<label htmlFor="businessState">State</label>
								<select id="businessState" defaultValue={this.props.profile.personalState} onChange={this.handleChange} required>
									<option>Select State</option>
									{this.renderStates(states)}
								</select>
							</Form.Field>
							<Form.Field className="field--half">
								<Input id="businessZip" type="text" label="Zip Code" defaultValue={this.props.profile.businessZip} onChange={this.onChange} />
							</Form.Field>
						</div>
						: ''}
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
							<label htmlFor="personalState">State</label>
							<select id="personalState" defaultValue={this.props.profile.personalState} onChange={this.handleChange} required>
								<option>Select State</option>
								{this.renderStates(states)}
							</select>
						</Form.Field>
						<Form.Field className="field--half">
							<Input id="personalZip" type="text" label="Zip Code" defaultValue={this.props.profile.personalZip} onChange={this.onChange} />
						</Form.Field>
					</div>
					<div className="form__inner" style={{ marginBottom: '50px' }}>
						<div style={{ marginBottom: '50px' }} className={'col col--12'}></div>
						<div className="field">
							<h2>Phone Number</h2>
						</div>
						<Form.Field>
						<input  type="tel" pattern="[0-9]{10}" name="phoneNumber" id="phoneNumber"  defaultValue={this.props.profile.phoneNumber} placeholder="Enter your cell phone (ex. ##########)" onChange={this.onChange} required></input>
						</Form.Field>
					
						
					</div>


					<Form.Field>
						<Button className={'button button--secondary text--uppercase text--font-secondary text--sm'}>Update Profile</Button>
					</Form.Field>
				</Form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		isInitializing: state.firebase.isInitializing
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateProfile: (profileDetails) => dispatch(updateProfile(profileDetails))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate)