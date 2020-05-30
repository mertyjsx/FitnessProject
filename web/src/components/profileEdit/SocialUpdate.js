import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button, Checkbox, Input, TextArea, Label } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { updateProfile } from '../../store/actions/profileActions'

class SocialUpdate extends Component {
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

				<h2>Update Social Accounts</h2>

				<Form onSubmit={this.handleSubmit}>
					<Form.Field className="field--half">
						<Input id="facebook" type="url" label="Facebook" onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="twitter" type="url" label="Twitter" onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="instagram" type="url" label="Instagram" onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input id="pinterest" type="url" label="Pinterest" onChange={this.onChange} />
					</Form.Field>

					{/* <Form.Field>
						<Button className={'button button--secondary text--uppercase text--font-secondary text--sm'}>Update Profile</Button>
					</Form.Field> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialUpdate)