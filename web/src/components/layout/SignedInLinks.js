import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
	return (
		<div className={`header__secondary`}>
			<ul>
				{/* <li><NavLink to="/create-project" className="header__nav-link">New Project</NavLink></li> */}
				<li><NavLink to="/dashboard" className="header__nav-link">Dashboard</NavLink></li>
				<li><NavLink to="/" className="header__nav-link inactive">Inbox</NavLink></li>
				<li><NavLink to="/" className="header__nav-link inactive">Bookings</NavLink></li>
				<li><NavLink to="/" className="header__nav-link inactive">Profile</NavLink></li>
				<li><NavLink to="/" className="header__nav-link inactive">Calendar</NavLink></li>
			</ul>
			<div className={`header__nav-settings`}>
				<div className={`header__nav-settings-btn`}>
					<button className="header__nav-profile">{props.profile.initials}</button>
				</div>
				<div className={`header__nav-settings-results`}>
					<a href="#" className="header__nav-link" onClick={props.signOut}>Logout</a>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks)