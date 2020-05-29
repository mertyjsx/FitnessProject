import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button, Checkbox } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { updateSpecialties } from '../../store/actions/profileActions'

class SpecialtiesEdit extends Component {
	// const SpecialtiesEdit = (props) => {
	// const { auth, user } = props;

	constructor(props) {
		super(props)
		this.state = {
			professions: {
				// fitnessTrainer: this.props.profile.professions.fitnessTrainer
			},
			specialties: {}
		}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log('Submit', this.state);
		this.props.updateSpecialties(this.state)
		// return (
		// 	<Redirect to="/bookings" />
		// )
	}

	render() {

		return (
			<div className={`edit__specialties`}>

				<Form onSubmit={this.handleSubmit}>
					<h2>Select Primary Service(s)</h2>
					<Form.Field className={'field--inline'}>
						{/* <Checkbox label={'Fitness Trainer'} defaultChecked={this.props.profile.professions.fitnessTrainer} /> */}
						<Checkbox label={'Chef'} />
						<Checkbox label={'Nutrionist'} />
						<Checkbox label={'Massage Therapist'} />
					</Form.Field>
					<Form.Field>
						<Button className={'button text--uppercase text--font-secondary text--sm'}>Request to book</Button>
					</Form.Field>
				</Form>

				<Form onSubmit={this.handleSubmit}>
					<Form.Field className={'field--inline'}>
					</Form.Field>
					<Form.Field>
						<Button className={'button button--primary text--uppercase text--font-secondary text--sm'}>Request to book</Button>
					</Form.Field>
				</Form>
			</div>
		)
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