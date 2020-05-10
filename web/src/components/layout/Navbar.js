import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = () => {
	return (
		<nav>
			<div className="nav-container">
				<Link to="/" className="nav__brand">Home</Link>
				<SignedInLinks />
				<SignedOutLinks />
			</div>
		</nav>
	)
}

export default Navbar;