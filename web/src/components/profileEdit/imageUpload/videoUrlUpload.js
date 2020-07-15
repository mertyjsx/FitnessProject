import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { db } from '../../../config/fbConfig'
import Modal from "../../modal/Modal"

class VideoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoUrl: "",
            firstUpload: true,
            success: false,
            MaxUploadError:false,
            videoError:false
        }
    }



    CheckMaxUpload=async ()=>{
        const currentUserUid = this.props.auth.uid;
    const userInfo= await db.collection(`users`).doc(currentUserUid).get()
    const lengthOfVideos=userInfo.data().videoUrls?userInfo.data().videoUrls.length:0
    
    console.log(lengthOfVideos)
    return (lengthOfVideos<5)
    
    }










    handleUpload =async (e) => {

        e.preventDefault()

        const Check=await this.CheckMaxUpload()

        if(Check){
            const videoOwner = this.props.auth.uid;
            let videoArray = this.props.profile.videoUrls
            if (!videoArray) {
                videoArray = []
            }
            let embledUrl=`https://www.youtube.com/embed/${this.state.videoUrl.split("=")[1]}`
            if(this.state.videoUrl.split("=")[1].length>11){

this.setState({videoError:true})


            }else{
                this.setState({videoError:false})
                videoArray.push(embledUrl)
                db.collection(`users`).doc(videoOwner).update({
                    videoUrls: videoArray
                }).then(() => {
                    this.setState({ firstUpload: false, success: true })
                    setTimeout(() => {
                        this.setState({ success: false })
                    }, 2000);
                })
    

            }
          
        }else{
            const $this=this

            this.setState({
                MaxUploadError:true
            })
        
        setTimeout(() => {
            $this.setState({
                MaxUploadError:false
            })
        }, 2000);


        }

     
    }

    render() {
        return (
            <Modal
                buttonText={'Upload Video Url'} buttonStyle={'button button--md button--secondary'}
                content={(
                    <form onSubmit={this.handleUpload} className={'profile-image__upload'}>

                        <input value={this.state.videoUrl} type="url" placeholder="Enter your  video url (embed) : https://www.youtube.com/embed/uz1wLTFXidA" label="Pinterest" onChange={(e) => this.setState({ videoUrl: e.target.value })} />
                        <button className={`button button--primary text--uppercase`}>{this.state.firstUpload ? 'Upload Url' : 'Upload New Url'}</button>
                        {this.state.success &&
                            <div className="alertYellow m-20" >Video url uploaded !!</div>
                        }
                        {this.state.MaxUploadError&&
				      	<div
					    style={{
						margin:10,
						backgroundColor:"#F08080",
						padding:10,
						color:"white"

					     }}
					>You cant upload more than 5 !</div>
					      }
                           {this.state.videoError&&
				      	<div
					    style={{
						margin:10,
						backgroundColor:"#F08080",
						padding:10,
						color:"white"

					     }}
					>Please upload short link! like: https://www.youtube.com/watch?v=r7xt3u3clGQ</div>
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
