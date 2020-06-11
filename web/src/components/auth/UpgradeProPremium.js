import React from "react"
import { Button, Modal } from "semantic-ui-react"
import { connect } from 'react-redux'
import { upgrade } from '../../store/actions/authActions'

const UpgradeProPremium = (props) => {

	const { isProPremium } = props

	const remove = () => {
		// console.log('removed', props);
		props.deleteAccount()
	}

	return (
		<div className={'pro-premium'}>
			<h3>Pro Premium</h3>
			<p>You are currently <strong>{isProPremium ? 'enrolled' : 'not enrolled'}</strong> to the Pro Premium program.</p>
			{/* <Modal trigger={<Button className={`button button--primary text--uppercase text--font-secondary text--sm`} >Delete Account</Button>} >
				<Modal.Content>
					<Modal.Actions>
					</Modal.Actions>
					<Modal.Description className="modal-description__container">
						<h2>Confirm Deletion</h2>
						<Button onClick={remove}>Delete</Button>
					</Modal.Description>
				</Modal.Content>
			</Modal> */}
		</div>
	);
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		// projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		// notifications: state.firestore.ordered.notifications,
		profile: state.firebase.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		upgrade: () => dispatch(upgrade())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeProPremium)
