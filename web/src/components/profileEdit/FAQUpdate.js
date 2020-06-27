import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input } from 'semantic-ui-react'
import { updateProfile } from '../../store/actions/profileActions'

class FAQUpdate extends Component {
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
		console.log(this.state);
		this.props.updateProfile(this.state);
	}

	render() {

		return (
			<div className={`profile-edit__profile`}>

				<h2>FAQ Update</h2>

				<Form onSubmit={this.handleSubmit}>
					<Form.Field className="field--half">
						<Input id="faq1Question" type="text" label="Question #1" defaultValue={this.props.profile.faq1Question} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq1Answer" type="text" label="Answer #1" defaultValue={this.props.profile.faq1Answer} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq2Question" type="text" label="Question #2" defaultValue={this.props.profile.faq2Question} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq2Answer" type="text" label="Answer #2" defaultValue={this.props.profile.faq2Answer} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq3Question" type="text" label="Question #3" defaultValue={this.props.profile.faq3Question} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq3Answer" type="text" label="Answer #3" defaultValue={this.props.profile.faq3Answer} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq4Question" type="text" label="Question #4" defaultValue={this.props.profile.faq4Question} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq4Answer" type="text" label="Answer #4" defaultValue={this.props.profile.faq4Answer} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq5Question" type="text" label="Question #5" defaultValue={this.props.profile.faq5Question} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="faq5Answer" type="text" label="Answer #5" defaultValue={this.props.profile.faq5Answer} onChange={this.onChange} />
					</Form.Field>

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

export default connect(mapStateToProps, mapDispatchToProps)(FAQUpdate)