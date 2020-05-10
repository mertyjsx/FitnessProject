import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
	return (
		<ul>
			<li><NavLink to="/create-project">New Project</NavLink></li>
			<li><NavLink to="/">Logout</NavLink></li>
			<li><NavLink to="/" className="user">Icon</NavLink></li>
		</ul>
	)
}

export default SignedInLinks