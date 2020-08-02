import React, { useState } from "react"
import { connect } from 'react-redux'
import { deleteAccount } from '../../store/actions/authActions'
import Modal from '../modal/Modal'

const DeleteAccount = (props) => {
	const [password, setPassword] = useState('');

	const handleChange = (e) => {
		setPassword(e.target.value)
	}

	const remove = (e) => {
		e.preventDefault()
		password && props.deleteAccount(password)
	}

	const modalContent = (
		<>
			<h2>Confirm Deletion</h2>
			<p>To delete your acccount, enter your password and submit below.</p>
			<form onSubmit={remove}>
				<div className="form__inner">
					<div className="field">
						<input type="password" defaultValue={password} onChange={handleChange} required />
					</div>
					<div className="field">
						<button className={'button'}>Delete</button>
					</div>
				</div>
			</form>
		</>
	)

	return (
		<div className={'delete-account blocked'}>
			<h2>Delete Account</h2>
			<p>Permanently delete your account and all of your content.</p>
			<Modal
				buttonText={'Delete Account'}
				buttonStyle={'button button--md button--secondary'}
				content={modalContent}
			/>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAccount: (password) => dispatch(deleteAccount(password))
	}
}

export default connect(null, mapDispatchToProps)(DeleteAccount)
