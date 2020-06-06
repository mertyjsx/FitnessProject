import React, { Component } from 'react'
import ellipses from '../../assets/images/ellipsis.gif'

class Loading extends Component {
	render() {
		return (
			<div className="loading page">
				<div>
					<img src={ellipses} />
					{/* Loading */}
				</div>
			</div>
		)
	}
}

export default Loading