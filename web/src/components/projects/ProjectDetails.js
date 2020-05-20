import React from 'react'
import { connect } from 'react-redux'
import { firestore, firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const ProjectDetails = (props) => {
	const { project, auth } = props;
	if (!auth.uid) return <Redirect to='/signin' />

	if (project) {
		return (
			<div className="project-details">
				<div className="container">
					<div className="row">
						<div className="col">
							<h2>{project.title}</h2>
							<p>{project.content}</p>
							<p>{project.authorFirstName}</p>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className={'container'}>
				..Loading
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	// console.log(state);
	const id = ownProps.match.params.id
	const projects = state.firestore.data.projects
	const project = projects ? projects[id] : null
	console.log(projects);

	return {
		project: project,
		auth: state.firebase.auth
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'projects' }
	])
)(ProjectDetails)