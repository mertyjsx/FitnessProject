
import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { approveProfile, declineProfile } from '../../store/actions/authActions';
import Modal from '../modal/Modal';

const PendingProfiles = (props) => {
	const { users } = props
	const [message, setMessage] = React.useState("")
	const pro = (user) => {
		return (
			<div className="review">
				<div className="review__name">
					<h2>Review Profile</h2>
					<p><strong>ID:</strong> {user.id}</p>
					<p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
					<p><strong>Profession:</strong> {user.professions.chef ? 'Chef' : null} {user.professions.chef ? 'Chef' : null} {user.professions.fitnessTrainer ? 'Fitness Trainer' : null} {user.professions.massageTherapist ? 'Massage Therapist' : null} {user.professions.nutritionist ? 'Nutritionist' : null}</p>
					<p><strong>Profile Image:</strong> {user.photoURL ? <a href={user.photoURL} target="_blank">Open Image</a> : 'No Profile Image Added'}</p>
					<p><strong>License Image:</strong> {user.licenseURL ? <a href={user.licenseURL} target="_blank">Open Image</a> : 'No License Image Added'}</p>
					<p><strong>About/Experience:</strong> {user.about}</p>
					<p><strong>Favorite Quote:</strong> {user.favQuote}</p>
					<p><strong>Fun Fact:</strong> {user.funFact}</p>
					<p><strong>Business Name:</strong> {user.businessName}</p>
					<p><strong>Business Address:</strong> {user.businessAddress1} {user.businessAddress2} {user.businessCity}, {user.businessState} {user.businessZip}</p>
					<p><strong>Social:</strong> {user.socialInstagram && (<a href={user.socialInstagram} target={`_blank`}>Instagram</a>)} {user.socialFacebook && (<a href={user.socialFacebook} target={`_blank`}>Facebook</a>)} {user.socialPinterest && (<a href={user.socialPinterest} target={`_blank`}>Pinterest</a>)} {user.socialTwitter && (<a href={user.socialTwitter} target={`_blank`}>Twitter</a>)}</p>

					<div className="review__buttons">
						<button onClick={() => {
							props.approveProfile(user.id)
							//document.body.style.overflow = 'unset'
						}} className="button button--secondary" style={{ marginBottom: '10px' }}>Approve</button>
						<p><strong>-- OR --</strong></p>
						<Input value={message} placeholder={'Decline Message'} onChange={(e) => setMessage(e.target.value)} />
					</div>
				</div>
			</div>
		)
	}
	// console.log("noldiii")
	return (
		<div className="pending-profiles">
			<h2>Pending Profiles</h2>
			<ul>
				{users && users.map(user => {
					if (user.isPro === true && user.isApproved === false && !user.isDeclined && !user.reSubmit) {
						return (
							<li key={user.id}>
								<Modal buttonStyle="button" declineButton={true} declineButtonAction={() => props.declineProfile(user.id, message)} buttonText={`Review ${user.declineMessage && "Resubmitted Profile"} : ${user.firstName} ${user.lastName}`} content={pro(user)} message={message} setMessage={setMessage} />
							</li>
						)
					}
					return null
				})}
			</ul>
			<h2 style={{ marginTop: '50px' }}>Resubmitted Profiles</h2>
			<ul>
				{users && users.map(user => {
					if (user.isPro === true && user.isApproved === false && user.reSubmit) {
						return (
							<li key={user.id}>
								<Modal buttonStyle="button" declineButton={true} declineButtonAction={() => props.declineProfile(user.id, message)} buttonText={`Review ${user.declineMessage && "Profile"} : ${user.firstName} ${user.lastName}`} content={pro(user)} message={message} setMessage={setMessage} />
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
		approveProfile: (proUID) => dispatch(approveProfile(proUID)),
		declineProfile: (proUID, message) => dispatch(declineProfile(proUID, message))
	}
}

export default connect(null, mapDispatchToProps)(PendingProfiles)