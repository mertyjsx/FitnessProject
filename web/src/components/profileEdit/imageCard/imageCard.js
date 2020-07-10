import React from 'react'
import { fileStorage, db } from '../../../config/fbConfig'
import {connect} from "react-redux"
function Card({url,filePath,auth,profile}) {

   const handleDelete = (e) => {
		e.preventDefault()
	
        const imageOwner = auth.uid;
        console.log(filePath)
		 fileStorage.ref(filePath).delete().then(()=>{

            let photoArray=profile.premiumPhotos
            let newPhotoArray=photoArray.filter(item=>{
                
              
                
                return  item.url!==url
                
               })

            db.collection(`users`).doc(imageOwner).update({
                premiumPhotos: newPhotoArray
            }).then(()=>console.log("bitti"))


        })
		
		

					
					
			

		
	}



    console.log(url)
    return (
        <div  className="relative"> 
   <img src={url}   className="imageCard"></img>
<div className="imageDeleteIcon" onClick={handleDelete}>X</div>

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

export default connect(mapStateToProps)(Card)