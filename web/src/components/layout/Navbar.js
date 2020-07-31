import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import imageLogo from '../../assets/images/logo-emblem.png'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'



const Navbar = (props) => {
	const { auth, profile, splash } = props
	const [menuActive, setMenuState] = useState(false);
	const headerType = auth.uid ? 'logged-in' : 'logged-out';
	const toggleMenu = () => {
		setMenuState(!menuActive)
		// console.log(menuActive, document.body);
		// menuActive ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll')
	}

	const links = auth.uid ? <SignedInLinks profile={profile} menuActive={toggleMenu} /> : <SignedOutLinks menuActive={toggleMenu} />
	console.log(props)
	return (
		<header className="header">

			<div className="container container--full">
				<div className="row">
					<div className="col col__2">
						<Link to="/" className="header__brand">
							<img src={imageLogo} alt={'Choose To Be You Logo'} />
						</Link>
					</div>
					<div className="col col__10 col--justify-right">
						{splash === true ?
							null
							:
							<>
								<nav className={`header__nav ${menuActive ? 'header__nav--active' : ''}`}>
									<div className={`header__nav-container header__nav-container--${headerType}`}>
										{auth.isLoaded && links}
									</div>
								</nav>
								<div className={`header__nav-btn-wrapper`}>
									<button onClick={toggleMenu} className={`header__nav-btn ${menuActive ? 'header__nav-btn--active' : ''}`}>
										<div className={`hamburger ${menuActive ? 'hamburger--active' : ''}`}></div>
									</button>
								</div>
							</>
						}
					</div>
				</div>
			</div>
			<Link className={props.profile.Calling ? `incoming-call incoming-call--calling` : `incoming-call`} to={`/session/${props.profile.Calling}`}>
				<div className="phoning">
					<div className="phoning__circle"></div>
					<div className="phoning__circle-fill"></div>
					<FontAwesomeIcon icon="phone-volume" />
				</div><span>Incoming Video Call</span>
			</Link>
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