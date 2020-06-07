import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'semantic-ui-react';



class Footer extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit = () => {
		setTimeout(function () {
			document.getElementById("form").reset();
		}, 3000)
	}

	render() {
		const splash = this.props.splash

		return (
			<footer className="footer">
				<div className={'footer__newsletter'}>
					<div className={'footer__newsletter-container container container--small'}>

						<form id={'form'} method={'post'} action={'https://app.convertkit.com/forms/1445826/subscriptions'} className={'splash__form form validate'} target="_blank" noValidate onSubmit={this.handleSubmit}>
							<div className="form__inner">
								<Form.Field style={{ display: 'block', color: 'white' }}>
									<h2 className="text--lg">Join Our Community</h2>
									<p className={'text-center text-white'}>Be the first to know when we expand to new cities and release life-changing health tips. Also, don’t miss out on our exclusive discounts and latest updates.</p>
								</Form.Field>
								<Form.Field className="field--half">
									<label className={'screen-reader-text'} htmlFor='mce-FNAME'>First Name*</label>
									<input placeholder={'First Name'} id='mce-FNAME' className={'required'} type='text' name='fields[first_name]' onChange={this.handleChange} required />
								</Form.Field>
								<Form.Field className="field--half">
									<label className={'screen-reader-text'} htmlFor='mce-LNAME'>Last Name*</label>
									<input placeholder={'Last Name'} id='mce-LNAME' type='text' name='fields[undefined]' onChange={this.handleChange} />
								</Form.Field>
								<Form.Field>
									<label className={'screen-reader-text'} htmlFor='mce-EMAIL'>Email</label>
									<input placeholder={'Email'} id='mce-EMAIL' type='email' name='email_address' onChange={this.handleChange} required />
								</Form.Field>
								<div className={'form__submit'}>
									<input style={{ paddingTop: '15px' }} className={'button button--inverted text--uppercase text--sm text--font-secondary'} type='submit' value='Subscribe' name='subscribe' id="mc-embedded-subscribe" />
								</div>
							</div>
						</form>
					</div>
				</div>
				{
					splash !== true ?
						<div className="footer__top">
							<div className="container">
								<div className="row">
									<div className="col col--3">
										<div className="footer__col">
											<h2 className="text--bold text--sm">About C2B</h2>
											<ul className="list--unstyled">
												<li><Link to="/about">About the Company</Link></li>
												<li><Link to="/contact">Contact Us</Link></li>
												<li><Link to="/terms-of-use">Terms of Use</Link></li>
												<li><Link to="/privacy-policy">Privacy Policy</Link></li>
											</ul>
										</div>
									</div>
									<div className="col col--3">
										<div className="footer__col">
											<h2 className="text--bold text--sm">Helpful Links</h2>
											<ul className="list--unstyled">
												<li><Link to="/how-it-works">How It Works</Link></li>
												<li><Link to="/find-a-pro">Find A Pro</Link></li>
												<li><Link to="/join-as-pro">Join as a Pro</Link></li>
												{/* <li><Link to="/pro-faq">Pro FAQs</Link></li> */}
												{/* <li><Link to="/client-faq">Client FAQs</Link></li> */}
												{/* <li><Link to="/blog">Blog</Link></li> */}
											</ul>
										</div>
									</div>
									<div className="col">
										<div className="footer__col footer__col--alt">
											<h2 className="text--bold text--sm">Contact</h2>
											<p>We’re here to support you. Email us if you have any questions or concerns.</p>
											<p>Email: <a href="#">Contact Support</a></p>
											<p>Phone: <a href="tel:+14076050816">407-605-0816</a></p>
											<ul className="list list--inline">
												<li><a href="#"><FontAwesomeIcon icon={["fab", "facebook-f"]} /></a></li>
												<li><a href="#"><FontAwesomeIcon icon={["fab", "twitter"]} /></a></li>
												<li><a href="#"><FontAwesomeIcon icon={["fab", "youtube"]} /></a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						: null
				}

				<div className="footer__bottom">
					<div className="container">
						<p className="mb--0">Copyright &copy; 2020 Choose To Be You</p>
					</div>
				</div>
			</footer >
		)
	}
}

export default Footer;