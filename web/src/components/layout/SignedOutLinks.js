import React from 'react'
import { NavLink } from 'react-router-dom'





const SignedOutLinks = (props) => {










	const navClick = () => { props.menuActive(false) }

	return (
		<ul>
			<li><NavLink onBlur={navClick} onClick={navClick} to="/find-a-pro" className="header__nav-link">Find a Pro</NavLink></li>
			<li><NavLink onBlur={navClick} onClick={navClick} to="/how-it-works" className="header__nav-link">How It Works</NavLink></li>
			<li><NavLink onBlur={navClick} onClick={navClick} to="/signup" className="header__nav-link">Sign Up</NavLink></li>
			<li><NavLink onBlur={navClick} onClick={navClick} to="/signin" className="header__nav-link">Login</NavLink></li>
			<li><NavLink onBlur={navClick} onClick={navClick} to="/how-ctby-works-for-pros" className="header__nav-link-btn button button--primary">Join as Pro</NavLink></li>
		</ul>
	)
}

export default SignedOutLinks