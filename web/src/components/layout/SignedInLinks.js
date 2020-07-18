import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { signOut } from '../../store/actions/authActions'
import RenderImage from '../profileEdit/imageUpload/RenderImage'


function useOutsideAlerter(ref, closeMenu) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				closeMenu()
				// console.log("naber")
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

const SignedInLinks = (props) => {
	const [profileActive, setProfileState] = useState(false)
	const [BookingCount, setBookingCount] = useState(0)
	const [InboxCount, setInboxCount] = useState(0)
	const [DashboardCount, setDashboardCount] = useState(0);
	const settingsClick = () => { setProfileState(!profileActive) }
	const Close = () => { setProfileState(false) }
	const navClick = () => { props.menuActive(false) }
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, Close);

	React.useEffect(() => {
		if (props.interactions) {
			const BookingArray = props.interactions.filter(item => item.update == true && item.interactionType === "booking" && (item.proUID === props.auth.uid || item.userUID === props.auth.uid))
			const InboxArray = props.interactions.filter(item => item.update == true && item.interactionType === "inquiry" && (item.proUID === props.auth.uid || item.userUID === props.auth.uid))
			const DashArray = props.interactions.filter(item => item.status === "active" && (item.proUID === props.auth.uid || item.userUID === props.auth.uid))
			// console.log(BookingArray)
			setBookingCount(BookingArray.length)
			setInboxCount(InboxArray.length)
			setDashboardCount(DashArray.length)
		}
	}, [props.interactions])

	return (
		<div className={`header__secondary`} ref={wrapperRef}>

			{props.profile.onboardingCompleted && (
				<ul>
					{/* <li><NavLink to="/create-project" className="header__nav-link">New Project</NavLink></li> */}
					{props.profile.isAdmin && (
						<li><NavLink onClick={navClick} to="/admin" className="header__nav-link">Admin</NavLink></li>
					)}
					<li><NavLink onClick={navClick} to="/dashboard" className="header__nav-link">Dashboard</NavLink></li>
					<li><NavLink onClick={navClick} to="/inbox" className="header__nav-link">Inbox {InboxCount > 0 && <div className="circle-notification">{InboxCount}</div>}</NavLink></li>
					<li><NavLink onClick={navClick} to="/bookings" className="header__nav-link">Bookings {BookingCount > 0 && <div className="circle-notification">{BookingCount}</div>}</NavLink></li>
					<li><NavLink onClick={navClick} to="/profile-edit" className="header__nav-link">Profile</NavLink></li>
					{props.profile.isPro && (
						<li><NavLink onClick={navClick} to="/calendar" className="header__nav-link">Calendar</NavLink></li>
					)}
				</ul>
			)}

			{props.profile.isOnboardingClientCompleted && (props.profile.isPro == false) && (
				<ul>
					{/* <li><NavLink to="/create-project" className="header__nav-link">New Project</NavLink></li> */}
					{props.profile.isAdmin && (
						<li><NavLink onClick={navClick} to="/admin" className="header__nav-link">Admin</NavLink></li>
					)}
					<li><NavLink onClick={navClick} to="/dashboard" className="header__nav-link">Dashboard</NavLink></li>
					<li><NavLink onClick={navClick} to="/inbox" className="header__nav-link">Inbox {InboxCount > 0 && <div className="circle-notification">{InboxCount}</div>}</NavLink></li>
					<li><NavLink onClick={navClick} to="/bookings" className="header__nav-link">Bookings {BookingCount > 0 && <div className="circle-notification">{BookingCount}</div>}</NavLink></li>
					<li><NavLink onClick={navClick} to="/profile-edit" className="header__nav-link">Profile</NavLink></li>
					{props.profile.isPro && (
						<li><NavLink onClick={navClick} to="/calendar" className="header__nav-link">Calendar</NavLink></li>
					)}
				</ul>
			)}

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
					<ul >
						{!props.profile.isOnboardingClientCompleted && (props.profile.isPro == false) && (
							<li style={{ backgroundColor: '#1b4588' }}><NavLink onClick={navClick} to="/onboarding-client" className="header__nav-link" style={{ color: 'white' }}>Complete Onboarding</NavLink></li>
						)}
						<li><NavLink onClick={navClick} to="/find-a-pro" className="header__nav-link">Find a Pro</NavLink></li>
						<li><NavLink onClick={navClick} to="/payments" className="header__nav-link">Payments</NavLink></li>
						<li><NavLink onClick={navClick} to="/settings" className="header__nav-link">Settings</NavLink></li>
						<li><NavLink onClick={props.signOut} to="/" className="header__nav-link" >Logout</NavLink></li>
					</ul>
				</div>
			</div>
		</div >
	)

}

const mapStateToProps = (state) => {
	// console.log(state);
	return {
		interactions: state.firestore.ordered.interactions,
		// interactionType: interactions.interactionType
		auth: state.firebase.auth,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}





export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{ collection: 'interactions', orderBy: ['createdAt', 'desc'] }
	]),

)(SignedInLinks)