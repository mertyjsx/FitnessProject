import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

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
		console.log(this.state);
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<h2>Sign In</h2>
					<Form.Field>
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" placeholder="Enter email" onChange={this.handleChange}></input>
					</Form.Field>
					<Form.Field>
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" placeholder="Enter password" onChange={this.handleChange}></input>
					</Form.Field>
					<Form.Field>
						<button type="submit">Login</button>
					</Form.Field>
				</Form>
			</div>
		)
	}
}

export default SignIn
