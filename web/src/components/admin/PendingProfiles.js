
import React from 'react'
import Modal from '../modal/Modal'
import { approveProfile,declineProfile } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import {  Input } from 'semantic-ui-react';

const PendingProfiles = (props) => {
	const { users } = props
const [message,setMessage]=React.useState("")
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
						//document.body.style.overflow = 'unset'
					}} className="button button--secondary" style={{ marginBottom: '10px' }}>Approve</button>
					<Input value={message}  placeholder={'Decline Message'}   onChange={(e)=>setMessage(e.target.value)} />
				
					{/* <button className="button button--primary">Decline</button> */}

					
				</div>
			</div>
		)
	}
console.log("noldiii")
	return (
		<div className="pending-profiles">
			<h2>Pending Profiles</h2>
			<ul>
				{users && users.map(user => {
					if (user.isPro === true && user.isApproved === false) {
						return (
							<li key={user.id}>
								<Modal buttonStyle="button" declineButton={true} declineButtonAction={()=>props.declineProfile(user.id,message)}  buttonText={`Review ${user.declineMessage&&"declined"} ${user.firstName} ${user.lastName}`} content={pro(user)} message={message} setMessage={setMessage} />
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
		declineProfile: (proUID,message) => dispatch(declineProfile(proUID,message))
	}
}

export default connect(null, mapDispatchToProps)(PendingProfiles)