import React from 'react'
import { connect } from "react-redux"
import Cards from "../../components/profileEdit/imageCard/imageCard"
import { db } from '../../config/fbConfig'
import ImageUpload from "../profileEdit/imageUpload/premiumImageUpload"
import VideoUpload from "../profileEdit/imageUpload/videoUrlUpload"

function PhotosVideos({ profile, auth }) {

    const deleteVideo = (url) => {
        const videoOwner = auth.uid;
        let videoArray = profile.videoUrls
        let newArray = videoArray.filter(item => item !== url)
        db.collection(`users`).doc(videoOwner).update({
            videoUrls: newArray
        })
    }

    return (
        <div>
            {!profile.isProPremium ?
                (
                    <div className="status status--success mb--double">
                        Upgrade to Pro Premium Today
                    </div>
                ) : (
                    <>
                        <div className="mb--double">
                            <ImageUpload></ImageUpload>
                            <div className="row">
                                {
                                    profile.premiumPhotos && profile.premiumPhotos.map(item => <Cards key={item.filePath} url={item.url} filePath={item.filePath}></Cards>)
                                }

                            </div>
                        </div>

                        <div className="mb--double">

                            <VideoUpload></VideoUpload>
                            <div className="row">
                                {
                                    profile.videoUrls && profile.videoUrls.map(item => {
                                        // console.log(item)
                                        return (
                                            <div className="col col--4 relative" key={item}>
                                                <div className="modal__btn">
                                                    <button className="modal__close" onClick={() => deleteVideo(item)}>X</button>
                                                </div>
                                                <div className="video video--responsive video--small ">
                                                    <div className="video__iframe zindex-">
                                                        <iframe width="100%" height="315" src={item} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

//const mapDispatchToProps = (dispatch) => {
//   return {
//   completeOnboarding: (payload) => dispatch(completeOnboardingClient(payload))
//   }
//}

export default connect(mapStateToProps)(PhotosVideos)