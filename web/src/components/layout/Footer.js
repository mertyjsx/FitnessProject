import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class Footer extends Component {
	render() {
		return (
			<footer className="footer">
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
										<li><Link to="/pro-faq">Pro FAQs</Link></li>
										<li><Link to="/client-faq">Client FAQs</Link></li>
										<li><Link to="/blog">Blog</Link></li>
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
				<div className="footer__bottom">
					<div className="container">
						<p className="mb--0">Copyright &copy; 2020 Choose To Be You</p>
					</div>
				</div>
			</footer>
		)
	}
}

export default Footer;