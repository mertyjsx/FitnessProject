import React from 'react'
import { connect } from "react-redux"
import { db, fileStorage } from '../../../config/fbConfig'
function Card({ url, filePath, auth, profile }) {

    const handleDelete = (e) => {
        e.preventDefault()
        const imageOwner = auth.uid;
        console.log(filePath)
        fileStorage.ref(filePath).delete().then(() => {
            let photoArray = profile.premiumPhotos
            let newPhotoArray = photoArray.filter(item => {
                return item.url !== url
            })
            db.collection(`users`).doc(imageOwner).update({
                premiumPhotos: newPhotoArray
            }).then(() => console.log("bitti"))
        })
    }
    // console.log(url)
    return (
        <div className="relative">
            <img src={url} className="imageCard"></img>
            <div className="modal__btn">
                <button className="modal__close" onClick={handleDelete}>X</button>
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

export default connect(mapStateToProps)(Card)