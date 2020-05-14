import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import imageLogo from '../../assets/images/logo-emblem.png'



const Navbar = (props) => {
	const { auth, profile } = props
	const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />
	const headerType = auth.uid ? 'logged-in' : 'logged-out';
	const [menuActive, setMenuState] = useState(false);

	return (
		<header className="header">
			<div className="container">
				<div className="row">
					<div className="col col__2">
						<Link to="/" className="header__brand">
							<img src={imageLogo} alt={'Choose To Be You Logo'} />
						</Link>
					</div>
					<div className="col col__10 col--justify-right">
						<nav className={`header__nav ${menuActive ? 'header__nav--active' : ''}`}>
							<div className={`header__nav-container header__nav-container--${headerType}`}>
								{auth.isLoaded && links}
							</div>
						</nav>
						<div className={`header__nav-btn-wrapper`}>
							<button onClick={() => setMenuState(!menuActive)} className={`header__nav-btn ${menuActive ? 'header__nav-btn--active' : ''}`}>
								<div className={`hamburger ${menuActive ? 'hamburger--active' : ''}`}></div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</header >
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(Navbar);