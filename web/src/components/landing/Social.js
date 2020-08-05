import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

class Social extends Component {
	render() {
		return (
			<div className="social page">
				<div className="container container--top-bottom-padding">
					<div className="row">
						<div className="col" style={{ justifyContent: 'center' }}>
							<h1 className="text--lg">Choose To Be You</h1>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<ul className="list list--inline" style={{ flex: '0 1 100%', justifyContent: 'center', marginBottom: '20px' }}>

								<li><a href="#home" target={'_blank'} style={{ fontSize: '22px' }}><FontAwesomeIcon icon={["fab", "facebook-f"]} /></a></li>
								<li><a href="#home" target={'_blank'} style={{ fontSize: '22px' }}><FontAwesomeIcon icon={["fab", "twitter"]} /></a></li>
								<li><a href="#home" target={'_blank'} style={{ fontSize: '22px' }}><FontAwesomeIcon icon={["fab", "youtube"]} /></a></li>
							</ul>
							<div className={'callout'}>
								<a className={'callout__button'} href={'#'}>Shop Official Store</a>
							</div>
							<div className={'callout'}>
								<a className={'callout__button'} href={'#'}>Claim 15% Off</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Social