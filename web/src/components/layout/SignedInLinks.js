import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
	const [menuActive, setMenuState] = useState(false);

	return (
		<div className={`header__secondary`}>
			<ul>
				{/* <li><NavLink to="/create-project" className="header__nav-link">New Project</NavLink></li> */}
				<li><NavLink to="/dashboard" className="header__nav-link">Dashboard</NavLink></li>
				<li><NavLink to="/inbox" className="header__nav-link">Inbox</NavLink></li>
				<li><NavLink to="/" className="header__nav-link inactive">Bookings</NavLink></li>
				<li><NavLink to="/" className="header__nav-link inactive">Profile</NavLink></li>
				<li><NavLink to="/" className="header__nav-link inactive">Calendar</NavLink></li>
			</ul>
			<div className={`header__nav-settings ${menuActive ? 'header__nav-settings--active' : ''}`}>
				<div className={`header__nav-settings-btn`}>
					<button onClick={() => setMenuState(!menuActive)} className="header__nav-profile">
						Menu
					</button>
				</div>
				<div className={`header__nav-settings-results ${menuActive ? 'header__nav-settings-results--active' : ''}`}>
					<ul>
						<li><NavLink to="/find-a-pro" className="header__nav-link">Find a Pro</NavLink></li>
						<li><a href="#" className="header__nav-link" onClick={props.signOut}>Logout</a></li>
					</ul>
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