import React from 'react'

export default function Videos({ videoUrls }) {
    return (
        <div className="row">
            {
                videoUrls && videoUrls.map(item =>
                    (
                        <div className="col col--6" key={item}>
                            <div className="video video--responsive video--small" >
                                <div className="video__iframe">
                                    <iframe title="" width="100%" height="315" src={item} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}


