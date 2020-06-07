import React, { Component } from 'react'

class ThankYouConvertKit extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="container" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
				<div className="row">
					<div className="col text--center">
						<h1 style={{ flex: '0 1 100%' }}>Thank you for subscribing</h1>
						<p style={{ flex: '0 1 100%' }}>Check your email to confirm your subscription.</p>
					</div>
				</div>
			</div>
		)
	}
}

export default ThankYouConvertKit