import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fileStorage, db } from '../../../config/fbConfig'
import { Redirect, Link, withRouter } from 'react-router-dom'

class RenderLicense extends Component {

	constructor(props) {
		super(props);
		this.state = {}
		this.renderImage = this.renderImage.bind(this);
	}

	componentDidMount() {
		const uid = this.props.auth.uid;
		const image = this.props.profile.photoLicenseURL
		const ref = fileStorage.ref(`users/${uid}/license/${image}`)
		ref.getDownloadURL()
			.then((url) => {
				// console.log(url);
				this.setState({ url })
			})
			.catch((error) => {
				console.log(error);
			})
	}


	renderImage = () => {
		if (typeof this.state.url === 'undefined') return null;
		return (
			<img src={this.state.url} alt={this.props.alt} />
		);
	}

	render() {
		return (
			<div className={'profile-image__current'}>
				{this.renderImage()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(withRouter(RenderLicense))
