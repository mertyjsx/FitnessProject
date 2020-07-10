import React from 'react'
import ImageUpload from "../profileEdit/imageUpload/premiumImageUpload"
import Cards from "../../components/profileEdit/imageCard/imageCard"
import {connect} from "react-redux"

 export default function Photos({photos}) {
     console.log(photos)
    return (
        <div >
            
<div className="flexrow">
            {
                photos&&photos.map(item=><img key={item.filePath} className="imageCard" src={item.url} ></img>)
            }

</div>
        </div>
    )
}


