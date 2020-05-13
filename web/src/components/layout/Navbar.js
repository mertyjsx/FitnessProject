import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
	const { auth, profile } = props
	// console.log(profile)
	const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
	return (
		<nav>
			<div className="nav-container">
				<Link to="/" className="nav__brand">Home</Link>
				{auth.isLoaded && links}
			</div>
		</nav>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(Navbar);