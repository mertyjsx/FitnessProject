import React from 'react'

const ProjectSummary = ({ project }) => {
	return (
		<div className="card">
			<h2>{project.title}</h2>
			<p>Posted by Person</p>
			<p>2rd September, 2020</p>
		</div>
	)
}

export default ProjectSummary