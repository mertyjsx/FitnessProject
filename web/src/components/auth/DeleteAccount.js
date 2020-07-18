import React from "react"
import { connect } from 'react-redux'
import { Button } from "semantic-ui-react"
import { deleteAccount } from '../../store/actions/authActions'
import Modal from '../modal/Modal'

const DeleteAccount = (props) => {

	const remove = () => {
		// console.log('removed', props);
		props.deleteAccount()
	}

	const modalContent = (
		<>
			<h2>Confirm Deletion</h2>
			<Button onClick={remove}>Delete</Button>
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
		deleteAccount: () => dispatch(deleteAccount())
	}
}

export default connect(null, mapDispatchToProps)(DeleteAccount)
