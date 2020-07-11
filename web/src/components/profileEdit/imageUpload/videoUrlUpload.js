import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fileStorage, db } from '../../../config/fbConfig'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Modal from "../../modal/Modal"

class VideoUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
            videoUrl:"",
            firstUpload:true,
            success:false
		}
	
	}



	handleUpload = (e) => {
		e.preventDefault()
		
        const imageOwner = this.props.auth.uid;
      
     
        let videoArray=this.props.profile.videoUrls
        if(!videoArray){
        
        videoArray=[]
        
        }
         videoArray.push(this.state.videoUrl)



				
					db.collection(`users`).doc(imageOwner).update({
						videoUrls:videoArray 
                    }).then(()=>{

                        this.setState({firstUpload:false,success:true})

                        setTimeout(() => {
                            this.setState({success:false})
                        }, 2000);


                    }
                    
                    
                    
                    
                    )
				
				

	
	}

	render() {
		return (
           <Modal 
           buttonText={'Upload Video Url'} buttonStyle={'button button--md button--secondary'}
           content={(
            <form onSubmit={this.handleUpload} className={'profile-image__upload'}>
				
            <input value={this.state.videoUrl}  type="url" placeholder="Enter your  video url (embed) : https://www.youtube.com/embed/uz1wLTFXidA" label="Pinterest" onChange={(e)=>this.setState({videoUrl:e.target.value})} />
            <button className={`button button--primary text--uppercase`}>{this.state.firstUpload ?  'Upload Url' : 'Upload New Url'}</button>
           {this.state.success&&
            <div className="alertYellow m-20" >Video url uploaded !!</div>
           }
           
           
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

export default connect(mapStateToProps)(withRouter(VideoUpload))
