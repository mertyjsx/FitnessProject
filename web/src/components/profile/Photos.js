import React from 'react';
import ModalImage from "react-modal-image";


export default function Photos({ photos }) {
    //  console.log(photos)
    return (
        <div className="row">
            {
                photos && photos.map(item => (
                    <ModalImage
                        // className="col col--4"
                        key={item.filePath}
                        small={item.url}
                        large={item.url}
                        alt="Hello World!"
                    />
                ))
            }
        </div>
    )
}


