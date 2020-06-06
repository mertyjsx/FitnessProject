import React from 'react'
import { connect } from 'react-redux'
import { firestore, firestoreConnect } from 'react-redux-firebase'
import { Form, Radio, Button, Modal } from 'semantic-ui-react'
import { compose } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import Booking from './Booking'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Inquiry from './Inquiry'
import GetRating from '../rating/GetRating'
import GetFullReviews from '../rating/GetFullReviews'
import Loading from '../modules/Loading'

const Profile = (props, state) => {
	const { auth, user } = props;
	// console.log(user);

	if (!auth.uid) return <Redirect to='/signin' />

	const renderProfileNav = (about, background, credentials, reviews) => {
		// console.log(typeof credentials);

		var navItems = [];
		if (typeof about === 'string') { navItems.push(<li key={'about'}><a href="#about">About</a></li>) }
		if (typeof background === 'string') { navItems.push(<li key={'background'}><a href="#background">Background</a></li>) }
		if (typeof credentials === 'string') { navItems.push(<li key={'credentials'}><a href="#credentials">Credentials</a></li>) }
		if (reviews === true) { navItems.push(<li key={'reviews'}><a href="#reviews">Reviews</a></li>) }
		return (<ul className="list list--inline">{navItems.splice('')}</ul>)
	}

	const renderMainSpecialties = (main) => {
		var mainItems = [];
		// console.log(typeof main.chef);
		if (main.chef && main.chef === true) { mainItems.push('Chef') }
		if (main.fitnessTrainer && main.fitnessTrainer === true) { mainItems.push('Fitness Trainer') }
		if (main.massageTherapist && main.massageTherapist === true) { mainItems.push('Massage Therapist') }
		if (main.nutritionist && main.nutritionist === true) { mainItems.push('Nutritionist') }
		return (mainItems.join(', '))
	}

	const renderAbout = (about, fun, quote) => {
		if (typeof about !== 'string') { return null }
		return (
			<div id="about" className={`profile__about`}>
				<h2 className={`text--uppercase`}>About</h2>
				<p>{about}</p>
				<div className={`additional`}>
					{typeof fun === 'string' ?
						<div className="additional__box">
							<div className="additional__box-title">
								<h2 className="text--uppercase"><FontAwesomeIcon icon="grin" /> Fun Fact</h2>
							</div>
							<p>{fun}</p>
						</div>
						: null}
					{typeof quote === 'string' ?
						<div className="additional__box additional__box--secondary">
							<div className="additional__box-title">
								<h2 className="text--uppercase"><FontAwesomeIcon icon="quote-left" /> Favorite Quote</h2>
							</div>
							<p>{quote}</p>
						</div>
						: null}
				</div>
			</div>
		)
	}

	const renderBackground = (background) => {
		if (typeof background !== 'string') { return null }
		return (
			<div id="background" className={`profile__professional-background`}>
				<h2 className={`text--uppercase`}>Professional Background</h2>
				<p>{background}</p>
			</div>
		)
	}

	const sendMessage = () => (
		<Modal trigger={<Button className="button button--inverted">Message Pro</Button>}>
			<Modal.Content>
				<Modal.Actions>
					<Button class="button__close" >X</Button>
				</Modal.Actions>
				<Modal.Description>
					<Inquiry pro={user} user={auth} />
				</Modal.Description>
			</Modal.Content>
		</Modal>
	)

	const renderCredentials = (cred) => {
		if (typeof cred !== 'string') { return null }
		return (
			<div id="credentials" className={`profile__credentials`}>
				<h2 className={`text--uppercase`}>Credentials</h2>
				<p>{cred}</p>
			</div>
		)
	}

	const renderImage = (image) => {
		if (typeof image !== 'string') { return null }
		return (
			<img src={image} />
		)
	}

	if (user) {
		return (
			<div className="profile">
				<div className="container container--top-bottom-padding">
					<div className="row row--flex-start">
						<div className="col col--8">
							<div className={`profile__nav`}>
								{renderProfileNav(user.about, user.background, user.credentials, true)}
							</div>
							<div className={`profile__image`}>
								{renderImage(user.photoURL)}
							</div>
							<div className={`profile__meta`}>
								<div className={`profile__meta-inner`}>
									<h1 className={`text--no-margin`}>{`${user.firstName} ${user.lastName}`}</h1>
									<GetRating proInteractions={user.proInteractions} />
									<div className={`profile__meta-btns`}>
										<div className="profile__meta-btn">
											{sendMessage()}
										</div>
										<div className="profile__meta-btn">
											<a href="#" className="button button--secondary">Share Profile</a>
										</div>
									</div>
									<div className={`profile__meta-specialties`}>
										<h2 className="text--uppercase"><FontAwesomeIcon icon="list" /> Specialties</h2>
										<div className="profile__meta-spec">
											<h3 className="mb--0"><strong>Main</strong></h3>
											{renderMainSpecialties(user.professions)}
										</div>
										<div className="profile__meta-spec">
											<h3 className="mb--0"><strong>Specializing In:</strong></h3>
											{/* {renderMainSpecialties()} */}
										</div>
									</div>
								</div>
							</div>
							{renderAbout(user.about, user.funFact, user.favQuote)}
							{renderBackground(user.background)}
							{renderCredentials(user.credentials)}

							<div id="reviews" className={`profile__reviews`}>
								<h2 className={`text--uppercase`}>Reviews</h2>
								<GetFullReviews proInteractions={user.proInteractions} />
							</div>

						</div>
						<div className={`col col--4`}>
							<Booking pro={user} user={auth} />
							<div className={'profile__cancellation text--center'}>
								<Link to="/cancellation-policy">Cancellation Policy</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<Loading />
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const uid = ownProps.match.params.uid
	const users = state.firestore.ordered.users
	// console.log(state.firestore);

	var user = ''
	if (typeof users !== 'undefined') {
		users.forEach(function (usr, index) {
			if (usr.id === uid) {
				user = usr
			}
		})
	}
	// console.log(state);

	return {
		user: user,
		auth: state.firebase.auth,
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props, store) => {
		// const uid = props.user.uid;
		return [{
			collection: 'users'
		}]
	})
)(Profile)