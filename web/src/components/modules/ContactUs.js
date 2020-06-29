import * as emailjs from 'emailjs-com';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ContactUs extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: 'beta@angelcenteno.com',
			subject: '',
			message: '',
			formSent: false
          }
          this.handleSubmit = this.handleSubmit.bind(this)
     }
     
     handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value })
     }
     
     handleSubmit(e) {
		e.preventDefault()
		const { name, email, subject, message } = this.state
		let $this = this
		let templateParams = {
			from_name: email,
			to_name: 'gitdemon+exjvde2uox3abqfm9qcq@boards.trello.com',
			subject: subject,
			message_html: message,
		}
		emailjs.send(
			'gmail',
			'template_OJXxBR6Y',
			templateParams,
			'user_0RYDbFHewHy7s25fAsrIB'
		).then(() => {
			$this.setState({
				formSent: true
			})
		})
		this.resetForm()
	}

	render() {
          const { profile } = this.props
		return (
			<div className="settings">
				<div className="container container--top-bottom-padding container--small">
					<div className="row">
						<div className="col">
							<div className={`dashboard__head`}>
								<h1 className={`text--lg text--uppercase`}>Contact Us</h1>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col" style={{ marginBottom: '50px' }}>
							<div>
                                        {/* <p>As we build this website / app, we need your help.  If there is a feature you'd like added or a bug to report, let us know.  Your experience is vital and we strive to deliever the most user friendly web app possible.</p> */}
								<form encType="multipart/form-data" className="modal__form" onSubmit={this.handleSubmit}>

									<div className="field">
										<label>Enter the subject</label>
										<input
											type="text"
											name="subject"
											id="subject"
											value={this.state.subject}
											onChange={this.handleChange}
											placeholder="Subject"
										/>
									</div>

									<div className="field">
										<label>Message</label>
										<textarea
											type="textarea"
											name="message"
											id="message"
											value={this.state.message}
											onChange={this.handleChange}
											placeholder="Message"
										></textarea>
									</div>

									<button type="submit" className="button button--accent">Send Message</button>
								</form>
								<div className="modal__status modal__status--sent" style={this.state.formSent ? { display: 'block' } : { display: 'none' }}>Thank you! The message has been sent. Please allow up to 2 business days for our team to review.</div>
                                   </div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	console.log(state);
	return {
          auth: state.firebase.auth,
		profile: state.firebase.profile
	}
}

export default compose(
	connect(mapStateToProps),
	// firestoreConnect([
	// 	{ collection: 'interactions', orderBy: ['createdAt', 'desc'] }
	// ])
)(withRouter(ContactUs))