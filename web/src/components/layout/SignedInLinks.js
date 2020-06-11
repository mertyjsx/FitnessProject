import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { renderProfileImage } from '../helpers/HelpersProfile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RenderImage from '../profileEdit/imageUpload/RenderImage'

const SignedInLinks = (props) => {
	const [profileActive, setProfileState] = useState(false);
	const settingsClick = () => { setProfileState(!profileActive) }
	const navClick = () => { props.menuActive(false) }

	if (props.profile.onboardingCompleted === false) {
		return (
			<div className={`header__secondary`}><ul></ul></div>
		)
	} else {
		return (
			<div className={`header__secondary`}>
				<ul>
					{/* <li><NavLink to="/create-project" className="header__nav-link">New Project</NavLink></li> */}
					<li><NavLink onClick={navClick} to="/dashboard" className="header__nav-link">Dashboard</NavLink></li>
					<li><NavLink onClick={navClick} to="/inbox" className="header__nav-link">Inbox</NavLink></li>
					<li><NavLink onClick={navClick} to="/bookings" className="header__nav-link">Bookings</NavLink></li>
					<li><NavLink onClick={navClick} to="/profile-edit" className="header__nav-link">Profile</NavLink></li>
					<li><NavLink onClick={navClick} to="/" className="header__nav-link inactive">Calendar</NavLink></li>
				</ul>
				<div className={`header__nav-settings ${profileActive ? 'header__nav-settings--active' : ''}`}>
					<div className={`header__nav-settings-btn`}>
						<button onClick={settingsClick} className="header__nav-profile">
							<div className="header__nav-profile-image">
								{props.profile.photoURL ?
									<RenderImage />
									:
									<div className={'initials'}>
										{props.profile.initials}
									</div>
								}
							</div>
							<FontAwesomeIcon icon={["fa", "chevron-down"]} />
						</button>
					</div>
					<div className={`header__nav-settings-results ${profileActive ? 'header__nav-settings-results--active' : ''}`}>
						<ul>
							<li><NavLink onClick={navClick} to="/find-a-pro" className="header__nav-link">Find a Pro</NavLink></li>
							<li><NavLink onClick={navClick} to="/settings" className="header__nav-link">Settings</NavLink></li>
							<li><a onClick={navClick} href="#" className="header__nav-link" onClick={props.signOut}>Logout</a></li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks)