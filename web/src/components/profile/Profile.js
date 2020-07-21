import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import AccordionView from '../accordion/AccordionView'
import SignIn from '../auth/SignIn'
import { convertToCapitalizeCase, renderBlueCheck } from '../helpers/HelpersProfile'
import Modal from '../modal/Modal'
import Loading from '../modules/Loading'
import GetFullReviews from '../rating/GetFullReviews'
import GetRating from '../rating/GetRating'
import Booking from './Booking'
import Inquiry from './Inquiry'
import Photos from "./Photos"
import Videos from "./Videos"

const Profile = (props, state) => {

	const { auth, user } = props;
	// console.log(user);
	

	// if (!auth.uid) return <Redirect to='/signin' />

	const renderProfileNav = (about, background, credentials, faq, photos, videos, reviews) => {
		// console.log(typeof credentials);
		var navItems = [];
		if (typeof about === 'string') { navItems.push(<li key={'about'}><a href="#about">About</a></li>) }
		if (typeof background === 'string') { navItems.push(<li key={'background'}><a href="#background">Background</a></li>) }
		if (typeof credentials === 'string') { navItems.push(<li key={'credentials'}><a href="#credentials">Credentials</a></li>) }
		if (typeof faq === 'string') { navItems.push(<li key={'faq'}><a href="#faq">FAQs</a></li>) }
		if (photos === true) { navItems.push(<li key={'photos'}><a href="#photos">Photos</a></li>) }
		if (videos === true) { navItems.push(<li key={'videos'}><a href="#videos">Videos</a></li>) }
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

	const renderSecondSpecialties = () => {
		var secondItems = [];
		for (const [key, value] of Object.entries(user.specialties)) {
			if (value === true) {
				secondItems.push(convertToCapitalizeCase(key))
			}
		}
		return (secondItems.join(', '))
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
		<Modal buttonStyle="button button--inverted" buttonText={`Message Pro`} content={(<Inquiry pro={user} user={auth} />)} />
	)

	const renderCredentials = (cred) => {
		if (typeof cred !== 'string') { return null }
		return (
			<div id="credentials" className={`profile__credentials`}>
				<h2 className={`text--uppercase`}>Credentials</h2>
				<p><FontAwesomeIcon icon={["fa", "file"]} className="yellow" /> <a href={cred} target="_blank" style={{ fontWeight: 'bold' }}>License</a></p>
			</div>
		)
	}

	const renderImage = (image) => {
		if (typeof image !== 'string') { return null }
		return (
			<img src={image} />
		)
	}

	const renderFAQ = () => {
		if (typeof user.faq1Question !== 'string') { return null }
		return (
			<div id="faq" className={`profile__faq`}>
				<h2 className={`text--uppercase`}>FAQs</h2>
				<AccordionView
					qa_1={[user.faq1Question, user.faq1Answer]}
					qa_2={[user.faq2Question, user.faq2Answer]}
					qa_3={[user.faq3Question, user.faq3Answer]}
					qa_4={[user.faq4Question, user.faq4Answer]}
					qa_5={[user.faq5Question, user.faq5Answer]}
				/>
			</div>
		)
	}

	if (user) {
		return (
			<div className="profile">
				<div className="container container--top-bottom-padding">
					<div className="row row--flex-start">
						<div className="col col--8">
							<div className={`profile__nav`}>
								{renderProfileNav(
									user.about,
									user.background,
									user.credentials,
									user.faq1Question,
									user.premiumPhotos ? true : false,
									user.videoUrls ? true : false,
									true)}
							</div>
							<div className={`profile__image`}>
								{renderImage(user.photoURL)}
							</div>
							<div className={`profile__meta`}>
								<div className={`profile__meta-inner`}>
									<div className={`profile__meta-title`}>
										<h1 className={`text--no-margin text--capitalize`}>{`${user.firstName} ${user.lastName}`} {renderBlueCheck(user)}</h1>
										<ul className={'list list--inline'} style={{ width: '100%' }}>
											<li>{user.socialFacebook ? <div><a href={user.socialFacebook} target="_blank"><FontAwesomeIcon icon={["fab", "facebook-f"]} /></a></div> : null}</li>
											<li>{user.socialTwitter ? <div><a href={user.socialTwitter} target="_blank"><FontAwesomeIcon icon={["fab", "twitter"]} /></a></div> : null}</li>
											<li>{user.socialInstagram ? <div><a href={user.socialInstagram} target="_blank"><FontAwesomeIcon icon={["fab", "instagram"]} /></a></div> : null}</li>
											<li>{user.socialPinterest ? <div><a href={user.socialPinterest} target="_blank"><FontAwesomeIcon icon={["fab", "pinterest-p"]} /></a></div> : null}</li>
										</ul>
									</div>

									<GetRating proInteractions={user.proInteractions} />
									<div className={`profile__meta-btns`}>
										{auth.uid ?
											(<div className="profile__meta-btn">
												{sendMessage()}
											</div>)
											:
											null
										}
										<div className="profile__meta-btn">
											<Modal
												buttonStyle="button button--secondary"
												buttonText={`Share Profile`}
												content={(
													<div>
														<p className="text--sm" style={{ textAlign: 'center' }}>Share {user.firstName}'s profile on your favorite social medium</p>
														<div className="share__btns">
															<a href={'http://www.facebook.com/sharer/sharer.php?u=' + window.location.href} target="_blank" className="share__btn">Share on Facebook <FontAwesomeIcon icon={["fab", "facebook-f"]} /></a>
															<a href={'https://twitter.com/intent/tweet?text=Choose%20To%20Be%20You&url=' + window.location.href} target="_blank" className="share__btn">Share on Twitter <FontAwesomeIcon icon={["fab", "twitter"]} /></a>
															<a href={'http://pinterest.com/pin/create/button/?url=' + window.location.href} target="_blank" className="share__btn">Share on Pinterest <FontAwesomeIcon icon={["fab", "pinterest-p"]} /></a>
														</div>
													</div>
												)} />
										</div>
									</div>
									<div className={`profile__meta-specialties`}>
										<h2 className="text--uppercase"><FontAwesomeIcon icon="list" /> Specialties</h2>
										<div className="profile__meta-spec">
											<h3 className="mb--0"><strong>Main</strong></h3>
											{renderMainSpecialties(user.professions)}
										</div>
										{user.specialties && (
											<div className="profile__meta-spec text--capitalize">
												<h3 className="mb--0"><strong>Specializing In:</strong></h3>
												{renderSecondSpecialties()}
											</div>
										)}
									</div>
								</div>
							</div>

							{renderAbout(user.about, user.funFact, user.favQuote)}

							{renderBackground(user.background)}

							{renderCredentials(user.licenseURL)}

							{renderFAQ()}

							{user.isProPremium &&
								[<div id="photos" className={`profile__photos`}>
									<h2 className={`text--uppercase`}>Photos</h2>
									<Photos id={user.uid} photos={user.premiumPhotos} />
								</div>,
								<div id="videos" className={`profile__videos`}>
									<h2 className={`text--uppercase`}>Videos</h2>
									<Videos id={user.uid} videoUrls={user.videoUrls} />
								</div>
								]
							}

							<div id="reviews" className={`profile__reviews`}>
								<h2 className={`text--uppercase`}>Reviews</h2>
								<GetFullReviews proInteractions={user.proInteractions} />
							</div>

						</div>
						<div className={`col col--4`}>
							{auth.uid ?(
user.uid!==auth.uid&&(<Booking pro={user} user={auth} />)
							) 
								
							
							
								
								:
								(
									<div style={{ border: '#cecece solid 1px' }}>
										<p className="text--center" style={{ padding: '10px', margin: '0' }}>You must be signed in the contact the Pro.</p>
										<SignIn />
									</div>
								)}
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