import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
	return (
		<ul>
			<li><NavLink to="/create-project">New Project</NavLink></li>
			<li><a href="#" onClick={props.signOut}>Logout</a></li>
			<li><NavLink to="/" className="user">{props.profile.initials}</NavLink></li>
		</ul>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks)