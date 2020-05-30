import React, { Component } from 'react'
import Notifications from '../dashboard/Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Search from '../search/Search'
import ProList from '../search/ProList'

class FindAPro extends Component {
	render() {
		const { users, auth, profile } = this.props
		// console.log('all users:', users);
		// console.log('if auth:', auth);
		// console.log('current profile', profile);
		return (
			<div className="find-pro">
				<div className="container">
					{/* <Search pros={users} auth={auth} currentUser={profile} /> */}
					<ProList pros={users} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	// console.log(state.firestore.ordered);
	return {
		users: state.firestore.ordered.users,
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: 'users' }
	])
)(FindAPro)