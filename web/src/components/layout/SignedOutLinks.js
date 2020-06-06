import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
	return (
		<ul>
			<li><NavLink to="/find-a-pro" className="header__nav-link">Find a Pro</NavLink></li>
			<li><NavLink to="/how-it-works" className="header__nav-link">How It Works</NavLink></li>
			<li><NavLink to="/signup" className="header__nav-link">Sign Up</NavLink></li>
			<li><NavLink to="/signin" className="header__nav-link">Login</NavLink></li>
			<li><NavLink to="/join-as-pro" className="header__nav-link-btn button button--primary">Join as Pro</NavLink></li>
		</ul>
	)
}

export default SignedOutLinks