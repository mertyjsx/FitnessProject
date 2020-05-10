import React from 'react'

const ProjectDetails = (props) => {
	const id = props.match.params.id

	return (
		<div className="project-details">
			<div className="container">
				<div className="row">
					<div className="col">
						<h2>Project Title = {id}</h2>
						<p>Dummy text here.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProjectDetails