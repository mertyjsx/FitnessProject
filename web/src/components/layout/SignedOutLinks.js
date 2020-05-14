import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
	return (
		<ul>
			<li><NavLink to="/" className="header__nav-link">Find a Pro</NavLink></li>
			<li><NavLink to="/signup" className="header__nav-link">Sign Up</NavLink></li>
			<li><NavLink to="/signin" className="header__nav-link">Login</NavLink></li>
			<li><NavLink to="/" className="header__nav-link-btn button button--primary">Join as Pro</NavLink></li>
		</ul>
	)
}

export default SignedOutLinks