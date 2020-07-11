import React from 'react'
import ImageUpload from "../profileEdit/imageUpload/premiumImageUpload"
import VideoUpload from "../profileEdit/imageUpload/videoUrlUpload"
import Cards from "../../components/profileEdit/imageCard/imageCard"
import { fileStorage, db } from '../../config/fbConfig'
import { connect } from "react-redux"

function PhotosVideos({ profile,auth }) {
const deleteVideo=(url)=>{
    const videoOwner = auth.uid;
      
     
    let videoArray=profile.videoUrls
   
     let newArray=videoArray.filter(item=>item!==url)
     
                db.collection(`users`).doc(videoOwner).update({
                    videoUrls:newArray
                })


}



    return (
        <div >
            <ImageUpload></ImageUpload>
            <div className="flexrow">
                {
                    profile.premiumPhotos && profile.premiumPhotos.map(item => <Cards key={item.filePath} url={item.url} filePath={item.filePath}></Cards>)
                }

            </div>
            <hr className="m-20"></hr>
            <VideoUpload></VideoUpload>

            <div className="flexrow">
                {
                    profile.videoUrls && profile.videoUrls.map(item => 
                        
                        
                       {
                         console.log(item)  
                        return(

                        <div className="col col--4 relative " key={item}>
                            <div className="modal__btn">
							<button className="modal__close" onClick={()=>deleteVideo(item)}>X</button>
						</div>
                            <div className="video video--responsive video--small ">
                                <div className="video__iframe zindex-">
                                <iframe width="560" height="315" src={item} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                  
                                        </div>
                            </div>
                        </div>

                       
                    )}
                    )
                }

            </div>



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