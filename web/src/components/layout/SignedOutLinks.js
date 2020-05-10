import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
	return (
		<ul>
			<li><NavLink to="/">Find a Pro</NavLink></li>
			<li><NavLink to="/signup">Sign Up</NavLink></li>
			<li><NavLink to="/signin">Login</NavLink></li>
			<li><NavLink to="/">Join as Pro</NavLink></li>
		</ul>
	)
}

export default SignedOutLinks