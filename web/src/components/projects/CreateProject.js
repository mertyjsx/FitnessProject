import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'

class CreateProject extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			content: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log(this.state);
		this.props.createProject(this)
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<h2>Create New Project</h2>
					<Form.Field>
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" placeholder="Enter title" onChange={this.handleChange}></input>
					</Form.Field>
					<Form.Field>
						<label htmlFor="content">Project Content</label>
						<textarea id="content" placeholder="Enter password" onChange={this.handleChange}></textarea>
					</Form.Field>
					<Form.Field>
						<button type="submit">Create</button>
					</Form.Field>
				</Form>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createProject: (project) => dispatch(createProject(project))
	}
}

export default connect(null, mapDispatchToProps)(CreateProject)
