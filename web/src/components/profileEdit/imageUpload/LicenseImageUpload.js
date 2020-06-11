import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fileStorage, db } from '../../../config/fbConfig'
import { Redirect, Link, withRouter } from 'react-router-dom'


class LicenseImageUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: null,
			url: '',
			progress: 0,
			photoURL: '',
			condition: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
	}

	handleChange = (e) => {
		if (e.target.files[0]) {
			const image = e.target.files[0];
			this.setState(() => ({
				image: image
			}));
		}
	}

	handleUpload = (e) => {
		e.preventDefault()
		const { image } = this.state;
		const imageOwner = this.props.auth.uid;
		const uploadTask = fileStorage.ref(`users/${imageOwner}/license/${image.name}`).put(image);
		// console.log(image);
		uploadTask.on('state_changed',
			(snapshot) => {
				// Progress
				const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
				this.setState({ progress });
			},
			(error) => {
				// Errors
				console.log('Error:', error);
			},
			() => {
				// Complete
				fileStorage.ref(`users/${imageOwner}/license`).child(image.name).getDownloadURL().then(url => {
					// console.log(url);
					this.setState({ url });
					db.collection(`users`).doc(imageOwner).update({
						licenseURL: url
					});
					return
				}).catch((error) => {
					console.log('inside error', error);
					return null
				})

			});
	}

	render() {
		return (
			<form onSubmit={this.handleUpload} className={'profile-image__upload'}>
				<progress value={this.state.progress} max="100" />
				<input type="file" onChange={this.handleChange} required />
				<button className={`button button--primary text--uppercase ${this.state.progress === 100 ? 'button--inactive' : ''}`}>{this.state.progress === 100 ? 'License Successfully Uploaded' : 'Upload License'}</button>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(withRouter(LicenseImageUpload))
