import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class RenderImage extends Component {

	constructor(props) {
		super(props);
		this.state = {}
		this.renderImage = this.renderImage.bind(this);
	}

	renderImage = (urlPath, uid) => {
		if (typeof urlPath === 'undefined') return null;
		return <img src={urlPath} />
	}

	render() {
		const { profile } = this.props

		return (
			<div className={'profile-image__current'}>
				{this.renderImage(profile.photoURL)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	// console.log(state);

	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(withRouter(RenderImage))
