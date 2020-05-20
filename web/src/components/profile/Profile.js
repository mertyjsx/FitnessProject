import React from 'react'
import { connect } from 'react-redux'
import { firestore, firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const Profile = (props) => {
	const { auth, user } = props;

	if (!auth.uid) return <Redirect to='/signin' />

	if (user) {
		return (
			<div className="profile">
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col col--8">
							<div className={`profile__nav`}>
								<ul>
									<li>About</li>
									<li>Professional Background</li>
									<li>Credentials</li>
									<li>Reviews</li>
								</ul>
							</div>
							<div className={`profile__image`}>
								image
							</div>
							<div className={`profile__meta`}>
								<div className={`profile__meta-inner`}>
									<h1>{`${user.firstName} ${user.lastName}`}</h1>
									<p>star rating</p>
									<div className={`profile__meta-btns`}>
										btns
									</div>
									<div className={`profile__meta-specialties`}>
										<h2>Specialties</h2>
									</div>
								</div>
							</div>
							<div className={`profile__about`}>
								<h2>About</h2>
							</div>
							<div className={`profile__professional-background`}>
								<h2>Professional Background</h2>
							</div>
							<div className={`profile__credentials`}>
								<h2>Credentials</h2>
							</div>
							<div className={`profile__reviews`}>
								<h2>Reviews</h2>
							</div>
						</div>
						<div className={`col col--4`}>
							<div className={`profile__booking`}>
								<div className={`profile__booking-price`}>
									<p className={`mb--0`}>Starting at</p>
									<p className={`profile__booking-price-number mb--0 text--font-secondary text--lg`}>$xx</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className={'container'}>
				..Loading
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const uid = ownProps.match.params.uid
	const users = state.firestore.data.users
	const user = users ? users[uid] : null
	// console.log(users);
	return {
		user: user,
		auth: state.firebase.auth
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'users' }
	])
)(Profile)