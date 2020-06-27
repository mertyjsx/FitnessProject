import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Label, TextArea } from 'semantic-ui-react'
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
								<Input id="city" type="text" label="City" defaultValue={this.props.profile.businssCity} onChange={this.onChange} />
							</Form.Field>
							<Form.Field className="field--half">
								<Input id="state" type="text" label="State" defaultValue={this.props.profile.businessState} onChange={this.onChange} />
							</Form.Field>
							<Form.Field className="field--half">
								<Input id="zip" type="text" label="Zip Code" defaultValue={this.props.profile.businessZip} onChange={this.onChange} />
							</Form.Field>
						</div>
						:
						<div className="form__inner">
							<div style={{ marginBottom: '50px' }} className={'col col--12'}></div>
							<div className="field">
								<h2>Address</h2>
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
					}
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