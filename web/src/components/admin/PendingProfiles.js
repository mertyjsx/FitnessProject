
import React from 'react'
import Modal from '../modal/Modal'
import { approveProfile } from '../../store/actions/authActions'
import { connect } from 'react-redux'

const PendingProfiles = (props) => {
	const { users } = props

	const pro = (user) => {
		return (
			<div className="review">
				<div className="review__name">
					<h2>Review Profile</h2>
					<p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
					<p><strong>Profession:</strong> {user.professions.chef ? 'Chef' : null} {user.professions.chef ? 'Chef' : null} {user.professions.fitnessTrainer ? 'Fitness Trainer' : null} {user.professions.massageTherapist ? 'Massage Therapist' : null} {user.professions.nutritionist ? 'Nutritionist' : null}</p>
					<p><strong>Profile Image:</strong> <a href={user.photoURL} target="_blank">Open Image</a></p>
					<p><strong>License Image:</strong> <a href={user.photoLicenseURL} target="_blank">Open Image</a></p>
					<p><strong>About:</strong> {user.about}</p>
					<p><strong>Background:</strong> {user.background}</p>
					<p><strong>Favorite Quote:</strong> {user.favQuote}</p>
					<p><strong>Fun Fact:</strong> {user.funFact}</p>
					<p><strong>Business Name:</strong> {user.businessName}</p>
					<p><strong>Business Address:</strong> {user.businessAddress1} {user.businessAddress2} {user.businessCity}, {user.businessState} {user.businessZip}</p>
					<button onClick={() => {
						props.approveProfile(user.id)
						document.body.style.overflow = 'unset'
					}} className="button button--secondary" style={{ marginBottom: '10px' }}>Approve</button>
					{/* <button className="button button--primary">Decline</button> */}
				</div>
			</div>
		)
	}

	return (
		<div className="pending-profiles">
			<h2>Pending Profiles</h2>
			<ul>
				{users && users.map(user => {
					if (user.isPro === true && user.isApproved === false) {
						return (
							<li key={user.id}>
								<Modal buttonStyle="button" buttonText={`Review ${user.firstName} ${user.lastName}`} content={pro(user)} />
							</li>
						)
					}
					return null
				})}
			</ul>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		approveProfile: (proUID) => dispatch(approveProfile(proUID))
	}
}

export default connect(null, mapDispatchToProps)(PendingProfiles)