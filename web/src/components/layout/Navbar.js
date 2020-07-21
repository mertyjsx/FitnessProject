import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import imageLogo from '../../assets/images/logo-emblem.png'



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
			{props.profile.Calling&&(
				<Link to={`/session/${props.profile.Calling}`}
				style={{width:"100%",fontSize:30,backgroundColor:"green",textAlign:"center",color:"white"}}>Calling Notification !!!</Link>
			)}
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