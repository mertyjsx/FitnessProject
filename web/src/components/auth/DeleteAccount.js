import React from "react"
import { Button, Modal } from "semantic-ui-react"
import { connect } from 'react-redux'
import { deleteAccount } from '../../store/actions/authActions'

const DeleteAccount = (props) => {

	const remove = () => {
		// console.log('removed', props);
		props.deleteAccount()
	}

	return (
		<div className={'delete-account blocked'}>
			<h3>Delete Account</h3>
			<p>Permanently delete your account and all of your content.</p>
			<Modal trigger={<Button className={`button button--primary text--uppercase text--font-secondary text--sm`} >Delete Account</Button>} >
				<Modal.Content>
					<Modal.Actions>
						{/* <Button class="button__close">X</Button> */}
					</Modal.Actions>
					<Modal.Description className="modal-description__container">
						<h2>Confirm Deletion</h2>
						<Button onClick={remove}>Delete</Button>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAccount: () => dispatch(deleteAccount())
	}
}

export default connect(null, mapDispatchToProps)(DeleteAccount)
