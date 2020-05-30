import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state)
	}

	render() {
		const { authError, auth } = this.props
		if (auth.uid) return <Redirect to='/dashboard' />

		return (
			<div className={'signin'}>
				<div className="container container--small container--top-bottom-padding">
					<h1 className="text--bold text--center">Sign In</h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Field>
							<label htmlFor="email">Email</label>
							<input type="email" name="email" id="email" placeholder="Enter email" onChange={this.handleChange}></input>
						</Form.Field>
						<Form.Field>
							<label htmlFor="password">Password</label>
							<input type="password" name="password" id="password" placeholder="Enter password" onChange={this.handleChange}></input>
						</Form.Field>
						<Form.Field>
							<button type="submit" className={`button button--secondary text--uppercase text--bold text--font-secondary`}>Login</button>
							<div className="warning">
								{authError ? <p>authError</p> : null}
							</div>
						</Form.Field>
					</Form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
