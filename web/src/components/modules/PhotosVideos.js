import React from 'react'
import ImageUpload from "../profileEdit/imageUpload/premiumImageUpload"
import Cards from "../../components/profileEdit/imageCard/imageCard"
import {connect} from "react-redux"

 function PhotosVideos({profile}) {
     
    return (
        <div >
            <ImageUpload></ImageUpload>
<div className="flexrow">
            {
               profile.premiumPhotos&&profile.premiumPhotos.map(item=><Cards url={item.url} filePath={item.filePath}></Cards>)
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