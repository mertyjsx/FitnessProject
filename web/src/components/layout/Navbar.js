import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import imageLogo from '../../assets/images/logo-emblem.png'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import SignedInLinks from './SignedInLinks'
import Ring from "../../assets/mp3/ring.mp3"
import SignedOutLinks from './SignedOutLinks'



const Navbar = (props) => {
	const { auth, profile, splash } = props
	const [calling,setCalling]=useState()
	const [menuActive, setMenuState] = useState(false);
	const [audio,setaudio]=useState(false)
	const headerType = auth.uid ? 'logged-in' : 'logged-out';
	const toggleMenu = () => {
		setMenuState(!menuActive)
		// console.log(menuActive, document.body);
		// menuActive ? document.body.classList.remove('no-scroll') : document.body.classList.add('no-scroll')
	}




useEffect(()=>{
let	audio = new Audio(Ring)

setaudio(audio)

	audio.addEventListener('ended', () => audio.pause());
	


	if(calling){
		console.log("hey")
		audio.play()
	}else{
	
	audio.pause()
	
	}



	return 	audio.removeEventListener('ended', () => audio.pause());  





},[calling])







useEffect(()=>{





	
let calling=null

props.interactions&&props.interactions.map(item=>
	{
if(	((item.proUID===auth.uid&&item.calling==="user")||(item.userUID===auth.uid&&item.calling==="pro"))){

console.log(item.calling)
calling=item.id


}


	}
	
)
console.log(calling)

setCalling(calling)




},[props.interactions])



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
			<Link className={calling ? `incoming-call incoming-call--calling` : `incoming-call`} to={`/session/${calling}`}>
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
	console.log(state)
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
		interactions: state.firestore.ordered.interactions,
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		// 	{ collection: 'projects', orderBy: ['createdAt', 'desc'] },
		// 	{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
		{ collection: 'interactions'}
	
	])
)(Navbar);