import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fileStorage, db } from '../../../config/fbConfig'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Modal from "../../modal/Modal"

class ImageUpload extends Component {
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
        const randomNumber= Math.floor(Math.random() * Math.floor(10000));
        const filepath=`users/${imageOwner}/${image.name}/${randomNumber}`
		const uploadTask = fileStorage.ref(filepath).put(image);
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
                console.log(filepath)
				fileStorage.ref(filepath).getDownloadURL().then(url => {
                    // console.log(url);
                    let photoArray=this.props.profile.premiumPhotos
if(!photoArray){

photoArray=[]

}
 photoArray.push({url:url,filePath:filepath})

					this.setState({ url });
					db.collection(`users`).doc(imageOwner).update({
						premiumPhotos: photoArray
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
           <Modal 
           buttonText={'Upload photo'} buttonStyle={'button button--md button--secondary'}
           content={(
			<form onSubmit={this.handleUpload} className={'profile-image__upload'}>
				<progress value={this.state.progress} max="100" />
				<input type="file" onChange={this.handleChange} required />
				<button className={`button button--primary text--uppercase `}>{this.state.progress === 100 ? 'Upload new Image' : this.state.progress===0?'upload':'uploading ..'}</button>
			</form>
            )}
           
           
           ></Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default connect(mapStateToProps)(withRouter(ImageUpload))
