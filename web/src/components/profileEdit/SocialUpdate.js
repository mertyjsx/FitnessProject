import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Radio, Button, Checkbox, Input, TextArea, Label } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { updateProfile } from '../../store/actions/profileActions'
import ellipses from '../../assets/images/ellipsis.gif'


class SocialUpdate extends Component {
	constructor(props) {
		super(props)
		this.state = {
			submitting: false
		}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		var $this = this
		$this.setState({
			submitting: true
		});
		setTimeout(function () {
			$this.setState({
				submitting: false
			});
			$this.props.updateProfile($this.state);
		}, 3000)
	}

	render() {

		return (
			<div className={`profile-edit__profile`}>
			{
!this.props.profile.isProPremium&&
<div className="alertYellow">
	Upgrade to Pro Premium Today
</div>

			}

				<h2>Update Social Accounts</h2>

				<Form onSubmit={this.handleSubmit}>
					<div className={this.state.submitting ? `form__loading active` : `form__loading`}>
						<div style={{ textAlign: 'center' }}>
							<img src={ellipses} />
							<p>Updating</p>
						</div>
					</div>
					<Form.Field className="field--half">
						<Input disabled={!this.props.profile.isProPremium} id="socialFacebook" type="url" label="Facebook" placeholder="Enter your Facebook profile url" defaultValue={this.props.profile.socialFacebook} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input disabled={!this.props.profile.isProPremium} id="socialTwitter" type="url" placeholder="Enter your Twitter profile url" label="Twitter" defaultValue={this.props.profile.socialTwitter} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input disabled={!this.props.profile.isProPremium} id="socialInstagram" type="url" placeholder="Enter your Instagram profile url" label="Instagram" defaultValue={this.props.profile.socialInstagram} onChange={this.onChange} />
					</Form.Field>
					<Form.Field className="field--half">
						<Input disabled={!this.props.profile.isProPremium} id="socialPinterest" type="url" placeholder="Enter your Pinterest profile url" label="Pinterest" defaultValue={this.props.profile.socialPinterest} onChange={this.onChange} />
					</Form.Field>

					<Form.Field>
						<Button disabled={!this.props.profile.isProPremium} className={`button  text--uppercase text--font-secondary text--sm ${!this.props.profile.isProPremium?'disabledButton':'button--secondary'}`}>Update Social Accounts</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SocialUpdate)