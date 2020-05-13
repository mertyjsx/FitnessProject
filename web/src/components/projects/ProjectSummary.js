import React from 'react'
import moment from 'moment'

const ProjectSummary = ({ project }) => {
	console.log(project.createdAt);

	return (
		<div className="card">
			<h2>{project.title}</h2>
			<p>Posted by {project.authorFirstName} {project.authorLastName}</p>
			<p>{project.createdAt.toDate().toDateString()}</p>
		</div>
	)
}

export default ProjectSummary